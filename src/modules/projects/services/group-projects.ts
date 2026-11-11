import type { Experience, Project } from '@/modules/content/types/content';

export const groupProjects = (
  projects: Project[],
  experiences: Experience[],
) => {
  const assigned = new Set(experiences.flatMap((item) => item.projectIds));
  const groups = experiences
    .map((experience) => ({
      experience,
      projects: experience.projectIds.flatMap((id) => {
        const project = projects.find((item) => item.id === id);
        return project ? [project] : [];
      }),
    }))
    .filter((group) => group.projects.length > 0);
  return {
    groups,
    additional: projects.filter((project) => !assigned.has(project.id)),
  };
};
