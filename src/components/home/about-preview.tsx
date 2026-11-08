import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Profile } from '@/modules/content/types/content';
import { Reveal } from '@/components/animation/reveal';

export const AboutPreview = ({ profile }: { profile: Profile }) => (
  <section className="home-section home-about shell" aria-labelledby="about-title">
    <Reveal>
      <div className="home-about-layout">
        <div>
          <p className="eyebrow">05 — About</p>
          <h2 id="about-title">{profile.name}</h2>
          <p className="home-role">{profile.role}</p>
        </div>
        <div>
          <p className="home-summary">{profile.bio}</p>
          <Link className="text-link" href="/about">
            More about me <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Reveal>
  </section>
);
