# Asset provenance

## Original concept image

- Asset: `public/images/steady-fieldwork.webp`.
- Source: built-in imagegen tool, generated specifically for this concept on October 4, 2026. No reference screenshot pixels or photography were reused.
- Original: `C:/Users/alecs/.codex/generated_images/01a10686-c84b-7160-8b57-45d25367ec0c/exec-3b6a53db-415a-4f1e-aa76-fcc54241202a.png`.
- Delivered image: 1536 × 1024, WebP quality 84, 284,308 bytes. Converted with Sharp, retaining the original generated source.
- Use: documentary-style visual direction only. The person, home scene, and job are illustrative, not evidence of an actual crew or completed work. The photo caption explicitly says so wherever the image appears.
- Inspection: visually checked the visible hands, clipboard, clothing, condenser grille, pad, closed equipment panels, and residential setting. This is not a technical installation diagram and does not certify equipment clearances or installation compliance.
- Rights note: original AI-generated output, not a licensed stock photograph. No third-party photographer or stock license is claimed. Font and software licenses are separate. A real client should provide permission-cleared documentary photographs of its own crew, homes, equipment, and finished work.

### Full generation prompt

> Use case: photorealistic-natural. Create a single documentary editorial photograph for the fictional Steady Heating & Air website. Wide landscape 3:2 composition, warm late summer morning in a modest Columbus Ohio neighborhood. A well-kept pale cream clapboard craftsman home with brick foundation, mature trees, green lawn. In the right third, a residential HVAC technician wearing a plain olive work shirt, dark trousers and boots crouches beside a realistic closed residential outdoor air condenser unit on a level concrete pad, visually inspecting its exterior with a simple small clipboard resting on his knee. No open electrical panels, no exposed wiring, no tools connected to equipment, no dramatic PPE, no logos. Most of the frame is the beautiful tactile house siding and sun/shadow, condenser and technician visible on the right, garden planting at left, no sky needed. Understated premium architectural journal photography, natural muted olive, warm creams and charcoal, believable hands and physical proportions, subtle film grain, not glossy commercial stock. All people fictional. No text, watermarks, typography or graphics.

## Additional concept photographs

- `public/images/steady-crew.webp`: 1536 × 1024, 196,054 bytes. Generated with the built-in imagegen tool on October 4, 2026 from a direction for four fictional residential HVAC colleagues, relaxed and camera-facing beside a plain white service van in a leafy neighborhood driveway. Original: `C:/Users/alecs/.codex/generated_images/01a10686-c84b-7160-8b57-45d25367ec0c/exec-bba2e387-6e2d-4075-ad19-0378071dcf8e.png`.
- `public/images/steady-installation.webp`: 1536 × 1024, 281,632 bytes. Generated with the built-in imagegen tool on October 4, 2026 from a direction for a believable residential technician inspecting a closed outdoor heat-pump unit at a modest home, with natural light and documentary editorial styling. Original: `C:/Users/alecs/.codex/generated_images/01a10686-c84b-7160-8b57-45d25367ec0c/exec-96aba263-d4fd-43a2-b741-74262b7d1dcd.png`.

Both were visually inspected and converted to WebP with Sharp. Their people, van, property, equipment, and depicted work are fictional. Captions and alt text identify them as concept imagery, never as real staff or completed jobs. A real contractor should replace them with permission-cleared photography of its own team and work.

## Fonts

- Barlow Condensed: packaged through `@fontsource/barlow-condensed`, weights 600 and 700. SIL Open Font License 1.1; upstream [Barlow](https://github.com/jpt/barlow).
- DM Sans Variable: packaged through `@fontsource-variable/dm-sans`. SIL Open Font License 1.1; upstream [DM Sans](https://github.com/googlefonts/dm-fonts).
- License copies supplied with the installed packages remain in `node_modules` and are reproduced in `public/licenses/` for the exported website.
- Fonts are bundled locally by Next.js. No external font service is contacted during browsing or building.

## Original code-native graphics

The Steady wordmark treatment, arch/airflow mark, dial, route lines, schematic neighborhood graphic, article typographic artwork, and favicon were authored for this project in SVG/CSS. The neighborhood graphic is explicitly illustrative and not to scale; it is not a geographic navigation map or business listing.

## Editorial references

The article wording is original. The technical framing was checked against general homeowner guidance, with no copied passages or promised savings:

- [US Department of Energy: Heat Pump Systems](https://www.energy.gov/energysaver/heat-pump-systems)
- [US Department of Energy: Energy Renovations HVAC Guide](https://www.energy.gov/eere/buildings/articles/building-america-best-practices-series-vol-14-energy-renovations-hvac-guide)

Accessibility implementation targets the [W3C WCAG 2.2 recommendations](https://www.w3.org/TR/WCAG22/), including keyboard access, reflow, contrast, target sizing, and focus not being obscured by fixed controls. See `VERIFICATION.md` for test evidence and limits.
