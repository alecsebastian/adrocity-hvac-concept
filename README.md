# Steady Heating & Air

A complete, fictional residential HVAC website concept for [Adrocity Studios](https://adrocitystudios.com). Built locally in this repository; **not published**. Steady is not an operating contractor. The website does not collect leads or make phone calls.

## Run locally

Requires Node 22+ and npm. On Windows PowerShell, use `npm.cmd` when execution policy blocks the `npm.ps1` shim.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For the production version:

```sh
npm run build
npm run preview
```

`npm start` also serves the static production build. The local server binds to the loopback interface only. Do not start the dev and production servers on the same port simultaneously.

## Project and editing

Next.js 16 App Router, React 19, strict TypeScript, Tailwind 4, custom CSS, locally packaged fonts. The result is a static export in `out/`; there is no server application, database, authentication, analytics, or paid runtime dependency.

| Area | File |
| --- | --- |
| Identity, agency link, neighborhoods, hours, navigation | `lib/site.ts` |
| Colors, typography, layout, responsive rules | `app/globals.css` |
| Mark, airflow dial, route lines, area diagram | `components/graphics.tsx` |
| Header and footer | `components/site-shell.tsx` |
| Shared editorial components | `components/editorial.tsx` |
| Scroll reveals and studio contact panel | `components/enhancements.tsx` |
| Call, privacy, assessment dialog and form logic | `components/experience.tsx` |
| Home | `app/page.tsx` |
| Repairs | `app/repairs/page.tsx` |
| Replacement and installation | `app/new-systems/page.tsx` |
| Crew and illustrative service area | `app/crew/page.tsx` |
| Journal index | `app/field-notes/page.tsx` |
| Complete article content | `content/articles.ts` |
| Article rendering | `app/field-notes/[slug]/page.tsx` |

Articles are typed local content objects rather than a CMS or a Markdown parsing dependency. Edit the title, intro, section paragraphs, bullet lists, takeaway, and related link in `content/articles.ts`. Add a new object to create another statically generated article. The index and sitemap update from the same content source.

## Identity and design

**Creative thesis:** field precision meets neighborhood accountability. The identity uses warm paper `#f5f4ed`, charcoal `#242820`, and signal yellow-green `#d4ed48`. Barlow Condensed carries the oversized headlines; DM Sans supports reading and interactions. Monospaced field labels organize the supporting details.

The bespoke mark is a set of returning air paths. It expands into a measured airflow dial, section routing, field-stamp photography, service navigation, and the assessment handoff. Two hero approaches were considered: a photo-led service ticket and a type-led editorial composition. The latter was selected for immediate recognition and a clearer separation between the two homeowner journeys.

Reference 6 informed the confidence of the scale and hierarchy, not its assets or ribbon treatment. This build uses a different brand, palette, graphic logic, original image, and layouts. Its practical distinction is the separate urgent-call and planned-assessment routes, carried through five complete pages and the journal. Visual quality remains a design judgment; screenshots are included for review rather than presenting a subjective benchmark as a test result.

## Lead Qualifier and call preview

Every route can open `#request`, `#call`, or `#privacy` directly. The default assessment is a **local preview**: answers exist only in component memory, are cleared when it closes, and are never submitted, stored, emailed, or sent to analytics. It intentionally does not collect a name, telephone number, or email address. Repair selection offers the call route immediately. Replacement and maintenance paths tailor the context question.

The confirmation displays temporary answers, then optionally shows a separately labeled, fixed fictional owner handoff. It never claims that a request booked a visit. A call action explains how a verified real client's phone number would work; there are no `tel:` links or invented numbers.

No real embed URL or product-specific integration instructions were supplied in the brief. To connect a real embed later:

1. Obtain the actual HTTPS embed URL and its integration/privacy instructions from Adrocity Lead Qualifier. Do not invent an API endpoint.
2. Set `NEXT_PUBLIC_LEAD_QUALIFIER_EMBED_URL` in `.env.local` or the hosting environment and rebuild. This is a public URL, never a secret.
3. The request dialog presents an explicit option to open the connected external form, explaining that provider terms apply. The local preview remains available.
4. The iframe has a title, a loading state, a timeout fallback, a new-tab alternative, and a return action. Its loaded event cannot prove that a cross-origin provider rendered successfully, so the fallback link remains available.
5. Validate the real provider's iframe permissions, content security policy, mobile layout, internal keyboard behavior, submission consent, and end-to-end delivery. No undocumented resizing message listener or integration endpoint is assumed.

## Netlify readiness, without deployment

`netlify.toml` specifies Node 22, `npm run build`, and publish directory `out`. Static export requires no Netlify adapter or Next server runtime. There is no catch-all SPA rewrite: each page has its own HTML and the project includes a proper `404.html`.

Public canonical URLs, share metadata, and the sitemap use `https://hvac.adrocitystudios.com`; pages remain noindex. Local edits do not change the live site until deployed.

## Fictional-site search protections

`noindex, nofollow` is set in root metadata and Netlify's `X-Robots-Tag` response header. `robots.txt` disallows crawling. There is no invented LocalBusiness schema, NAP, live availability, review count, award, certification, savings promise, or testimonial. Noindex should remain enabled for this portfolio concept, including if it is eventually published.

When adapting to a real contractor: verify its identity, actual crew, phone number, coverage, office hours, emergency availability, licenses, claims, photo permissions, prices, privacy policy, and delivery workflow. Replace the concept disclosures and generated scene with verified material. Only then intentionally revise robots metadata, the response header, robots.txt, canonical origin, and sitemap policy. Add structured data only for verified details. A real contact form needs consent and actual secure delivery, not just a different success message.

## Assets and licenses

See [`docs/ASSETS.md`](docs/ASSETS.md) for generated-image provenance and creative directions, font licensing, and custom graphics. Everything the page loads is local. There is no external font request or hotlinked photograph. Three generated photographs are delivered as 1536 × 1024 WebP files with reserved layout dimensions. Their source images are preserved in Codex's generated-image directory.

Supporting text uses a fluid reading scale, with larger body copy and controls across phone, laptop, and large-monitor layouts. Sections reveal on scroll unless reduced motion is requested. A dismissible studio contact panel appears after meaningful scrolling or a short delay and opens the user's email app; it does not collect information on the site.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

The browser suite starts the static production preview if necessary. `PLAYWRIGHT_EXECUTABLE_PATH` may point to an existing compatible Chromium binary instead of downloading one. `node scripts/capture.mjs` captures full-page and viewport screenshots with that same optional environment setting. It expects the preview server to be running.

See [`docs/VERIFICATION.md`](docs/VERIFICATION.md) for the final checks, limitations, and accessibility scope. Screenshots are in `artifacts/`. The automated axe checks target WCAG 2.2 AA; automated checks alone do not establish complete WCAG conformance.
