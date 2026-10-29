import type { InferGetStaticPropsType } from 'next';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import { getSiteContent } from '@/modules/content/services/content';
export const getStaticProps = async () => ({ props: await getSiteContent() });
const About = (site: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout {...site}>
    <Seo title="About John" />
    <div className="shell">
      <section className="page-hero">
        <div className="eyebrow">ENGINEER / COLLABORATOR / CURIOUS HUMAN</div>
        <h1>
          Hi, I’m John.
          <br />I like to <span className="serif">figure it out.</span>
        </h1>
      </section>
      <section className="about-layout">
        <div className="monogram" aria-label="John Ugbe monogram">
          ju<span>ALWAYS LEARNING. ALWAYS BUILDING.</span>
        </div>
        <div className="about-copy">
          <h2>Grounded in the work.</h2>
          <p>{site.profile.bio}</p>
          <p>
            Over 8+ years, I’ve worked on products spanning fintech, DeFi, AI,
            streaming, and commerce. That has meant moving between React web
            applications, React Native mobile experiences, and connected-device
            development.
          </p>
          <h2>Ownership beyond the interface.</h2>
          <p>
            Client-embedded engineering means understanding the product,
            collaborating across disciplines, and seeing the work through.
            Authentication, payments, media playback, and application lifecycles
            are part of that responsibility.
          </p>
          <h2>Curiosity is part of the practice.</h2>
          <p>
            Personal projects give me room to explore: developer analytics,
            conversational learning, multiplayer games, and new ways to build. I
            learn by putting ideas into working software.
          </p>
        </div>
      </section>
    </div>
  </Layout>
);
export default About;
