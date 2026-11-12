import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ExperienceList } from '@/components/experience/experience-list';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import {
  getExperienceContent,
  getSiteContent,
} from '@/modules/content/services/content';
export const getStaticProps = async () => ({
  props: {
    ...(await getSiteContent()),
    experiences: await getExperienceContent(),
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
      <Image
        className="about-portrait"
        src="/images/john-ugbe-portrait.png"
        alt="Monochrome illustrated portrait of John Ugbe"
        width={1164}
        height={1351}
        sizes="(max-width: 448px) calc(100vw - 48px), 400px"
      />
      <div className="prose">
        {site.profile.bio.split('\n\n').map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {site.profile.engineeringPractice.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <nav
          className="about-project-links"
          aria-label="Related engineering projects"
        >
          {site.profile.engineeringPractice.links.map((link) => (
            <Link className="text-link" key={link.href} href={link.href}>
              {link.label} →
            </Link>
          ))}
        </nav>
      </div>
      {experiences.length > 0 && (
        <section className="section">
          <h2 className="section-label">{'// experience'}</h2>
          <ExperienceList experiences={experiences} />
        </section>
      )}
      {site.profile.certifications.length > 0 && (
        <section className="section">
          <h2 className="section-label">{'// certifications'}</h2>
          {site.profile.certifications.map((certification) => (
            <article className="certification" key={certification.url}>
              <h3>{certification.name}</h3>
              <p className="certification-meta">
                {certification.issuer} · Issued{' '}
                <time dateTime={certification.issuedAt}>
                  {new Date(certification.issuedAt).toLocaleDateString(
                    'en-US',
                    {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      timeZone: 'UTC',
                    },
                  )}
                </time>
              </p>
              <div className="certification-links">
                <a
                  className="text-link"
                  href={certification.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View credential ↗
                </a>
                {certification.pdf && (
                  <a
                    className="text-link"
                    href={certification.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Preview certificate (PDF) ↗
                  </a>
                )}
              </div>
            </article>
          ))}
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
