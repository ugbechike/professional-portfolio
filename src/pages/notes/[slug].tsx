import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout/layout';
import { Seo } from '@/components/ui/seo';
import {
  contentRepository,
  getSiteContent,
} from '@/modules/content/services/content';
import type { Note, SiteContent } from '@/modules/content/types/content';
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await contentRepository.getNotes()).map(({ slug }) => ({
    params: { slug },
  })),
  fallback: false,
});
export const getStaticProps: GetStaticProps<
  SiteContent & { note: Note }
> = async ({ params }) => {
  const note = await contentRepository.getNoteBySlug(String(params?.slug));
  return note
    ? { props: { ...(await getSiteContent()), note } }
    : { notFound: true };
};
const NoteDetail = ({
  note,
  ...site
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout {...site}>
    <Seo title={note.title} description={note.summary} />
    <article className="shell directory">
      <header className="page-hero">
        <Link className="detail-back" href="/notes">
          ← All notes
        </Link>
        <div className="eyebrow">
          <time dateTime={note.publishedAt}>{note.publishedAt}</time>
        </div>
        <h1>{note.title}</h1>
        <p>{note.summary}</p>
      </header>
      <div className="prose">
        {note.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.code && (
              <pre>
                <code>{section.code}</code>
              </pre>
            )}
          </section>
        ))}
      </div>
    </article>
  </Layout>
);
export default NoteDetail;
