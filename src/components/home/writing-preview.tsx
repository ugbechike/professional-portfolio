import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Note } from '@/modules/content/types/content';
import { Reveal } from '@/components/animation/reveal';
import { SectionHeading } from '@/components/ui/section-heading';

const previewLimit = 3;

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));

export const WritingPreview = ({ notes }: { notes: Note[] }) => {
  const visible = notes.slice(0, previewLimit);
  return (
    <section
      className="home-section home-writing shell"
      aria-labelledby="writing-title"
    >
      <Reveal>
        <SectionHeading
          id="writing-title"
          label="04 — Writing"
          title="Notes from the work"
          description="Engineering notes, when there is something specific worth writing down."
          href="/notes"
          link="All writing"
        />
        {visible.length === 0 ? (
          <p className="home-writing-empty">Nothing published yet.</p>
        ) : (
          <ol className="home-writing-list">
            {visible.map((note) => (
              <li key={note.id}>
                <Link href={`/notes/${note.slug}`}>
                  <time dateTime={note.publishedAt}>
                    {formatDate(note.publishedAt)}
                  </time>
                  <span className="home-writing-name">
                    {note.title}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                  <span className="home-writing-summary">{note.summary}</span>
                  {note.tags.length > 0 && (
                    <span className="home-writing-tags">
                      {note.tags.join(' · ')}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </Reveal>
    </section>
  );
};
