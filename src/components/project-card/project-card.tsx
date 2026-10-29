import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/modules/content/types/content';
export const ProjectCard = ({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) => (
  <article className={`project-card project-${project.slug}`}>
    <Link
      className="project-art"
      href={`/work/${project.slug}`}
      tabIndex={-1}
      aria-hidden="true"
    >
      {project.images[0] ? (
        <Image
          src={project.images[0].src}
          alt=""
          width={1000}
          height={680}
          priority={index < 2}
          sizes="(max-width: 760px) 100vw, 50vw"
        />
      ) : (
        <span className="cover-fallback">{project.title}</span>
      )}
      <span className="art-label">
        {project.category[0]} / {String(index + 1).padStart(2, '0')}
      </span>
      <span className="art-arrow">
        <ArrowUpRight size={24} />
      </span>
    </Link>
    <div className="project-info">
      <div className="project-title">
        <h3>
          <Link href={`/work/${project.slug}`}>{project.title}</Link>
        </h3>
        <ArrowUpRight size={20} />
      </div>
      <p>{project.summary}</p>
      <p className="project-role">{project.role}</p>
      {project.contributions.length > 0 && (
        <ul className="card-contributions">
          {project.contributions.slice(0, 2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {project.metrics[0] && (
        <div className="card-impact">
          <strong>
            {project.metrics[0].value} · {project.metrics[0].label}
          </strong>
          <p>{project.metrics[0].context}</p>
        </div>
      )}
      <div className="tags">
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  </article>
);
