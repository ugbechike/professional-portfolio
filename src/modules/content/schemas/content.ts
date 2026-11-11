import { z } from 'zod';
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const externalLinkSchema = z.object({
  label: z.string().min(1),
  url: z.url().refine((url) => /^https:\/\//.test(url), 'Use HTTPS links'),
});
export const technologySchema = z.string().min(1);
export const mediaAssetSchema = z.object({
  src: z.string().startsWith('/images/'),
  alt: z.string().min(1),
  width: z.number().positive(),
  height: z.number().positive(),
  kind: z.enum(['screenshot', 'product', 'illustration']).optional(),
});
export const impactMetricSchema = z.object({
  value: z.string(),
  label: z.string(),
  scope: z.enum(['personal', 'team', 'platform', 'development']),
  context: z.string().min(1),
});
export const caseStudySchema = z
  .object({
    format: z.enum(['summary', 'narrative']).optional(),
    subtitle: z.string().min(1).optional(),
    metadata: z
      .array(z.object({ label: z.string().min(1), value: z.string().min(1) }))
      .optional(),
    tableOfContents: z.boolean().optional(),
    sections: z.array(
      z.object({
        id: slug.optional(),
        navigationLabel: z.string().min(1).optional(),
        title: z.string(),
        body: z.string(),
        items: z.array(z.string().min(1)).optional(),
        engineeringContributions: z
          .array(
            z.object({ heading: z.string().min(1), body: z.string().min(1) }),
          )
          .min(1)
          .max(3)
          .optional(),
        image: mediaAssetSchema.optional(),
        code: z.string().optional(),
        diagram: z.string().optional(),
      }),
    ),
  })
  .superRefine((study, context) => {
    const ids = study.sections.flatMap((section) =>
      section.id ? [section.id] : [],
    );
    if (new Set(ids).size !== ids.length)
      context.addIssue({
        code: 'custom',
        message: 'Case study section IDs must be unique',
        path: ['sections'],
      });
    if (study.tableOfContents && study.sections.some((section) => !section.id))
      context.addIssue({
        code: 'custom',
        message: 'Table of contents requires an ID on every section',
        path: ['sections'],
      });
  });
export const profileSchema = z.object({
  name: z.string(),
  role: z.string(),
  headline: z.string(),
  summary: z.string(),
  bio: z.string(),
  years: z.string(),
  location: z.string().optional(),
  email: z.email().optional(),
  links: z.array(externalLinkSchema),
  capabilities: z.array(z.string()),
});
const publication = {
  id: slug,
  slug,
  title: z.string(),
  visibility: z.enum(['public', 'draft', 'private']),
  featured: z.boolean(),
};
export const professionalProjectSchema = z.object({
  ...publication,
  category: z.array(z.string()),
  summary: z.string(),
  role: z.string(),
  ownership: z.string(),
  stack: z.array(technologySchema),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  status: z.enum(['Published', 'Current', 'Archived']),
  challenges: z.array(z.string()),
  contributions: z.array(z.string()),
  decisions: z.array(z.string()),
  outcomes: z.array(z.string()),
  metrics: z.array(impactMetricSchema),
  images: z.array(mediaAssetSchema),
  links: z.array(externalLinkSchema),
  caseStudy: caseStudySchema,
});
export const personalProjectSchema = z.object({
  ...publication,
  summary: z.string(),
  status: z.enum([
    'Live',
    'Open Source',
    'Prototype',
    'In Progress',
    'Archived',
    'Experiment',
  ]),
  stack: z.array(technologySchema),
  links: z.array(externalLinkSchema),
  images: z.array(mediaAssetSchema),
  technicalNotes: z.array(z.string()),
  caseStudy: caseStudySchema.optional(),
});
export const experienceSchema = z.object({
  id: slug,
  company: z.string(),
  role: z.string(),
  summary: z.string(),
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
  projectIds: z.array(slug),
});
export const noteSchema = z.object({
  ...publication,
  summary: z.string(),
  publishedAt: z.iso.date(),
  sections: caseStudySchema.shape.sections,
  tags: z.array(z.string()),
});
export const navigationSchema = z.array(
  z.object({ label: z.string(), href: z.string().startsWith('/') }),
);
