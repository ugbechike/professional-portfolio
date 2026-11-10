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
  assert.equal((await jsonRepository.getPlaygroundProjects()).length, 4);
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
  const cardata = await jsonRepository.getProjectBySlug('cardata');
  assert.equal(cardata?.caseStudy.format, undefined);
});

test('Concrete and Reka narratives retain ownership, scope, and stable routes', async () => {
  for (const slug of ['concrete', 'reka-ai']) {
    const project = await jsonRepository.getProjectBySlug(slug);
    assert.ok(project);
    assert.equal(project.caseStudy.format, 'narrative');
    assert.equal(project.caseStudy.sections.length, 7);
    assert.equal(project.caseStudy.tableOfContents, true);
    assert.equal(JSON.stringify(project).includes('—'), false);
    assert.equal(
      new Set(project.caseStudy.sections.map((section) => section.id)).size,
      7,
    );
  }
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
