import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/modules/content/types/content';
import { Reveal } from '@/components/animation/reveal';

export const ProjectDirectory = ({
  projects,
  headingLevel = 'h3',
}: {
  projects: Project[];
  headingLevel?: 'h2' | 'h3';
}) => {
  const Heading = headingLevel;
  return (
    <ul className="project-directory">
      {projects.map((project) => (
        <li key={project.id}>
          <Reveal>
            <Link
              className="project-directory-row"
              href={`/work/${project.slug}`}
              aria-labelledby={`project-${project.id}-title`}
              aria-describedby={`project-${project.id}-summary`}
            >
              <Heading
                id={`project-${project.id}-title`}
                className="project-directory-title"
              >
                {project.title}
              </Heading>
              <p
                id={`project-${project.id}-summary`}
                className="project-directory-summary"
              >
                {project.summary}
              </p>
              <p className="project-directory-category">
                {project.category.join(' · ')}
              </p>
              <ArrowUpRight
                className="project-directory-arrow"
                size={19}
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
};
