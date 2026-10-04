# Build brief for GPT-6 Astra: Adrocity Studios HVAC concept website

You are the creative director, brand designer, UX designer, copywriter, and senior frontend developer for this project. Build a complete, visually exceptional website for a **fictional small US residential HVAC company**. This will become a live industry example in Adrocity Studios' portfolio and demonstrate the standard of custom design, development, messaging, and lead capture offered to small businesses from $129/month.

The user has attached six visual references in order. **Image 6 is the benchmark to surpass.** Study its actual composition carefully. It has enormous confident typography, a crisp red/black/white palette, an ownable graphic moving through the headline, asymmetry, and a clear phone action. It looks deliberately designed rather than assembled from a website kit. Surpass it through an equally distinctive but wholly original brand idea, stronger content hierarchy, more thoughtful mobile art direction, greater consistency across five pages, and a better separation of urgent calls from planned estimates. Do not reproduce its name, ribbon, red tape, layouts, wording, icons, photos, or exact graphic treatment. Images 1–5 are useful as contrast and selective inspiration; do not average them together into a familiar HVAC template.

The delivered result must be an actual working, responsive, five-page website plus two complete journal articles. It should be convincing enough that an owner of a three-to-six-technician HVAC business could picture a version made specifically for their crew. It must never masquerade as a real operating contractor.

## 1. First actions and working approach

Read the repository instructions and inspect the project before changing files. If the folder is empty, create the full project. If useful assets or an existing setup are present, use them without destroying unrelated work. Build autonomously through implementation, local testing, visual inspection, and refinement. Make sound decisions without stopping for routine preferences.

Before coding, define a concise creative thesis, original fictional company identity, design tokens, typography plan, visual motif, page architecture, and homeowner journeys. Explore at least two substantially different hero compositions privately, then implement the stronger one. Do not present half-finished alternatives as the deliverable. The final site should have one committed visual language carried across all pages and states.

Use Next.js 16, React, TypeScript, and Tailwind if starting from scratch, following current compatible conventions. Keep the build suitable for Netlify. Avoid unnecessary libraries, paid runtime services, and an OpenAI dependency. Make content, business details, routes, theme tokens, and journal posts easy to edit. Use local MDX or a similarly simple content approach for the two initial articles. Do not spend the project building a CMS or admin dashboard. Work locally and produce a verified build. Do not deploy, change DNS, or modify the existing Adrocity Studios production site.

## 2. Business and customer story

Invent a believable small, owner-led HVAC company serving residential customers in a plausible US metro area with both heating and cooling needs. It has a real point of view: practical diagnostics, clear explanations, care for the home, and a small team accountable for the work. This identity is fictional and must be marked as a concept in a restrained but unmistakable site-wide way, with attribution to Adrocity Studios and a path back to the agency. Do not invent a real street address, working phone number, license number, actual emergency coverage, booking availability, certifications, financing approval, partner logos, review counts, awards, jobs completed, or testimonials. Any sample details should be identified as illustrative where encountered.

The site serves two main visitors:

1. **Urgent repair:** the heat or cooling has stopped. They want to know whether the crew serves their area, whether it handles the issue, whether it is open, and how to call now. On a real client site, the phone number must be prominent and tap-to-call. In this fictional public concept, do not provide a deceptive live phone number or a button that dials an unrelated person. Use a clearly labeled demo call action that explains how the real client's number would work.
2. **Planned replacement:** the system is aging, unreliable, or costly. The visitor wants to know what an assessment involves, what affects options and price, what past work looks like, and how to request a callback with useful context. This is where Adrocity Lead Qualifier should be most compelling.

Maintenance can be a supporting route. Never promise a same-day arrival or 24/7 service without a real operation behind that claim. Make service area and hours prominent as illustrative information, especially on mobile.

## 3. Art direction: original and beyond the reference

Develop an original identity strong enough to be recognizable from a cropped screenshot. The design should feel like a well-funded agency created it for a specific local business, yet remain credible for a small working crew. Think **field precision meets neighborhood accountability**. The mood is capable, direct, tactile, and confident. It may use warm white, charcoal, and one signal color inspired by image 6, but develop a distinct palette and reason for it. Red is an option, not a requirement; avoid the standard bright-blue/orange HVAC pairing. The concept has its own brand, separate from Adrocity Studios' gold and black.

Create a bespoke graphic system with a clear rationale connected to airflow, routing, repair markings, measurement, or the physical work. It should appear in several ways across the site: the hero, section transitions, page navigation or labels, photography treatment, the request flow, and small details. Do not simply thread a copy of image 6's ribbon across the page. Consider line weight, interruption, direction, and scale. The motif should add meaning and recognition without obstructing type or controls.

Typography is a major design tool. Use an assertive display face or carefully built wordmark, tightly controlled headline proportions, and a readable supporting face. Give each page an intentional composition rather than a repeated stack of hero, three cards, testimonials, and CTA. Use varied editorial grids, large type, considered white space, image crops, restrained technical annotations, and small labels that feel rooted in the job. Avoid generic SaaS cards, random gradients, glassmorphism, fake dashboards, excessive rounded corners, stock badge rows, icon confetti, and decorative motion without purpose.

Photography should feel documentary and local: a technician inspecting a unit, hands and tools, a clean installation, a real home setting, possibly a small crew. Use original or appropriately licensed assets and record attribution/license. The six reference screenshots are inspiration, not reusable assets. Do not lift their photography or hotlink arbitrary images. If generation is available, original images can be used, but inspect them for implausible tools, wiring, hands, PPE, or equipment. Do not imply generated people are the real crew. If image access is limited, create an art direction that remains strong with a small number of excellent assets and honest placeholders, and list what a real client would need to supply.

A few restrained transitions can reinforce the brand, but the site should feel fast and solid. Honor reduced motion. The mobile version must be intentionally art directed, not merely the desktop grid collapsed into one column. The hero, motif, service paths, fixed call/request controls, and images need mobile-specific compositions and readable type.

**Quality gate for the benchmark:** When comparing the finished homepage to image 6 at equal desktop width, it should have an equally clear visual identity and phone action, with stronger hierarchy, more original brand logic, less clutter, and clearer differentiation between urgent repair and planned replacement. The interior pages and mobile views must maintain that standard. Do not declare success based only on a polished hero.

## 4. Five main pages and two journal articles

Use these **five main navigation pages**. Journal article URLs are additional content under the Journal and do not count as core pages. The inquiry experience may be a carefully designed modal/drawer or an in-page section with a direct deep link, so it remains reachable from every route without adding a sixth generic Contact page.

### 1. Home

Opening screen: original name/mark, geography and residential focus, service area/hours as illustrative, direct statement of what the crew does, and two distinct actions: urgent repair path and planned estimate path. Make the visual identity immediately apparent. Follow with a service split, specific process or standards, a real-looking but explicitly fictional crew introduction, a few examples of work without pretending they are paid client jobs, an explanation of how callbacks work, the service area, a journal feature, and a strong closing action. Do not overload the first viewport with badges or self-congratulation.

### 2. Repairs

A page for heating and cooling repair with a clear list of situations served, what happens when someone reaches out, how diagnosis and approval are handled, practical questions, and a prominent call route. Include maintenance as a secondary section if appropriate. Do not publish risky DIY electrical or refrigerant advice. Do not guarantee an outcome or diagnose equipment from symptoms alone. The emergency route must remain simple and fast.

### 3. New Systems

A thoughtful replacement and installation page: signs an assessment might be useful, how the crew evaluates the home, what influences the recommendation, comparison of options without fabricated prices, care during installation, and what the homeowner should expect next. Show the planned-estimate Lead Qualifier route prominently. Convey competence without unsupported efficiency or savings claims.

### 4. The Crew & Service Area

Human, specific explanation of who does the work and how they treat a customer's home. Include an illustrative service-area layout that is clearly part of a fictional concept, not a live business listing. A visually interesting area map or neighborhood list is welcome, but no invented Google map pin or real street address. Explain what makes this owner-led crew different in observable terms, not “we care” platitudes.

### 5. Field Notes / Journal

A distinct editorial index with two fully written, useful articles, accessible at their own URLs. Suggested subjects: “Repair or replace? What a good HVAC assessment should actually cover” and “What to tell a technician when your AC stops cooling.” Adjust titles based on the chosen identity and location. Articles should answer the reader's real questions, include clear structure and internal links, and avoid keyword stuffing, unsupported statistics, unsafe procedures, and generic AI prose. The journal should look designed, not like a default blog template.

Global: coherent header, mobile menu, footer, site-wide concept attribution, clear contextual CTAs, accessible route transitions, and a consistent way to request an estimate. A real homeowner should never have to hunt for the service area or the next step. The demo visitor should always know this is a concept.

## 5. Lead Qualifier and request experience

Demonstrate the value of Adrocity Lead Qualifier as part of the website, with no false claim that fictional submissions reach a crew. The intended planned-estimate journey is: click “Request a system assessment” → answer a few relevant questions → see a confirmation/demo state → optionally see a sample “what the owner receives” view that makes the faster, more informed callback concrete.

If a working demo embed URL and the actual Adrocity Lead Qualifier instructions are present, inspect them and integrate the real iframe using a configurable value. Do not invent integration endpoints, expose secrets, or bypass the product's security. Handle responsive sizing, loading, errors, and keyboard access. If the actual embed is unavailable, create a clearly labeled **local preview** of the multi-step form with no network submission, storage, email, analytics payload of answers, or real lead collection. Say explicitly in the UI that it is a sample experience. Use fictional sample data on the contractor-side summary. Document how to switch to the real embed.

Relevant questions can include: service type (repair, replacement, maintenance), ZIP or general service area, current system type if known, broad description of the problem, desired timeframe, and preferred contact method/time. Keep the flow short, branch where sensible, and do not ask the homeowner to troubleshoot dangerous components. For urgency, present the call route early rather than forcing the visitor through the full sequence. Do not label a homeowner “bad,” “unqualified,” or guarantee that a submitted form books service.

For the concept site's urgent call button, a small explanatory preview state is preferable to a fake tel: link. For a real client build, the CTA should become a functional phone call to their real number. The concept should illustrate both routes cleanly.

## 6. Content and SEO foundations

Write original US-English copy with a plainspoken, capable voice. Let concrete operational details do the persuasion. Avoid “trusted experts,” “your comfort is our priority,” “unmatched service,” “transform your home,” and filler claims. No fake review stars, guarantees, awards, licenses, manufacturer authorizations, 24/7 coverage, coupons, financing, or metrics. A concept can still feel complete through clearly illustrative examples and thoughtful explanations.

Implement sensible titles and descriptions, canonical behavior, heading structure, semantic HTML, alt text, internal links, share metadata, and sitemap where appropriate. Make service pages useful for search-oriented structure. **Set the fictional demo to noindex by default**, so it does not appear as a real HVAC company in local results. Do not emit LocalBusiness schema with made-up NAP details. Document what would change when adapting the build for a real contractor with verified details. The journal demonstrates the ongoing article offer without pretending this fictional site ranks.

## 7. Accessibility, performance, verification

Build for narrow mobile widths, typical phones, tablet, and desktop. Ensure sufficient contrast, visible focus, keyboard access, semantic buttons/links, useful form labels, error/help text, touch targets, reduced motion, and no horizontal scrolling. Avoid text embedded in images. Keep the large typography expressive but readable. Compress and size assets; prevent layout shifts; keep the call/estimate path fast on mobile.

Run lint, typecheck, and production build; fix failures. Test all five pages, both articles, mobile menu, links, every CTA, form branches and reset, sample summary, and the concept disclosure. If browser preview or screenshots are available, inspect the actual rendered site on desktop and at multiple mobile widths. Iterate on composition, copy, image crops, spacing, contrast, and interaction until the whole experience reaches the reference benchmark. Do not stop at “it compiles.” State exactly what was verified and any remaining limitation.

## 8. Handoff

Deliver the complete source project and a short README covering setup, local run, build, Netlify deployment configuration, content/article editing, Lead Qualifier embed configuration, asset sources/licenses, fictional details that must be replaced for a real customer, and the noindex default. Give a concise summary of the identity, why it surpasses image 6 rather than mimics it, the implemented journeys, test results, and remaining external dependencies. Do not publish the site or edit the Adrocity Studios portfolio yet.

**Acceptance test:** A small HVAC owner opening the live local preview should immediately recognize an agency-quality identity rather than a reskinned contractor template. They should be able to see how an urgent customer calls quickly and how a replacement inquiry arrives with useful context. Five complete pages, two substantial articles, mobile-specific art direction, and a coherent custom design system must all work together.
