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
  assert.equal(projects.length, 10);
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
