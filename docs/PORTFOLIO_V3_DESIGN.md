# Portfolio V3 — Lovable reference adaptation

This document supersedes the visual decisions in PORTFOLIO_V2_DESIGN.md. The eight user-supplied Lovable screenshots are the visual reference; repository content remains the factual source. The fictional person, availability, employers, dates, products and metrics in the screenshots are not content sources.

## Visual system

A narrow paper-colored reading column, monospace headings and navigation, readable prose, compact text-only listings and quiet dashed rules. No decorative project art, filled cards, oversized headlines or serif accents.

- Default canvas: #F2EFE8. Text: #191919; prose: #62605B; metadata: #77736E; rules: #D9D3C9.
- Optional dark theme remains available through a quiet footer control. Existing explicit saved preferences are honored; new visitors receive light mode. Pre-paint theme and browser theme color stay synchronized.
- Monospace: native SFMono-Regular, Consolas, Liberation Mono, Menlo fallback stack. This avoids another font dependency or network request; exact glyph shapes vary by OS. Prose uses the existing locally bundled DM Sans. Unused Manrope imports are removed.
- Name: 44px desktop / 36px mobile. Page heading: 38px / 32px. Project titles: 18px / 17px. Prose: 16–17px, line height 1.65. Metadata: 12–14px.
- Column: 672px maximum, 24px side insets. Header begins 32px from the top (20px mobile). Main content begins 104px after the header (64px mobile). Entries use 25px vertical padding. Section gaps are 36–48px.
- Only low-contrast 1px dashed separators divide lists and footer. Technology labels have a dashed underline, avoiding the reference's solid badge outlines in accordance with the written brief.

## Components and routes

Layout supplies the compact `~/johnugbe` navigation, skip link, main landmark and small copyright/social footer. All existing routes remain. Contact is added at `/contact` and included in the sitemap. The footer retains its legacy `#contact` anchor.

The homepage follows name → role/location → approved headline/summary → two actions → featured work → short biography. It omits the reference's availability claim and employment rows because those facts were not supplied. The total-project link is derived from the public collection.

ProjectDirectory is shared by home and Work. Each entry renders its linked title, summary, category and up to four technologies. Work adds the role and up to two contributions, with no metrics or disclosures. Verified dates gain an 80px gutter; without dates there is no empty column. Current engagements retain their status. Filters remain compact text controls with `aria-pressed` and a live result count.

Lab uses the same open text-entry treatment with accurate project status. No slug-specific icons, artwork or invented entries. Writing has a deliberate empty publication state. About uses the canonical biography and capabilities. Its small portrait note reserves a future insertion point without a blank decorative panel; the experience timeline renders only when real repository records exist.

Contact follows the reference's exception for a framed email: thin outline, 4px hard shadow, `$ mail`, linked address, send and copy actions. Copy uses the Clipboard API and announces success or a useful failure message. Social links come from profile content. No resume link is fabricated.

Existing case-study routes use the same column, typography and palette. Abstract covers and the duplicate sidebar are removed. Existing narrative and attributed metrics remain intact; incomplete studies explicitly say that the full study is not published. Empty technology sections are omitted. Lab details similarly acknowledge unpublished notes.

## Motion and responsive behavior

The decorative cursor has fixed inline dimensions, is hidden from assistive technology, and blinks every 1.15 seconds without shifting layout. Reduced motion makes it static. Framer Motion remains: one 6px reveal over 0.3 seconds, skipped for reduced motion. There are no background animations or page transitions.

Below 640px the navigation becomes a disclosure menu. Escape closes it and restores focus. Routes close it; body scrolling is locked while open. Dates and experience rows stack on small screens. Buttons and menu controls have 44px targets. Email wraps on narrow displays. Visible focus outlines and semantic heading order remain.

## Architecture

Pages Router, strict TypeScript, getStaticProps/getStaticPaths, ContentRepository, JSON/Zod, public visibility filtering, existing slugs, SEO and future CMS boundaries are retained. Location is an optional profile field populated with the user-provided Ontario, Canada. No dependencies were added. Obsolete homepage components and the two old page stylesheets were removed.

## Validation — November 7, 2026

- Typecheck, ESLint, all three repository/schema tests and production build pass; 21 static pages generated.
- Browser layout checks at 320, 375, 768, 1024 and 1440px on home, Work, About, Lab, Writing, Contact and representative complete/incomplete professional and lab details: no horizontal overflow, no rendered project artwork.
- Visual review of desktop home, Work, About and Contact, plus mobile home, Work and Contact against the supplied reference.
- All eight category filters verified: All work 9, Streaming 1, Web 5, Connected TV 1, Fintech / DeFi 1, AI 2, Mobile 5, Commerce 3. Counts are observations, not hardcoded values.
- Homepage-to-Work and project-to-detail navigation verified. Mobile Escape/focus return verified. Production copy-email success state verified.
- Production preview served locally on port 3003. Deployment remains the repository's existing Vercel workflow.

## Remaining content work

Provide John's actual photo for a future ink portrait, an actual resume asset, and verified employment records/dates. No project dates currently exist, so none are displayed. Seven professional case studies and the lab projects need fuller source content; no narratives were invented. Writing remains empty. The repository's existing social preview image is retained; a matching paper-style social asset can be supplied separately.

## Hero and employment update — November 8, 2026

The approved hero is now “I build thoughtful products and reliable systems.” The complete supporting paragraph lives in profile.json and also supplies homepage metadata.

Five employment records supplied in the user's resume-derived brief now populate experience.json: Lazer Technologies, Global Villages, Mart, Tenece Professional Services and Genesys Tech Hub. This resolves the employment-history gap noted above. Their overlapping periods are preserved. Because the unchanged schema uses ISO calendar dates, month-precision source dates are stored with day 01 as a normalization convention, not an asserted day of employment. The UI and semantic time values expose only month/year precision. Omitted endDate denotes the explicitly current Lazer role. Locations are not added to the existing experience schema for this task.

The shared ExperienceList renders a compact three-role homepage preview after Selected Work and the full five-role About timeline with summaries. getExperienceContent reads through ContentRepository and sorts by descending start date; homepage selection occurs in getHomeContent. No employment data is duplicated in presentation components. Desktop uses a narrow muted date column and a role/company column; rows stack below 640px. No new decoration, cards, borders or animation is introduced.

Validation: typecheck, lint, four tests and the production build pass. The new content test protects all five source periods, including overlaps, and the three-record homepage selection. Browser checks at 320, 375, 768, 1024 and 1440px confirm three homepage rows, five About rows, correct displayed ranges and no horizontal overflow. The More about me link reaches About.
