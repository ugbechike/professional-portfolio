import { useMemo, useState } from 'react';
import type { Project } from '@/modules/content/types/content';
export const useProjects = (projects: Project[]) => {
  const [category, setCategory] = useState('All work');
  const categories = useMemo(
    () => [
      'All work',
      ...new Set(projects.flatMap((project) => project.category)),
    ],
    [projects],
  );
  const filtered = useMemo(
    () =>
      category === 'All work'
        ? projects
        : projects.filter((project) => project.category.includes(category)),
    [projects, category],
  );
  return { category, setCategory, categories, filtered };
};
