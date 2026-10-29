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
export const getHomeContent = async () => {
  const [site, projects, playground] = await Promise.all([
    getSiteContent(),
    contentRepository.getProjects(),
    contentRepository.getPlaygroundProjects(),
  ]);
  return {
    ...site,
    projects: projects.filter((item) => item.featured),
    playground: playground.filter((item) => item.featured).slice(0, 2),
  };
};
