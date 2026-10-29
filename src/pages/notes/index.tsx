import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { NotebookPen } from 'lucide-react';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import {
  contentRepository,
  getSiteContent,
} from '@/modules/content/services/content';
export const getStaticProps = async () => ({
  props: {
    ...(await getSiteContent()),
    notes: await contentRepository.getNotes(),
  },
});
const Notes = ({
  notes,
  ...site
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout {...site}>
    <Seo title="Engineering notes" />
    <div className="shell">
      <section className="page-hero">
        <div className="eyebrow">THINKING OUT LOUD</div>
        <h1>
          Notes from
          <br />
          <span className="serif">the workbench.</span>
        </h1>
        <p>
          Engineering decisions, lessons from building, and ideas worth writing
          down.
        </p>
      </section>
      {notes.length ? (
        <section className="note-list directory">
          {notes.map((note) => (
            <Link key={note.id} href={`/notes/${note.slug}`}>
              <h2>{note.title}</h2>
              <p>{note.summary}</p>
              <time dateTime={note.publishedAt}>{note.publishedAt}</time>
            </Link>
          ))}
        </section>
      ) : (
        <section className="empty-state">
          <NotebookPen size={48} strokeWidth={1} />
          <div>
            <div className="eyebrow" style={{ marginBottom: 18 }}>
              THE NOTEBOOK IS OPEN
            </div>
            <h2>Nothing published. Plenty in mind.</h2>
            <p>
              This space will hold practical notes from real engineering work.
              Until the first one is ready, the case studies are the best place
              to explore my approach.
            </p>
            <div className="topic-list">
              {[
                'Authentication & sessions',
                'Payment lifecycles',
                'React Native',
                'Media playback',
                'AI agents',
                'MCP servers',
              ].map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
            <Link className="text-link" href="/work">
              Explore the case studies ↗
            </Link>
          </div>
        </section>
      )}
    </div>
  </Layout>
);
export default Notes;
