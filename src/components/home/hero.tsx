import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Profile } from '@/modules/content/types/content';

const ease = [0.22, 1, 0.36, 1] as const;

const headlineParts = (headline: string) => {
  const text = headline.trim();
  if (!text.endsWith('.')) return { lead: text, mark: '' };
  return { lead: text.slice(0, -1), mark: '.' };
};

export const Hero = ({ profile }: { profile: Profile }) => {
  const reduced = useReducedMotion();
  const headline = headlineParts(profile.headline);
  const social = profile.links.filter(
    (link) => link.label === 'GitHub' || link.label === 'LinkedIn',
  );
  const enter = (delay: number) => ({
    initial: reduced ? false : { y: 18 },
    animate: { y: 0 },
    transition: {
      duration: reduced ? 0 : 0.7,
      delay: reduced ? 0 : delay,
      ease,
    },
  });

  return (
    <section className="home-hero shell">
      <motion.div className="home-hero-masthead" {...enter(0)}>
        <p className="home-hero-name">{profile.name}</p>
        <p className="home-hero-role">{profile.role}</p>
      </motion.div>
      <motion.h1 {...enter(0.08)}>
        {headline.lead}
        {headline.mark ? <span className="accent">{headline.mark}</span> : null}
      </motion.h1>
      <motion.div className="home-hero-bottom" {...enter(0.18)}>
        <p>{profile.summary}</p>
        <div className="home-hero-actions">
          <div className="home-hero-ctas">
            <Link className="button" href="/work">
              Explore my work <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link className="text-link" href="/playground">
              Engineering Lab <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          {social.length > 0 ? (
            <ul className="home-social">
              {social.map((link) => (
                <li key={link.url}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </motion.div>
    </section>
  );
};
