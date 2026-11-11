import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  jsonRepository,
  publicOnly,
  uniqueSlugs,
} from '@/modules/content/repositories/json-repository';
import {
  externalLinkSchema,
  impactMetricSchema,
} from '@/modules/content/schemas/content';
test('all supplied content validates and resolves through the repository', async () => {
  const projects = await jsonRepository.getProjects();
  assert.equal(projects.length, 9);
  for (const project of projects)
    assert.deepEqual(
      await jsonRepository.getProjectBySlug(project.slug),
      project,
    );
  assert.equal(await jsonRepository.getProjectBySlug('missing'), null);
  assert.equal((await jsonRepository.getPlaygroundProjects()).length, 5);
  assert.deepEqual(await jsonRepository.getNotes(), []);
  assert.ok(await jsonRepository.getProfile());
});
test('drafts and private records never enter public results', () => {
  assert.deepEqual(
    publicOnly([
      { visibility: 'private' },
      { visibility: 'draft' },
      { visibility: 'public' },
    ]),
    [{ visibility: 'public' }],
  );
  assert.throws(() => uniqueSlugs([{ slug: 'same' }, { slug: 'same' }]));
});
test('links and metrics require safe URLs and attribution', () => {
  assert.equal(
    externalLinkSchema.safeParse({ label: 'Bad', url: 'javascript:alert(1)' })
      .success,
    false,
  );
  assert.equal(
    impactMetricSchema.safeParse({ value: '60%', label: 'Improvement' })
      .success,
    false,
  );
});

test('verified employment dates, overlap and homepage selection are preserved', async () => {
  const { getExperienceContent, getHomeContent } =
    await import('@/modules/content/services/content');
  const experiences = await getExperienceContent();
  assert.deepEqual(
    experiences.map(({ company, startDate, endDate }) => [
      company,
      startDate,
      endDate,
    ]),
    [
      ['Lazer Technologies', '2021-09-01', undefined],
      ['Global Villages', '2021-02-01', '2021-08-01'],
      ['Mart', '2019-07-01', '2021-01-01'],
      ['Tenece Professional Services', '2019-01-01', '2019-07-01'],
      ['Genesys Tech Hub', '2018-05-01', '2019-12-01'],
    ],
  );
  assert.ok(
    experiences.every(
      (item) => item.summary.length > 0 && item.role.length > 0,
    ),
  );
  const home = await getHomeContent();
  assert.deepEqual(home.experiences, experiences.slice(0, 3));
  assert.equal(
    home.profile.headline,
    'I build thoughtful products and reliable systems.',
  );
});

test('case study navigation requires stable, unique section anchors', async () => {
  const { caseStudySchema } = await import('@/modules/content/schemas/content');
  const section = {
    title: 'Overview',
    body: 'First paragraph.\n\nSecond paragraph.',
  };
  assert.equal(
    caseStudySchema.safeParse({ sections: [section] }).success,
    true,
  );
  assert.equal(
    caseStudySchema.safeParse({ tableOfContents: true, sections: [section] })
      .success,
    false,
  );
  assert.equal(
    caseStudySchema.safeParse({
      sections: [
        { ...section, id: 'overview' },
        { ...section, id: 'overview' },
      ],
    }).success,
    false,
  );
  assert.equal(
    caseStudySchema.safeParse({
      subtitle: 'An engineering case study.',
      metadata: [{ label: 'Client', value: 'Example' }],
      tableOfContents: true,
      sections: [
        { ...section, id: 'overview', items: ['A delivery milestone.'] },
      ],
    }).success,
    true,
  );
});

test('DCP narrative preserves publication scope and evidence boundaries', async () => {
  const project = await jsonRepository.getProjectBySlug('dcp-plus');
  assert.ok(project);
  assert.equal(project.caseStudy.format, 'narrative');
  assert.equal(project.caseStudy.sections.length, 6);
  assert.equal(
    project.caseStudy.metadata?.find((item) => item.label === 'Period')?.value,
    'June 2025 to October 2, 2026',
  );
  assert.equal(JSON.stringify(project).includes('—'), false);
  assert.ok(project.caseStudy.sections.every((section) => section.id));
  const narrative = project.caseStudy.sections
    .map((section) => section.body)
    .join(' ');
  const wordCount = narrative.split(/\s+/).length;
  assert.ok(wordCount >= 900 && wordCount <= 1200);
  assert.doesNotMatch(narrative, /ECAD|sole Lazer|mocked APIs|handoff/i);
  assert.match(narrative, /embedded within the client’s engineering team/);
  assert.match(
    narrative,
    /primary engineer responsible for the client applications/,
  );
  assert.match(narrative, /passed Samsung Seller Office pre-testing/);
  assert.match(narrative, /prepared the v0.3.0 release package/);
  assert.ok(
    project.caseStudy.sections.every((section) => !section.items?.length),
  );
  assert.ok(project.metrics.every((metric) => metric.scope === 'development'));
});

test('Concrete and Reka narratives retain ownership, scope, and stable routes', async () => {
  const concrete = await jsonRepository.getProjectBySlug('concrete');
  assert.equal(concrete?.title, 'Concrete Finance');
  assert.match(
    concrete?.ownership ?? '',
    /contributor to Concrete Borrow alongside other engineers/,
  );
  assert.deepEqual(
    concrete?.metrics.map((metric) => [metric.value, metric.scope]),
    [['$616.7M', 'platform']],
  );
  const reka = await jsonRepository.getProjectBySlug('reka-ai');
  assert.equal(reka?.role, 'Sole client-side engineer');
  assert.equal(
    reka?.caseStudy.metadata?.find((item) => item.label === 'Period')?.value,
    '2023, beginning in March',
  );
  assert.deepEqual(reka?.metrics, []);
});

test('professional studies use four sections and evidence-sized engineering lists', async () => {
  const expectedCounts: Record<string, number> = {
    concrete: 3,
    'reka-ai': 3,
    plaiday: 3,
    'nfl-all-day': 3,
    ihlad: 2,
  };
  for (const project of await jsonRepository.getProjects()) {
    if (project.slug === 'dcp-plus') continue;
    assert.equal(project.caseStudy.format, 'narrative');
    if (['cardata', 'global-villages', 'mart'].includes(project.slug)) {
      assert.deepEqual(project.caseStudy.sections, []);
      assert.ok(!project.caseStudy.tableOfContents);
      assert.ok(project.summary && project.role);
      continue;
    }
    const engagementWords =
      project.caseStudy.sections[1].body.split(/\s+/).length;
    assert.ok(engagementWords >= 100 && engagementWords <= 160, project.slug);
    assert.deepEqual(
      project.caseStudy.sections.map(({ title }) => title),
      [
        'The product',
        'My engagement',
        'Engineering work',
        'Delivery and reflection',
      ],
    );
    assert.equal(
      new Set(project.caseStudy.sections.map(({ id }) => id)).size,
      4,
    );
    const engineering = project.caseStudy.sections[2];
    assert.equal(
      engineering.engineeringContributions?.length ?? 0,
      expectedCounts[project.slug],
    );
    assert.ok(
      project.caseStudy.sections.every((section) => !section.items?.length),
    );
    assert.equal(JSON.stringify(project.caseStudy).includes('—'), false);
  }
});

test('engineering contribution schema rejects empty or oversized lists', async () => {
  const { caseStudySchema } = await import('@/modules/content/schemas/content');
  const contribution = {
    heading: 'Integration',
    body: 'Connected the client to the service.',
  };
  for (const count of [0, 4]) {
    assert.equal(
      caseStudySchema.safeParse({
        sections: [
          {
            title: 'Engineering work',
            body: '',
            engineeringContributions: Array(count).fill(contribution),
          },
        ],
      }).success,
      false,
    );
  }
  assert.equal(
    caseStudySchema.safeParse({
      sections: [
        {
          title: 'Engineering work',
          body: '',
          engineeringContributions: [contribution],
        },
      ],
    }).success,
    true,
  );
});

test('AgentVault lab entry has public demo and source links', async () => {
  const projects = await jsonRepository.getPlaygroundProjects();
  const agentVault = projects.find(({ slug }) => slug === 'agentvault');
  assert.ok(agentVault);
  assert.equal(agentVault.status, 'Prototype');
  assert.equal(agentVault.visibility, 'public');
  assert.equal(agentVault.featured, true);
  assert.deepEqual(
    agentVault.links.map(({ url }) => url),
    [
      'https://web-navy-pi-61.vercel.app',
      'https://github.com/ugbechike/agentvault',
    ],
  );
});

test('launch content retains official links and treats IHLAD as completed work', async () => {
  const expected: Record<string, string> = {
    concrete: 'https://app.concrete.xyz/earn',
    'dcp-plus': 'https://dcp.watch/',
    'reka-ai': 'https://reka.ai/',
    cardata: 'https://cardata.co/features/cardata-mobile',
    'nfl-all-day': 'https://nflallday.com/search',
  };
  for (const [slug, url] of Object.entries(expected)) {
    assert.ok(
      (await jsonRepository.getProjectBySlug(slug))?.links.some(
        (link) => link.url === url,
      ),
    );
  }
  const projects = await jsonRepository.getProjects();
  const ihlad = projects.find((project) => project.slug === 'ihlad');
  assert.equal(ihlad?.status, 'Published');
  assert.match(
    ihlad?.caseStudy.sections[1].body ?? '',
    /approximately three weeks/,
  );
  assert.equal(
    projects.findIndex((project) => project.slug === 'ihlad') + 1,
    projects.findIndex((project) => project.slug === 'global-villages'),
  );
});
