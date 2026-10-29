import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProjectCard } from '@/components/project-card/project-card';
import { PlaygroundCard } from '@/components/ui/playground-card';
import { Reveal } from '@/components/animation/reveal';
import { getHomeContent } from '@/modules/content/services/content';
export const getStaticProps = async () => ({ props: await getHomeContent() });
const Home = ({
  profile,
  navigation,
  projects,
  playground,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout profile={profile} navigation={navigation}>
    <Seo />
    <section className="hero shell">
      <div className="hero-top">
        <span className="eyebrow">
          <span className="status-dot" /> SOFTWARE ENGINEER. PRODUCT THINKER.
        </span>
        <span className="hero-index">PORTFOLIO — VOL. 01</span>
      </div>
      <h1>
        I build products
        <br />
        that work <span className="serif">beyond</span>
        <br />
        the demo<span className="accent">.</span>
        <MoveUpRight className="hero-arrow" strokeWidth={0.7} />
      </h1>
      <div className="hero-bottom">
        <p>{profile.summary}</p>
        <div className="hero-ctas">
          <Link className="button" href="/work">
            Explore selected work <ArrowUpRight size={18} />
          </Link>
          <a className="text-link" href={profile.links[0].url}>
            GitHub <ArrowUpRight size={16} />
          </a>
          <a className="text-link hero-contact" href="#contact">
            Get in touch <ArrowDown size={16} />
          </a>
        </div>
      </div>
      <div className="hero-foot">
        <span>FROM FIRST IMPLEMENTATION TO RELIABLE DELIVERY</span>
        <ArrowDown size={18} />
      </div>
    </section>
    <section className="overview shell" aria-label="Engineering overview">
      <div>
        <strong>
          8<span className="accent">+</span>
        </strong>
        <span>
          Years building
          <br />
          production software
        </span>
      </div>
      <div>
        <strong>Web. Mobile. TV.</strong>
        <span>
          Across platforms.
          <br />
          Through the full lifecycle.
        </span>
      </div>
      <div>
        <strong>End-to-end.</strong>
        <span>
          Product thinking.
          <br />
          Engineering ownership.
        </span>
      </div>
    </section>
    <section className="section shell" id="selected-work">
      <SectionHeading
        label="01 / SELECTED ENGAGEMENTS"
        title="The work, in depth."
        href="/work"
        link="All work"
      />
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal key={project.id}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </section>
    <section className="capabilities section shell">
      <div>
        <div className="eyebrow">02 / ENGINEERING PRACTICE</div>
        <h2>
          From the interface
          <br />
          to the <span className="serif">intricacies.</span>
        </h2>
        <p>
          The details behind a seamless experience are where a lot of the work
          happens.
        </p>
        <Link className="text-link" href="/about">
          More about my approach <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="capability-list">
        {profile.capabilities.map((item, index) => (
          <div key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item}</h3>
            <ArrowUpRight size={17} />
          </div>
        ))}
      </div>
    </section>
    <section className="section shell">
      <SectionHeading
        label="03 / AFTER HOURS"
        title="Curiosity, in production."
        href="/playground"
        link="Enter the playground"
      />
      <div className="play-grid">
        {playground.map((project) => (
          <PlaygroundCard key={project.id} project={project} />
        ))}
      </div>
    </section>
    <section className="about-preview section shell">
      <div className="eyebrow">04 / THE PERSON BEHIND THE WORK</div>
      <div>
        <h2>
          An engineer by trade.
          <br />A <span className="serif">builder</span> by nature.
        </h2>
        <p>{profile.bio}</p>
        <Link className="text-link" href="/about">
          A little more about me <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  </Layout>
);
export default Home;
