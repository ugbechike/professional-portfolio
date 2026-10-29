import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import { CaseStudy } from '@/modules/projects/components/case-study';
import {
  contentRepository,
  getSiteContent,
} from '@/modules/content/services/content';
import type { Project, SiteContent } from '@/modules/content/types/content';
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await contentRepository.getProjects()).map(({ slug }) => ({
    params: { slug },
  })),
  fallback: false,
});
export const getStaticProps: GetStaticProps<
  SiteContent & { project: Project }
> = async ({ params }) => {
  const project = await contentRepository.getProjectBySlug(
    String(params?.slug),
  );
  return project
    ? { props: { ...(await getSiteContent()), project } }
    : { notFound: true };
};
const WorkDetail = ({
  project,
  ...site
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout {...site}>
    <Seo title={project.title} description={project.summary} />
    <CaseStudy project={project} />
  </Layout>
);
export default WorkDetail;
