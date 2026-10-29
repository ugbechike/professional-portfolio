import type { InferGetStaticPropsType } from 'next';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import { PlaygroundCard } from '@/components/ui/playground-card';
import {
  contentRepository,
  getSiteContent,
} from '@/modules/content/services/content';
export const getStaticProps = async () => ({
  props: {
    ...(await getSiteContent()),
    projects: await contentRepository.getPlaygroundProjects(),
  },
});
const Playground = ({
  projects,
  ...site
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout {...site}>
    <Seo title="The playground" />
    <div className="shell">
      <section className="page-hero">
        <div className="eyebrow">SMALL BETS / OPEN QUESTIONS / SIDE QUESTS</div>
        <h1>
          A little curiosity.
          <br />
          <span className="serif">A lot of building.</span>
        </h1>
        <p>
          Personal projects and experiments. A place to follow an idea, learn a
          new technology, and see what happens.
        </p>
      </section>
      <section className="play-grid directory" aria-label="Personal projects">
        {projects.map((project) => (
          <PlaygroundCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  </Layout>
);
export default Playground;
