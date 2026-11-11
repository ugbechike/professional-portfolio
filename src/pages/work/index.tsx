import type { InferGetStaticPropsType } from 'next';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import { GroupedProjectDirectory } from '@/components/project-directory/grouped-project-directory';
import {
  contentRepository,
  getSiteContent,
  getExperienceContent,
} from '@/modules/content/services/content';
import { useProjects } from '@/modules/projects/hooks/use-projects';
const workDescription =
  "A collection of client engagements and products I've contributed to across different industries and stages of development.";

export const getStaticProps = async () => ({
  props: {
    ...(await getSiteContent()),
    projects: await contentRepository.getProjects(),
    experiences: await getExperienceContent(),
  },
});
const Work = ({
  projects,
  experiences,
  ...site
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const directory = useProjects(projects);
  return (
    <Layout {...site}>
      <Seo title="Selected Work" description={workDescription} />
      <div className="shell work-index">
        <section className="page-hero work-index-hero">
          <div className="eyebrow">{'// work'}</div>
          <h1>Selected Work</h1>
          <p>{workDescription}</p>
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
            {directory.filtered.length} of {projects.length} engagements
          </p>
          <GroupedProjectDirectory
            projects={directory.filtered}
            experiences={experiences}
          />
        </section>
      </div>
    </Layout>
  );
};
export default Work;
