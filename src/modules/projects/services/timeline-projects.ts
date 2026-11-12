import type { Project } from '@/modules/content/types/content';

export const timelineProjects = (projects: Project[]) =>
  [...projects].sort(
    (a, b) =>
      (b.engagementPeriod?.endYear ?? 0) - (a.engagementPeriod?.endYear ?? 0) ||
      (b.engagementPeriod?.startYear ?? 0) -
        (a.engagementPeriod?.startYear ?? 0),
  );

export const engagementPeriodLabel = (project: Project) => {
  const period = project.engagementPeriod;
  if (!period) return undefined;
  return period.startYear === period.endYear
    ? `${period.startYear}`
    : `${period.startYear}–${period.endYear}`;
};
