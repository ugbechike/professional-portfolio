import type { Experience } from '@/modules/content/types/content';

const monthYear = (date: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));

export const ExperienceList = ({
  experiences,
  compact = false,
}: {
  experiences: Experience[];
  compact?: boolean;
}) => (
  <ul className={`timeline${compact ? ' timeline-preview' : ''}`}>
    {experiences.map((item) => (
      <li key={item.id}>
        <span className="experience-dates">
          {item.startDate && (
            <>
              <time dateTime={item.startDate.slice(0, 7)}>
                {compact
                  ? item.startDate.slice(0, 4)
                  : monthYear(item.startDate)}
              </time>
              {(!compact ||
                !item.endDate ||
                item.endDate.slice(0, 4) !== item.startDate.slice(0, 4)) && (
                <>
                  {' '}
                  –{' '}
                  {item.endDate ? (
                    <time dateTime={item.endDate.slice(0, 7)}>
                      {compact
                        ? item.endDate.slice(0, 4)
                        : monthYear(item.endDate)}
                    </time>
                  ) : (
                    'Present'
                  )}
                </>
              )}
            </>
          )}
        </span>
        <div>
          <h3>
            {item.role}
            {compact && (
              <span className="experience-company"> @ {item.company}</span>
            )}
          </h3>
          {!compact && (
            <>
              <p className="experience-company">{item.company}</p>
              <p>{item.summary}</p>
            </>
          )}
        </div>
      </li>
    ))}
  </ul>
);
