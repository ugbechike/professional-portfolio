import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import {
  contentRepository,
  getSiteContent,
} from '@/modules/content/services/content';
import type {
  PlaygroundProject,
  SiteContent,
} from '@/modules/content/types/content';
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await contentRepository.getPlaygroundProjects()).map(({ slug }) => ({
    params: { slug },
  })),
  fallback: false,
});
export const getStaticProps: GetStaticProps<
  SiteContent & { project: PlaygroundProject }
> = async ({ params }) => {
  const project = await contentRepository.getPlaygroundProjectBySlug(
    String(params?.slug),
  );
  return project
    ? { props: { ...(await getSiteContent()), project } }
    : { notFound: true };
};
const PlaygroundDetail = ({
  project,
  ...site
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout {...site}>
    <Seo title={project.title} description={project.summary} />
    <article className="shell directory">
      <header className="page-hero">
        <Link className="detail-back" href="/playground">
          <ArrowLeft size={15} /> The playground
        </Link>
        <div className="eyebrow">
          PERSONAL PROJECT / {project.status.toUpperCase()}
        </div>
        <h1>
          {project.title}
          <span className="accent">.</span>
        </h1>
        <p>{project.summary}</p>
        <div className="detail-links">
          {project.links.map((link) => (
            <a
              className="button"
              href={link.url}
              key={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
        <div className="tags">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </header>
      <div className="prose">
        {project.images.map((image) => (
          <Image key={image.src} {...image} alt={image.alt} />
        ))}
        {project.caseStudy?.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        {project.technicalNotes.length > 0 && (
          <section>
            <h2>Technical notes</h2>
            <ul>
              {project.technicalNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  </Layout>
);
export default PlaygroundDetail;
