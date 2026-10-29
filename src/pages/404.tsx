import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import { getSiteContent } from '@/modules/content/services/content';
export const getStaticProps = async () => ({ props: await getSiteContent() });
const NotFound = (site: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout {...site}>
    <Seo title="Page not found" />
    <section className="shell page-hero directory">
      <div className="eyebrow">404 / A SMALL DETOUR</div>
      <h1>
        This page is
        <br />
        <span className="serif">off the map.</span>
      </h1>
      <p>The address may have changed, or this page doesn’t exist.</p>
      <Link className="button" style={{ marginTop: 30 }} href="/">
        Back to the homepage ↗
      </Link>
    </section>
  </Layout>
);
export default NotFound;
