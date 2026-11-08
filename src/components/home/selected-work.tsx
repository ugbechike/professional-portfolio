import type { Project } from '@/modules/content/types/content';
import { ProjectDirectory } from '@/components/project-directory/project-directory';
import { SectionHeading } from '@/components/ui/section-heading';

export const SelectedWork = ({ projects }: { projects: Project[] }) => (
  <section
    className="home-section home-work shell"
    aria-labelledby="work-title"
  >
    <SectionHeading
      id="work-title"
      label="01 — Work"
      title="Selected Work"
      href="/work"
      link="All work"
    />
    <ProjectDirectory projects={projects} />
  </section>
);
