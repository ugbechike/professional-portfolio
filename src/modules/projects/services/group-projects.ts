import type { Experience, Project } from '@/modules/content/types/content';

export const groupProjects = (
  projects: Project[],
  experiences: Experience[],
) => {
  const relationships = experiences.flatMap((item) => item.projectIds);
  const assigned = new Set(relationships);
  if (assigned.size !== relationships.length)
    throw new Error('A project cannot belong to multiple employers');
  if (projects.some((project) => !assigned.has(project.id)))
    throw new Error('Every public project must have an employer relationship');
  if (
    experiences.some(
      (item) =>
        item.workPresentation === 'direct' && item.projectIds.length !== 1,
    )
  )
    throw new Error('Direct employer entries require exactly one project');
  const groups = experiences
    .map((experience) => ({
      experience,
      projects: experience.projectIds.flatMap((id) => {
        const project = projects.find((item) => item.id === id);
        return project ? [project] : [];
      }),
    }))
    .filter((group) => group.projects.length > 0);
  return { groups };
};
