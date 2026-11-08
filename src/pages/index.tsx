import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import { Reveal } from '@/components/animation/reveal';
import { ProjectDirectory } from '@/components/project-directory/project-directory';
import { getHomeContent } from '@/modules/content/services/content';
export const getStaticProps = async () => ({ props: await getHomeContent() });
const Home = ({
  profile,
  navigation,
  projects,
  projectCount,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout profile={profile} navigation={navigation}>
    <Seo
      title={profile.headline.replace(/\.+$/, '')}
      description={profile.summary}
    />
    <div className="shell">
      <section className="home-hero">
        <Reveal>
          <h1>
            {profile.name}
            <span className="cursor" aria-hidden="true" />
          </h1>
          <p className="hero-role">
            {profile.role}
            {profile.location && ` · ${profile.location}`}
          </p>
          <p className="hero-headline">{profile.headline}</p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="actions">
            <Link className="button" href="/contact">
              Get in touch →
            </Link>
            <Link className="text-link" href="/work">
              See all work
            </Link>
          </div>
        </Reveal>
      </section>
      <section className="section" aria-labelledby="selected-work">
        <h2 className="section-label" id="selected-work">
          {'// selected work'}
        </h2>
        <ProjectDirectory projects={projects} />
        <Link className="text-link section-link" href="/work">
          All {projectCount} projects →
        </Link>
      </section>
      <section className="section" aria-labelledby="about-preview">
        <h2 className="section-label" id="about-preview">
          {'// about'}
        </h2>
        <p>{profile.bio}</p>
        <Link className="text-link section-link" href="/about">
          More about me →
        </Link>
      </section>
    </div>
  </Layout>
);
export default Home;
