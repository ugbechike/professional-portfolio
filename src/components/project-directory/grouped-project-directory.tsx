import type { Experience, Project } from '@/modules/content/types/content';
import { groupProjects } from '@/modules/projects/services/group-projects';
import { ProjectDirectory } from './project-directory';

const monthYear = (date: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));

export const GroupedProjectDirectory = ({
  projects,
  experiences,
}: {
  projects: Project[];
  experiences: Experience[];
}) => {
  const { groups, additional } = groupProjects(projects, experiences);
  return (
    <>
      {groups.map(({ experience, projects: entries }) => (
        <section
          className="employer-group"
          key={experience.id}
          aria-labelledby={`employer-${experience.id}`}
        >
          <header className="employer-heading">
            <h2 id={`employer-${experience.id}`}>{experience.company}</h2>
            <p className="employer-meta">
              {experience.role}
              {experience.startDate && (
                <>
                  {' '}
                  ·{' '}
                  <time dateTime={experience.startDate}>
                    {monthYear(experience.startDate)}
                  </time>{' '}
                  to{' '}
                  {experience.endDate ? (
                    <time dateTime={experience.endDate}>
                      {monthYear(experience.endDate)}
                    </time>
                  ) : (
                    'Present'
                  )}
                </>
              )}
            </p>
            <p>{experience.directorySummary ?? experience.summary}</p>
          </header>
          <ProjectDirectory projects={entries} showTechnologies={false} />
        </section>
      ))}
      {additional.length > 0 && (
        <section
          className="employer-group"
          aria-labelledby="additional-engagements"
        >
          <header className="employer-heading">
            <h2 id="additional-engagements">Additional product engagements</h2>
          </header>
          <ProjectDirectory projects={additional} showTechnologies={false} />
        </section>
      )}
    </>
  );
};
