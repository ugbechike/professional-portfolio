# Portfolio V2 — Design reference

Visual system for the homepage and Work directory. Later pages should follow this document instead of inventing a second look.

This is the presentation system for portfolio V2. It is separate from the content-platform plan in `docs/FUTURE_ARCHITECTURE.md`.

## Design philosophy

The site is a dark editorial portfolio for a senior engineer. The first impression should be typography, proportion, and the substance of the work.

The positioning is product-minded software engineering. The headline and supporting line are fixed in meaning:

> Software engineering, from concept to delivery.

> I work with teams to shape product ideas, define scope, make technical decisions, and build software aligned with business goals.

Both sentences come from `profile.headline` and `profile.summary`. The page must not replace them with a second headline, and it must not compare production engineering to demos. Do not use the word “beyond” in homepage positioning. Technology and industry belong in project descriptions and the capability list, not in the hero.

The page is mostly charcoal. Sage is a signal, not a fill. Surfaces are used for a real project thumbnail or a control, not as a card around every block. Sections change rhythm — a type hero, a quiet years figure, a typographic project index, a contents-style capability list, an index for the lab, a quiet writing band, then a name and a contact close — so the page does not repeat one two-column grid. Negative space separates those regions. It should not inflate them.

Light mode stays available and uses the same structure. Dark is the primary experience.

## Color tokens

Defined on `:root` and `:root[data-theme='light']` in `src/styles/globals.css`. Components use the variables, not raw hex values.

| Token       | Dark      | Light     | Use                                                  |
| ----------- | --------- | --------- | ---------------------------------------------------- |
| `--bg`      | `#1B1D1C` | `#F3F2EC` | Page canvas                                          |
| `--surface` | `#262A28` | `#E6E7E1` | Media wells, raised panels                           |
| `--text`    | `#F1F0E9` | `#1B1D1C` | Headings and primary copy                            |
| `--muted`   | `#AEB4AD` | `#5C645F` | Secondary copy                                       |
| `--accent`  | `#A8B9AB` | `#3E5546` | One word, role lines, numbers, focus, primary button |
| `--line`    | `#343835` | `#D5D7D0` | Hairlines                                            |
| `--ink`     | `#1B1D1C` | `#F4F3EE` | Text on accent fills                                 |

`color-scheme` follows the theme. The browser `theme-color` is `#1B1D1C` in dark and `#F3F2EC` in light. The pre-paint script in `src/pages/_document.tsx` sets both `data-theme` and `theme-color` before first paint. The theme toggle updates both.

Light accent is a deeper sage so text and buttons keep contrast on the paper canvas. Do not reuse the dark sage `#A8B9AB` as text or as a button fill on the light background.

Selection is accent background with ink text.

## Typography

Existing families only. No new font files.

- Display: Manrope (`--display`), weights 500 and 600 already loaded.
- Body: DM Sans (`--body`), 16px base, line-height 1.6.
- Do not italicize homepage headings. The `.serif` class remains available and is unused on the homepage.

Scale:

- Hero: `clamp(2.55rem, 5.6vw, 5.15rem)`, with a measure of about `12em` so the headline breaks into a few confident lines. At 320–375px it is about 2.2–2.7rem. The final period, when the headline has one, uses the accent color. Do not italicize a word inside the headline.
- Section titles on the homepage: `clamp(2rem, 3.2vw, 2.65rem)`. Shared pages may still use the larger `section-heading` scale.
- Project titles in the shared directory: `clamp(1.125rem, 1.6vw, 1.375rem)` on desktop, 1.25rem on mobile.
- Body and summaries: 1.0625rem, line-height about 1.65.
- Labels: 0.75–0.8125rem, letter-spacing about 0.12–0.16em, uppercase through `.eyebrow` or a local class. Do not go below 12px.

Labels are written in sentence case in new homepage markup and uppercased in CSS. Older pages still have uppercase strings in the markup. Either is fine visually. Prefer sentence case in new copy.

Headings use tight tracking (`-0.03em` to `-0.05em`) and a line-height near 1. Body copy does not.

## Spacing and layout

- Content width is `.shell`: max 1320px, inset 56px, 36px below 1100px, 20px below 760px.
- Homepage sections use `clamp(3rem, 5vw, 4.5rem)` of vertical padding.
- Major sections after the overview are separated with a 1px `--line` rule, not a filled band.
- Alignment is a shared left edge. Asymmetry comes from column ratios and which side the media sits on, not from random offsets.
- Sticky header is full width. The inner `.header-bar` is a shell and is `position: relative`, so the mobile menu hangs from the bar instead of the viewport.

Homepage rhythm:

1. Masthead and headline.
2. Years figure plus two statements.
3. Selected work, a compact typographic index.
4. Capability list, full width, one row per item.
5. Lab, intro column and index.
6. Writing, including the empty state.
7. Name and short biography.
8. Shared contact footer.

## Component patterns

Homepage sections live in `src/components/home/`. They receive data as props. They do not import JSON.

| Piece            | Role                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------ |
| `Hero`           | Name, role, headline, summary, primary and secondary actions, GitHub and LinkedIn    |
| `Overview`       | `profile.years` and two breadth statements. Not a metrics dashboard                  |
| `SelectedWork`   | Featured professional projects using the shared text-only `ProjectDirectory`         |
| `Capabilities`   | `profile.capabilities`, numbered, no bars and no fake links                          |
| `LabPreview`     | Every featured playground project. Count comes from the array                        |
| `WritingPreview` | Up to three public notes, or the empty state                                         |
| `AboutPreview`   | Name, role, `profile.bio`                                                            |
| `SectionHeading` | Eyebrow, title, optional description, optional link. `id` supports `aria-labelledby` |
| `Reveal`         | One in-view rise. Optional `delay`                                                   |
| `Layout`         | Skip link, sticky header, contact footer                                             |

Shared chrome:

- Nav labels come from `navigation.json`: Work, Lab (`/playground`), Writing (`/notes`), About. Routes are unchanged.
- Active item uses `aria-current="page"` and an accent underline.
- Below 960px the nav is a menu. Contact moves into that menu. Theme and menu buttons are 44px.
- Footer is the contact close on every page: email and the profile links, plus the role.

### Shared editorial project directory

`src/components/project-directory/project-directory.tsx` is the single presentation used by the homepage selected work and `/work`. Styling lives in `src/styles/project-directory.css`. The old `ProjectCard` component and its image-card CSS have been removed.

- A semantic list with one full-row link per project, to its existing `/work/[slug]` route. The name is the accessible link label, the summary its description. Homepage names use `h3`; Work names use `h2` below the page's `h1`.
- Desktop above 900px uses aligned columns: project name, concise summary, category, directional arrow. Column proportions are 1 : 1.8 : 0.8 with a 24px arrow column. Rows use 24px vertical padding and subtle horizontal hairlines. There are no filled cards, surrounding boxes, or expandable sections.
- At 900px and below, each row stacks title and arrow, category, then summary. Names stay 20px, summaries 16px, categories 13px. The whole row is a comfortable touch target; text wraps naturally without clamping or truncation.
- Rows render only `title`, `summary`, and `category`. Ownership, contributions, technology collections, metrics, and attribution remain in the unchanged case-study pages.
- There is no image rendering or reserved media slot in this directory. All current cover art is excluded, including abstract SVGs. Any future genuine, approved imagery requires a deliberate refinement of this shared pattern; never add a fallback, generated artwork, or an empty container.
- Homepage receives the existing featured public project collection and retains the “All work” link. Work receives all public projects through the unchanged static content service.
- Work heading is **Selected Work**. Its description, shared with page metadata, is: “A collection of products and client engagements I've contributed to, from early development through production delivery.”
- Work filters retain their category selection logic. Controls are compact text with a restrained active underline and 44px minimum hit area. The live result count reads filtered count of total public count; neither value is hardcoded.
- `Reveal` retains a restrained Framer Motion entrance. Hover accents the project name and nudges the arrow by 2px only when reduced motion is not requested. Keyboard focus outlines the full row.

Case-study layouts and illustration covers are unchanged in this phase. No routes, content schemas, repository contracts, visibility rules, themes, or CMS boundaries have changed. No dependencies were added.

Lab rows are one link each. Status is the record’s `status`. There is no slug-to-icon map on the homepage.

Writing renders real notes with title, UTC date, summary, and tags when tags exist. With no notes it shows “Nothing published yet.” and does not invent titles.

## Animation

Framer Motion is the motion library. `MotionConfig reducedMotion="user"` stays in `_app`.

- Hero entrance is a short rise (`y` only), staggered across the masthead, headline, and actions. Opacity stays at 1 so a failed script cannot hide the headline.
- `Reveal` moves from 14px and opacity 0.86 to rest, once, when the block enters. Content is visible before the animation because `initial` is false.
- Directory links use a small arrow nudge inside `prefers-reduced-motion: no-preference`. There is no project image motion.
- Buttons change background color. They do not jump or spin.
- There is no page transition, parallax, or looping background motion.

`prefers-reduced-motion: reduce` disables CSS transitions and animations, sets `scroll-behavior` back to `auto`, and forces hero transforms to `none`. Framer’s reduced-motion setting skips the in-view keyframes.

## Responsive behavior

Checked widths: 320, 375, 768, 1024, 1440.

- 320–900: homepage regions stack. A project row stacks as name and arrow, then category, then summary. The primary hero button is full width. The masthead stacks.
- Below 960: hamburger. The open panel is `position: absolute; top: 100%` on `.header-bar`, so it stays attached when the header is sticky. Escape closes it and returns focus to the toggle. Body scroll locks while it is open. A route change closes it.
- Above 900: project rows use four aligned columns for name, summary, category, and arrow on both pages.
- Type does not shrink to fit a desktop composition onto a phone. The hero keeps a short measure so the headline stays a few lines, including at 320px.

Touch targets for header controls, hero actions, project rows, and footer links are at least 44px. The homepage has no contribution disclosure.

Focus uses a 2px accent outline with a 3px offset.

Heading order on the homepage is one `h1`, then `h2` per section, then `h3` for each project, lab item is not a heading (the section `h2` covers it and the link text is the name), and note titles are not separate headings inside the link. Lab and writing names are inside the link, not extra heading levels, so the outline stays h1 → h2 → h3 for work only. The footer contact line is an `h2`.

## Decisions made during implementation

- Dark canvas, surface, text, sage, and secondary text follow the brief. Light mode was re-paired so the same roles stay readable.
- Homepage and Work use the shared `ProjectDirectory`; `PlaygroundCard` remains specific to the unchanged Lab directory.
- Homepage styles are in `src/styles/home.css`, imported from `_app`, so `globals.css` does not absorb the new sections. Class names are prefixed `home-`.
- `getHomeContent` now returns every featured playground project and the public notes. The old `slice(0, 2)` hid Buddy and REPUBLIC even though they are featured. The view does not hardcode slugs.
- The writing preview shows at most three notes. The rest stay on `/notes`.
- Overview copy uses `profile.years` and does not repeat `profile.summary`, which is already in the hero. It does not invent project counts or business results.
- Homepage project rows do not show metrics. DCP+ figures are development traces. Concrete’s TVL is platform scale with a context string. Those belong on the case study, where the scope label already exists.
- Capability names are the strings in `profile.capabilities`. They were not rewritten into longer group descriptions.
- Featured summaries were rewritten in the project records so the homepage states the engineering contribution. Roles, ownership, contributions, metrics, and case studies were left as supplied. Reka AI stays one sentence because that is all the record supports. The view reads `summary`; it does not hardcode a second description.
- Homepage and Work rows are text-only regardless of the media collection. Existing image records remain available to case-study pages.
- The shared footer and header are the homepage’s navigation and contact close. The contact heading is “Tell me about the product.” It does not repeat `profile.headline` and it does not compare the work to a demo. Other pages inherit the tokens, type size, and chrome. Their section layouts were not redesigned.
- Nav collapses at 960px rather than 760px so “Let’s talk”, four links, and the icon buttons do not collide.

## Remaining work for other pages

Not part of the homepage phase:

- Case studies, including an intentional state for studies with empty sections.
- Lab index and lab detail pages. The homepage no longer uses the slug-to-icon map; the playground index still does.
- Notes index and article template, including rendering tags on the detail page.
- About page. The homepage preview uses `profile.bio`. The About page still has additional hardcoded paragraphs.
- Genuine project imagery can be curated later. The directory reserves no thumbnail space. Detail pages need their own pass before illustration covers are replaced.
- Richer Reka AI, playground, and note records are content work. Do not invent them in the view.

## Directory correction validation — November 7, 2026

- Typecheck, ESLint, all three content tests, and the production build pass on Node.js 22.
- Homepage and Work visually checked at 1440px desktop and 375px mobile widths. Both use the same text-only rows; no horizontal overflow or rendered images in either page's main content.
- All eight Work filter controls checked: All work 9, Streaming 1, Web 5, Connected TV 1, Fintech / DeFi 1, AI 2, Mobile 5, Commerce 3. These observations are not hardcoded UI values.
- Verified homepage “All work”, row-to-detail navigation, and full-row keyboard focus. All nine public project-detail destinations are present in the static build.
- Approved hero copy flows from the profile into the page and metadata. The social preview image also uses the approved headline.
