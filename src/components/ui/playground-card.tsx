import Link from 'next/link';
import {
  ArrowUpRight,
  AudioLines,
  Terminal,
  Globe2,
  Layers3,
} from 'lucide-react';
import type { PlaygroundProject } from '@/modules/content/types/content';
const icons = {
  devmirror: Terminal,
  snapswap: Layers3,
  buddy: AudioLines,
  republic: Globe2,
};
export const PlaygroundCard = ({ project }: { project: PlaygroundProject }) => {
  const Icon = icons[project.slug as keyof typeof icons] || Terminal;
  return (
    <article className="play-card">
      <div className="play-top">
        <Icon size={30} strokeWidth={1.2} />
        <span className="badge">{project.status}</span>
      </div>
      <h3>
        <Link href={`/playground/${project.slug}`}>
          {project.title}
          <ArrowUpRight size={20} />
        </Link>
      </h3>
      <p>{project.summary}</p>
    </article>
  );
};
