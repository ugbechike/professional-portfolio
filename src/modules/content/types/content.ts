import type { z } from 'zod';
import type {
  profileSchema,
  professionalProjectSchema,
  personalProjectSchema,
  experienceSchema,
  noteSchema,
  navigationSchema,
} from '@/modules/content/schemas/content';
export type Profile = z.infer<typeof profileSchema>;
export type Project = z.infer<typeof professionalProjectSchema>;
export type PlaygroundProject = z.infer<typeof personalProjectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Note = z.infer<typeof noteSchema>;
export type Navigation = z.infer<typeof navigationSchema>;
export interface ContentRepository {
  getProfile(): Promise<Profile>;
  getExperiences(): Promise<Experience[]>;
  getProjects(): Promise<Project[]>;
  getProjectBySlug(slug: string): Promise<Project | null>;
  getPlaygroundProjects(): Promise<PlaygroundProject[]>;
  getPlaygroundProjectBySlug(slug: string): Promise<PlaygroundProject | null>;
  getNotes(): Promise<Note[]>;
  getNoteBySlug(slug: string): Promise<Note | null>;
  getNavigation(): Promise<Navigation>;
}
export type SiteContent = { profile: Profile; navigation: Navigation };
