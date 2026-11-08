import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { PlaygroundProject } from '@/modules/content/types/content';
import { Reveal } from '@/components/animation/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

export const LabPreview = ({ projects }: { projects: PlaygroundProject[] }) => (
  <section className="home-section home-lab shell" aria-labelledby="lab-title">
    <Reveal>
      <div className="home-lab-layout">
        <SectionHeading
          id="lab-title"
          label="03 — Lab"
          title="Engineering Lab"
          description="Personal projects and technical experiments. The status on each one is where that work actually stands."
          href="/playground"
          link="Explore the lab"
        />
        {projects.length > 0 && (
          <ol className="home-lab-list">
            {projects.map((project, index) => (
              <li key={project.id}>
                <Link href={`/playground/${project.slug}`}>
                  <span className="home-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="home-lab-name">
                    {project.title}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                  <span className="home-lab-status">{project.status}</span>
                  <span className="home-lab-summary">{project.summary}</span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </Reveal>
  </section>
);
