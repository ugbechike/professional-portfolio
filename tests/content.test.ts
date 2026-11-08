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
