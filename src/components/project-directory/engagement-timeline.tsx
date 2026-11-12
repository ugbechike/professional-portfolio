import { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { Project } from '@/modules/content/types/content';
import {
  engagementPeriodLabel,
  timelineProjects,
} from '@/modules/projects/services/timeline-projects';

const EntryContent = ({ project }: { project: Project }) => (
  <>
    <p className="engagement-period">{engagementPeriodLabel(project)}</p>
    <h3 className="project-title">
      <Link href={`/work/${project.slug}`}>
        {project.title} <span aria-hidden="true">↗</span>
      </Link>
    </h3>
    <p className="project-summary">{project.summary}</p>
    <p className="project-meta">{project.category.join(' · ')}</p>
  </>
);

const AnimatedEntry = ({ project }: { project: Project }) => {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.55'],
  });
  const nodeOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 1]);
  return (
    <li ref={ref} className="engagement-entry">
      <motion.span
        aria-hidden="true"
        className="engagement-node"
        style={{ opacity: nodeOpacity }}
      />
      <motion.div
        className="engagement-content"
        initial={false}
        whileInView={{ opacity: [0.86, 1], y: [6, 0] }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <EntryContent project={project} />
      </motion.div>
    </li>
  );
};

const AnimatedTimeline = ({ projects }: { projects: Project[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.65', 'end 0.65'],
  });
  return (
    <div ref={ref} className="engagement-timeline">
      <span className="engagement-track" aria-hidden="true" />
      <motion.span
        className="engagement-progress"
        aria-hidden="true"
        style={{ scaleY: scrollYProgress }}
      />
      <ol>
        {projects.map((project) => (
          <AnimatedEntry key={project.id} project={project} />
        ))}
      </ol>
    </div>
  );
};

export const EngagementTimeline = ({ projects }: { projects: Project[] }) => {
  const reduced = useReducedMotion();
  const entries = timelineProjects(projects);
  if (!entries.length) return null;
  if (reduced)
    return (
      <div className="engagement-timeline" data-reduced-motion="true">
        <span className="engagement-track" aria-hidden="true" />
        <ol>
          {entries.map((project) => (
            <li className="engagement-entry" key={project.id}>
              <span className="engagement-node" aria-hidden="true" />
              <div className="engagement-content">
                <EntryContent project={project} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  // Remount after filtering so Motion measures the new container and node positions.
  return (
    <AnimatedTimeline
      key={entries.map(({ id }) => id).join(',')}
      projects={entries}
    />
  );
};
