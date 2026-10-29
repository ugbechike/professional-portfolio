import Head from 'next/head';
import { useRouter } from 'next/router';
import { siteOrigin } from '@/config/site';
export const Seo = ({
  title = 'Engineering beyond the demo',
  description = 'John Ugbe — senior software engineer building production web, mobile, fintech, AI, and streaming experiences.',
}: {
  title?: string;
  description?: string;
}) => {
  const { asPath } = useRouter();
  return (
    <Head>
      <title>{title} · John Ugbe</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.svg" />
      <link rel="canonical" href={`${siteOrigin}${asPath.split('?')[0]}`} />
      <meta property="og:title" content={`${title} · John Ugbe`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${siteOrigin}${asPath.split('?')[0]}`}
      />
      <meta property="og:image" content={`${siteOrigin}/images/og.png`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#191b19" />
    </Head>
  );
};
