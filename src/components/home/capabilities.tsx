import type { Profile } from '@/modules/content/types/content';
import { Reveal } from '@/components/animation/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export const Capabilities = ({ profile }: { profile: Profile }) => (
  <section
    className="home-section home-practice shell"
    aria-labelledby="capabilities-title"
  >
    <Reveal>
      <SectionHeading
        id="capabilities-title"
        label="02 — Practice"
        title="Engineering capabilities"
        description="Most of the work is connecting an interface to the systems around it, then staying with the result until it is reliable."
      />
      {profile.capabilities.length > 0 && (
        <ol className="home-capabilities">
          {profile.capabilities.map((item, index) => (
            <li key={item}>
              <span className="home-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )}
    </Reveal>
  </section>
);
