import Link from 'next/link';
import type { Project } from '@/modules/content/types/content';
import { Reveal } from '@/components/animation/reveal';
export const ProjectDirectory = ({
  projects,
  headingLevel = 'h3',
  detailed = false,
  showTechnologies = true,
}: {
  projects: Project[];
  headingLevel?: 'h2' | 'h3';
  detailed?: boolean;
  showTechnologies?: boolean;
}) => {
  const Heading = headingLevel;
  return (
    <ul className="project-directory">
      {projects.map((project) => (
        <li key={project.id}>
          <Reveal>
            <article
              className={
                project.startDate ? 'project-entry has-date' : 'project-entry'
              }
            >
              {project.startDate && (
                <time dateTime={project.startDate}>
                  {project.startDate.slice(0, 4)}
                  {project.endDate && ` – ${project.endDate.slice(0, 4)}`}
                </time>
              )}
              <div>
                <Heading className="project-title">
                  <Link href={`/work/${project.slug}`}>
                    {project.title} <span aria-hidden="true">↗</span>
                  </Link>
                </Heading>
                <p className="project-summary">{project.summary}</p>
                <p className="project-meta">
                  {project.category.join(' · ')}
                  {project.status === 'Current' && ' · Current'}
                </p>
                {detailed && (
                  <>
                    <p className="project-role">{project.role}</p>
                    {project.contributions.length > 0 && (
                      <ul className="contribution-preview">
                        {project.contributions.slice(0, 2).map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
                {showTechnologies && project.stack.length > 0 && (
                  <div className="tags">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        </li>
      ))}
    </ul>
  );
};
