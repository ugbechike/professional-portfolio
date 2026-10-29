# Content architecture: V1 → V3

V1 statically renders the Pages Router using asynchronous content services. `ContentRepository` is the read contract; `jsonRepository` validates all JSON through Zod, rejects duplicate slugs, and excludes private/draft records. Pages request serializable content in `getStaticProps`; presentation components never import source JSON. Dates are optional because engagement dates were not supplied. Structured case-study sections support prose, images, code, and textual architecture diagrams.

V2 should implement an API/database repository behind the same interface. Add authenticated `/admin` routes and a shared content service for validation, authorization, transactions, and draft/publish operations. Use stable IDs independently of slugs. Introduce storage-backed media with an explicit image-origin allowlist. Keep public reads separate from authenticated writes. Preview must not leak draft content into public page props, assets, or sitemaps. Trigger on-demand revalidation after publishing so content updates do not require manual deployments. Existing page/UI props remain unchanged; the static path strategy will need to support newly published slugs.

V3 adds a separate MCP server that calls the same authenticated content operations. Use scoped credentials, per-operation authorization, audit logs, and explicit publishing authorization. Tools may list content, create/update drafts, and request publishing; they must never have unrestricted database access.

No admin, authentication, database, public write API, or MCP server is implemented in V1. Notes use structured sections until real articles justify a Markdown/MDX adapter. Any future Markdown renderer must sanitize untrusted HTML.

Evidence belongs with the content. Every impact metric carries personal/team/platform/development scope and contextual evidence. Empty fields should remain absent, never become invented claims. Images in V1 are original abstract covers, not screenshots or client-supplied logos.
