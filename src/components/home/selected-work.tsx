import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/modules/content/types/content';
import { Reveal } from '@/components/animation/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

const curatedImage = (project: Project) =>
  project.images.find(
    (image) => image.kind === 'screenshot' || image.kind === 'product',
  );

const WorkEntry = ({ project, index }: { project: Project; index: number }) => {
  const image = curatedImage(project);

  return (
    <li>
      <Reveal delay={Math.min(index * 0.05, 0.15)}>
        <article aria-labelledby={`${project.slug}-title`}>
          <Link
            className="home-work-row"
            href={`/work/${project.slug}`}
            data-media={image ? 'true' : 'false'}
          >
            {image ? (
              <figure className="home-work-media">
                <Image src={image.src} alt={image.alt} fill sizes="128px" />
              </figure>
            ) : null}
            <h3 id={`${project.slug}-title`}>{project.title}</h3>
            {project.category.length > 0 ? (
              <p className="home-work-category">
                {project.category.join(' · ')}
              </p>
            ) : null}
            {project.summary ? (
              <p className="home-work-summary">{project.summary}</p>
            ) : null}
            <ArrowUpRight
              className="home-work-arrow"
              size={16}
              aria-hidden="true"
            />
          </Link>
        </article>
      </Reveal>
    </li>
  );
};

export const SelectedWork = ({ projects }: { projects: Project[] }) => (
  <section
    className="home-section home-work shell"
    aria-labelledby="work-title"
  >
    <SectionHeading
      id="work-title"
      label="01 — Work"
      title="Selected work"
      href="/work"
      link="All work"
    />
    {projects.length > 0 ? (
      <ol className="home-work-list">
        {projects.map((project, index) => (
          <WorkEntry key={project.id} project={project} index={index} />
        ))}
      </ol>
    ) : null}
  </section>
);
