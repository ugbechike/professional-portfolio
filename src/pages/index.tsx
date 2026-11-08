import type { InferGetStaticPropsType } from 'next';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import { Hero } from '@/components/home/hero';
import { Overview } from '@/components/home/overview';
import { SelectedWork } from '@/components/home/selected-work';
import { Capabilities } from '@/components/home/capabilities';
import { LabPreview } from '@/components/home/lab-preview';
import { WritingPreview } from '@/components/home/writing-preview';
import { AboutPreview } from '@/components/home/about-preview';
import { getHomeContent } from '@/modules/content/services/content';

export const getStaticProps = async () => ({ props: await getHomeContent() });

const Home = ({
  profile,
  navigation,
  projects,
  playground,
  notes,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout profile={profile} navigation={navigation}>
    <Seo
      title={profile.headline.replace(/\.+$/, '')}
      description={profile.summary}
    />
    <Hero profile={profile} />
    <Overview profile={profile} />
    <SelectedWork projects={projects} />
    <Capabilities profile={profile} />
    <LabPreview projects={playground} />
    <WritingPreview notes={notes} />
    <AboutPreview profile={profile} />
  </Layout>
);

export default Home;
