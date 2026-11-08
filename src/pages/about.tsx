import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import {
  contentRepository,
  getSiteContent,
} from '@/modules/content/services/content';
export const getStaticProps = async () => ({
  props: {
    ...(await getSiteContent()),
    experiences: await contentRepository.getExperiences(),
  },
});
const About = ({
  experiences,
  ...site
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout {...site}>
    <Seo title="About John" description={site.profile.bio} />
    <div className="shell">
      <header className="page-hero">
        <div className="eyebrow">{'// about'}</div>
        <h1>Hi, I’m John.</h1>
      </header>
      <div className="portrait-pending">Portrait to follow.</div>
      <div className="prose">
        <p>{site.profile.bio}</p>
      </div>
      {experiences.length > 0 && (
        <section className="section">
          <h2 className="section-label">{'// experience'}</h2>
          <ul className="timeline">
            {experiences.map((item) => (
              <li key={item.id}>
                <span>
                  {item.startDate && (
                    <time dateTime={item.startDate}>
                      {item.startDate.slice(0, 4)}
                      {item.endDate && ` – ${item.endDate.slice(0, 4)}`}
                    </time>
                  )}
                </span>
                <div>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                  <p>{item.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="section">
        <h2 className="section-label">{'// areas of experience'}</h2>
        <ul className="capabilities">
          {site.profile.capabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link className="text-link section-link" href="/work">
          Explore my work →
        </Link>
      </section>
      <section className="section">
        <Link className="text-link" href="/contact">
          Get in touch →
        </Link>
      </section>
    </div>
  </Layout>
);
export default About;
