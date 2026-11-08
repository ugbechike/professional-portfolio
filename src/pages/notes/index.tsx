import type { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
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
        <div className="eyebrow">{'// writing'}</div>
        <h1>Writing</h1>
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
          <h2>Nothing published yet.</h2>
          <p>
            Notes on engineering decisions and lessons from building will live
            here.
          </p>
          <Link className="text-link section-link" href="/work">
            Explore my work →
          </Link>
        </section>
      )}
    </div>
  </Layout>
);
export default Notes;
