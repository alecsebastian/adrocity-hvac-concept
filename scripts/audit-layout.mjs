import { chromium } from "playwright";
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined });
const page = await browser.newPage();
for (const width of [320, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of ["/", "/repairs/", "/new-systems/", "/crew/", "/field-notes/", "/field-notes/repair-or-replace/", "/field-notes/ac-not-cooling/"]) {
    await page.goto(`http://127.0.0.1:3000${route}`);
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "* { letter-spacing: .12em !important; word-spacing: .16em !important; line-height: 1.5 !important; } p { margin-bottom: 2em !important; }" });
    const offenders = await page.evaluate(() => Array.from(document.querySelectorAll("body *")).filter(el => { const r = el.getBoundingClientRect(); return r.width && r.right > innerWidth + 1 && !el.closest("svg, .area-graphic, .journal-index-art"); }).map(el => ({ tag: el.tagName, class: el.className, width: Math.round(el.getBoundingClientRect().width), right: Math.round(el.getBoundingClientRect().right) })).slice(0, 20));
    if (offenders.length) console.log(JSON.stringify({ width, route, offenders }));
  }
}
await browser.close();
