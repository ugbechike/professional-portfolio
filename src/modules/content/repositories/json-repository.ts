import { z } from 'zod';
import profile from '@/content/profile.json';
import projects from '@/content/projects.json';
import playground from '@/content/playground.json';
import experiences from '@/content/experience.json';
import notes from '@/content/notes.json';
import navigation from '@/content/navigation.json';
import {
  profileSchema,
  professionalProjectSchema,
  personalProjectSchema,
  experienceSchema,
  noteSchema,
  navigationSchema,
} from '@/modules/content/schemas/content';
import type { ContentRepository } from '@/modules/content/types/content';
export const publicOnly = <T extends { visibility: string }>(items: T[]): T[] =>
  items.filter((item) => item.visibility === 'public');
export const uniqueSlugs = <T extends { slug: string }>(items: T[]): T[] => {
  if (new Set(items.map((item) => item.slug)).size !== items.length)
    throw new Error('Duplicate content slug');
  return items;
};
export const jsonRepository: ContentRepository = {
  getProfile: async () => profileSchema.parse(profile),
  getExperiences: async () => z.array(experienceSchema).parse(experiences),
  getProjects: async () =>
    publicOnly(uniqueSlugs(z.array(professionalProjectSchema).parse(projects))),
  getProjectBySlug: async (slug) =>
    (await jsonRepository.getProjects()).find((item) => item.slug === slug) ??
    null,
  getPlaygroundProjects: async () =>
    publicOnly(uniqueSlugs(z.array(personalProjectSchema).parse(playground))),
  getPlaygroundProjectBySlug: async (slug) =>
    (await jsonRepository.getPlaygroundProjects()).find(
      (item) => item.slug === slug,
    ) ?? null,
  getNotes: async () =>
    publicOnly(uniqueSlugs(z.array(noteSchema).parse(notes))).sort((a, b) =>
      b.publishedAt.localeCompare(a.publishedAt),
    ),
  getNoteBySlug: async (slug) =>
    (await jsonRepository.getNotes()).find((item) => item.slug === slug) ??
    null,
  getNavigation: async () => navigationSchema.parse(navigation),
};
