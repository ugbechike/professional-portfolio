# professional-portfolio

John Ugbe’s editorial engineering portfolio. Next.js Pages Router, strict TypeScript, React, Tailwind CSS, Framer Motion, Lucide, and Zod. Dark-first with a persistent light theme, responsive navigation, professional case studies, category filters, personal projects, and an unpublished-notes empty state.

## Run locally

Use Node.js 22 LTS (`nvm use`), then:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Fonts are bundled locally. No account, database, or API key is needed.

## Verify

```sh
npm run typecheck
npm run lint
npm test
npm run format:check
npm run build
npm start
```

The build validates content and generates `public/sitemap.xml` and `public/robots.txt`. These origin-dependent files are ignored by Git. Tests exercise schema validation, published-content filtering, slug uniqueness, safe external links, and metric attribution.

## Deploy to Vercel

1. Import `ugbechike/professional-portfolio` from GitHub.
2. Choose the Next.js preset, Node.js 22.x, repository root, and the default `npm run build` command. Do not override the output directory.
3. Set `NEXT_PUBLIC_SITE_URL` to your final HTTPS origin, with no trailing slash. Without it, Vercel’s production project URL is used; local development falls back to localhost.
4. Deploy `main`. Future pushes deploy automatically once the integration is configured.

Preview deployments emit a robots disallow rule. Set the final origin and redeploy when connecting a custom domain. No Vercel deployment has been created by this repository setup.

## Edit content

Update `src/content/*.json`; content is validated at build time. `projects.json` contains the ten professional engagements; `playground.json` contains four personal projects. Set `visibility` to `draft` or `private` to exclude records from public pages and the sitemap. New public slugs automatically receive detail pages on the next build. Set `featured` for homepage inclusion.

`profile.json` owns contact details and social links. Email, GitHub, LinkedIn, and X are configured using the supplied contact details. The experience collection is empty because no employer/date history was supplied. Notes remain empty until a real article is ready.

All covers are original abstract SVGs, labeled as illustrations in case studies. Raster media added later uses Next.js Image optimization. No proprietary screenshots or client logos are included. DCP+ metrics describe captured local development traces; Concrete TVL is platform-level; Mart’s reported efficiency change belongs to the team initiative.

## Structure

- `src/pages`: statically generated routes and framework entry points.
- `src/components`: layout, navigation, UI, project cards, animation.
- `src/modules/content`: Zod schemas, types, repository, content services.
- `src/modules/projects`: directory selection and case-study rendering.
- `src/content`: editable JSON source.
- `src/styles`: design tokens and responsive layouts.
- `public/images`: abstract project covers and Open Graph image.

See [future architecture](docs/FUTURE_ARCHITECTURE.md) for the CMS and MCP migration. V1 deliberately contains no admin interface or write endpoint.
