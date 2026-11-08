import type { Profile } from '@/modules/content/types/content';
import { Reveal } from '@/components/animation/reveal';

export const Overview = ({ profile }: { profile: Profile }) => (
  <section className="home-overview shell" aria-labelledby="overview-title">
    <Reveal>
      <div className="home-overview-grid">
        <p className="home-overview-figure" id="overview-title">
          <span className="home-overview-value">{profile.years}</span>
          <span className="home-overview-caption">
            Years building production software
          </span>
        </p>
        <div className="home-overview-points">
          <p>
            Scoping with the people who own the product, before the architecture
            is settled.
          </p>
          <p>
            Implementation, and the reliability work that follows a release.
          </p>
        </div>
      </div>
    </Reveal>
  </section>
);
