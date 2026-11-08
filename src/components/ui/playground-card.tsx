import Link from 'next/link';
import type { PlaygroundProject } from '@/modules/content/types/content';
import { Reveal } from '@/components/animation/reveal';
export const PlaygroundCard = ({ project }: { project: PlaygroundProject }) => (
  <Reveal>
    <article className="project-entry">
      <h2 className="project-title">
        <Link href={`/playground/${project.slug}`}>
          {project.title} <span aria-hidden="true">↗</span>
        </Link>
      </h2>
      <p className="project-summary">{project.summary}</p>
      <p className="project-meta">{project.status}</p>
      {project.stack.length > 0 && (
        <div className="tags">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      )}
    </article>
  </Reveal>
);
