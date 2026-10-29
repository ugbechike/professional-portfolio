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
      <Image
        src={project.images[0].src}
        alt=""
        width={1000}
        height={680}
        priority={index < 2}
      />
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
      <div className="tags">
        {project.stack.slice(0, 4).map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
    </div>
  </article>
);
