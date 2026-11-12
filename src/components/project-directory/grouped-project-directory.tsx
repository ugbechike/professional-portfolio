import type { Experience, Project } from '@/modules/content/types/content';
import Link from 'next/link';
import { groupProjects } from '@/modules/projects/services/group-projects';
import { EngagementTimeline } from './engagement-timeline';

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
  const { groups } = groupProjects(projects, experiences);
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
          {experience.workPresentation === 'direct' ? (
            <Link
              className="text-link"
              href={`/work/${entries[0].slug}`}
              aria-label={`View work at ${experience.company}`}
            >
              View work <span aria-hidden="true">↗</span>
            </Link>
          ) : (
            <div className="employer-clients">
              <p className="client-group-label">
                Client engagements at {experience.company}
              </p>
              <EngagementTimeline projects={entries} />
            </div>
          )}
        </section>
      ))}
    </>
  );
};
