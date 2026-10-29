import type { InferGetStaticPropsType } from 'next';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import { ProjectCard } from '@/components/project-card/project-card';
import {
  contentRepository,
  getSiteContent,
} from '@/modules/content/services/content';
import { useProjects } from '@/modules/projects/hooks/use-projects';
export const getStaticProps = async () => ({
  props: {
    ...(await getSiteContent()),
    projects: await contentRepository.getProjects(),
  },
});
const Work = ({
  projects,
  ...site
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const directory = useProjects(projects);
  return (
    <Layout {...site}>
      <Seo title="Selected work" />
      <div className="shell">
        <section className="page-hero">
          <div className="eyebrow">PROFESSIONAL ENGAGEMENTS / 01—10</div>
          <h1>
            Real products.
            <br />
            <span className="serif">Real engineering.</span>
          </h1>
          <p>
            A selection of client engagements across streaming, finance, AI,
            mobile, and commerce. The work behind the experience.
          </p>
        </section>
        <section className="directory" aria-label="Project directory">
          <div
            className="filters"
            role="group"
            aria-label="Filter projects by category"
          >
            {directory.categories.map((category) => (
              <button
                key={category}
                aria-pressed={directory.category === category}
                onClick={() => directory.setCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="directory-count" aria-live="polite">
            {directory.filtered.length}{' '}
            {directory.filtered.length === 1 ? 'engagement' : 'engagements'}
          </p>
          <div className="project-grid">
            {directory.filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};
export default Work;
