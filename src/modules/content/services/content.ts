import { jsonRepository } from '@/modules/content/repositories/json-repository';
import type { ContentRepository } from '@/modules/content/types/content';
// Swap this adapter when the authenticated content service is introduced.
export const contentRepository: ContentRepository = jsonRepository;
export const getSiteContent = async () => {
  const [profile, navigation] = await Promise.all([
    contentRepository.getProfile(),
    contentRepository.getNavigation(),
  ]);
  return { profile, navigation };
};
export const getExperienceContent = async () =>
  (await contentRepository.getExperiences()).sort((a, b) =>
    (b.startDate ?? '').localeCompare(a.startDate ?? ''),
  );
export const getHomeContent = async () => {
  const [site, projects, playground, notes, experiences] = await Promise.all([
    getSiteContent(),
    contentRepository.getProjects(),
    contentRepository.getPlaygroundProjects(),
    contentRepository.getNotes(),
    getExperienceContent(),
  ]);
  return {
    ...site,
    experiences: experiences.slice(0, 3),
    projectCount: projects.length,
    projects: projects.filter((item) => item.featured),
    playground: playground.filter((item) => item.featured),
    notes,
  };
};
