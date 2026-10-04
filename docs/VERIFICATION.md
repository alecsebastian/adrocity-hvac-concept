# Verification and delivery notes

Verified locally on October 4, 2026. Nothing was deployed, and no DNS or existing Adrocity Studios production files were changed.

## Build checks

- `npm run lint`: passed, zero errors and zero warnings.
- `npm run typecheck`: passed.
- `npm run build`: passed. Next.js 16.3.8 generated all five main pages, both article routes, the 404 page, robots.txt, and sitemap.xml.
- `npm audit --omit=dev`: zero vulnerabilities.
- Full development dependency audit: five high-severity entries in the same transitive lint-tool chain (`eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch` → `braces`). The reported underlying issue is [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), a deeply nested-pattern denial of service. The registry suggested downgrading Next's lint configuration to 14; that incompatible downgrade was not applied. This tooling does not ship in the static site. Recheck for a compatible upstream patch before using untrusted projects or patterns with the development tools.

## Browser checks

The Playwright suite uses a real Chromium browser against the production static export, not just a dev build. **27 tests passed** after the readability and layout revision. The machine's installed Chromium binary was supplied through `PLAYWRIGHT_EXECUTABLE_PATH`.

- All seven content routes load at **320, 390, 768, and 1440 CSS pixels** without horizontal page overflow or broken images.
- Fluid reading text and both homepage hero actions were checked at **320 × 568, 390 × 844, 1365 × 620, and 1920 × 920 CSS pixels**. The wide layout uses the viewport width instead of a centered maximum-width canvas.
- The studio contact panel appears after scrolling, has a working email link, stays above the mobile action bar, and can be dismissed during navigation.
- Exactly one main heading per page; noindex metadata on every route; no invented telephone links.
- Every desktop call and assessment CTA across all seven routes opens its intended dialog.
- Internal page links, robots.txt, and the custom 404 response work.
- Replacement inquiry: required-field validation, focus on invalid fields, all three steps, entered-context review, explicit non-submission confirmation, fictional owner summary, and reset.
- Repair inquiry: early call route; browser-back behavior returns to a cleared request experience.
- Maintenance and unknown-system options; outside-area notice; back-navigation retains answers within an open preview.
- Direct `#request` and `#privacy` deep links, dialog close button, Escape close, restored focus, and keyboard containment.
- Mobile navigation open, Escape close, return of focus, and route navigation.
- Reduced motion disables smooth scrolling and transitions.
- Mobile keyboard focus remains visible above the fixed action bar.
- User text-spacing overrides (1.5 line height, .12em letter spacing, .16em word spacing, 2em paragraph spacing) preserve page reflow at 320 and 1440 pixels.
- During the inquiry journey, no outbound/submit request occurs and both browser storage areas remain empty. The optional real embed was not configured or loaded.

## Accessibility scope

Automated axe checks, with WCAG 2 A/AA, 2.1 AA, and 2.2 AA tags, reported **zero violations on all seven content routes at 390 and 1440 pixels**. The open inquiry and confirmation/owner-summary states also passed axe checks.

The implementation includes a skip link, landmark navigation, native form controls, labeled radio groups and selects, associated error text, visible focus indicators, native modal behavior with explicit focus containment/return, reduced-motion support, responsive reflow, and contrast-tested text. The illustrative map has an accessible text equivalent and a parallel neighborhood list. Decorative graphics are hidden from assistive technology; meaningful images have alt text and visible concept captions.

These checks support a WCAG 2.2 AA target; they are **not a claim of independently certified full conformance**. Remaining manual checks include real screen-reader use with NVDA/JAWS/VoiceOver, Safari and Firefox behavior, forced-colors mode, and actual-device zoom and assistive input. Those were not available in this local verification run. A future real iframe also requires its own accessibility and submission review.

## Visual inspection

Full-page and viewport screenshots were rendered and inspected for the home page, repairs, new systems, crew, and journal, alongside mobile home, mobile article, and mobile request flow. Added 13-inch-style laptop and 24-inch-style large-monitor viewports, crew imagery, and the contact panel. Capture artifacts are in `artifacts/` and can be regenerated with `scripts/capture.mjs`.

Review led to concrete changes: cleaner replacement-page headline proportions, smaller mobile hero artwork so it does not cross the headline, larger mobile operational labels, non-obscured focus above the fixed mobile controls, robust CTA hash handling, and reflow with custom text spacing. The fictional concept is disclosed in the header, footer, image captions, work scenarios, service-area copy, call state, and request flow.

The design intentionally uses a distinct signal color, measured-airflow motif, oversized type, varied interior compositions, and separate call/assessment journeys. Whether it surpasses the supplied visual benchmark is a creative review decision, not something compilation or an automated score can establish.

## Performance and external dependencies

- All normal page assets, including fonts and three WebP concept photographs (~192–278 KiB each), are served locally.
- No client analytics, remote font service, map SDK, database, or API is used.
- Image dimensions are reserved; secondary imagery is lazy loaded; the home/crew lead image is prioritized.
- Static HTML is produced for every content page. Only the shared menu/dialog interactions require client state.
- No formal Lighthouse, throttled Core Web Vitals, or field-performance score is claimed.
- Real Lead Qualifier delivery remains intentionally unconnected because no verified embed URL or integration instructions were supplied. The local preview is complete and works without it.
- Netlify configuration is present but untested against an actual deployment, in accordance with the no-publishing instruction.
