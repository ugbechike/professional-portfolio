import { writeFile } from 'node:fs/promises';
import { contentRepository } from '@/modules/content/services/content';
import { siteOrigin } from '@/config/site';
const generate = async () => {
  const [projects, playground, notes] = await Promise.all([
    contentRepository.getProjects(),
    contentRepository.getPlaygroundProjects(),
    contentRepository.getNotes(),
  ]);
  const paths = [
    '/',
    '/work',
    '/playground',
    '/notes',
    '/about',
    ...projects.map(({ slug }) => `/work/${slug}`),
    ...playground.map(({ slug }) => `/playground/${slug}`),
    ...notes.map(({ slug }) => `/notes/${slug}`),
  ];
  const escape = (value: string) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('"', '&quot;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;');
  await writeFile(
    'public/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${escape(siteOrigin + path)}</loc></url>`).join('\n')}\n</urlset>\n`,
  );
  const preview = process.env.VERCEL_ENV === 'preview';
  await writeFile(
    'public/robots.txt',
    `User-agent: *\n${preview ? 'Disallow: /' : 'Allow: /'}\n\nSitemap: ${siteOrigin}/sitemap.xml\n`,
  );
};
void generate();
