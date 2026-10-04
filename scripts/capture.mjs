import { chromium } from "playwright";
import fs from "node:fs";
fs.mkdirSync("artifacts", { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined });
const page = await browser.newPage();
for (const [name, width, route, height] of [
  ["home-desktop", 1440, "/"], ["home-mobile", 390, "/"],
  ["laptop-home", 1365, "/", 620], ["large-home", 1920, "/", 920],
  ["repairs-desktop", 1440, "/repairs/"], ["systems-desktop", 1440, "/new-systems/"],
  ["crew-desktop", 1440, "/crew/"], ["journal-desktop", 1440, "/field-notes/"],
  ["article-mobile", 390, "/field-notes/repair-or-replace/"],
  ["home-narrow", 320, "/"], ["repairs-mobile", 390, "/repairs/"],
  ["systems-mobile", 390, "/new-systems/"], ["crew-mobile", 390, "/crew/"],
  ["journal-mobile", 390, "/field-notes/"], ["article-desktop", 1440, "/field-notes/repair-or-replace/"],
]) {
  await page.setViewportSize({ width, height: height || (width < 600 ? 844 : 1000) });
  await page.goto(`http://127.0.0.1:3000${route}`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `artifacts/${name}.png`, fullPage: true });
  await page.screenshot({ path: `artifacts/${name}-viewport.png` });
}
await page.setViewportSize({ width: 1365, height: 768 });
await page.goto("http://127.0.0.1:3000/");
await page.locator(".crew-teaser").scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await page.screenshot({ path: "artifacts/crew-teaser-viewport.png" });
await page.evaluate(() => window.scrollBy(0, 1100));
await page.getByRole("complementary", { name: "Customize this website" }).waitFor();
await page.screenshot({ path: "artifacts/contact-nudge-viewport.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:3000/#request");
await page.getByRole("dialog").waitFor();
await page.screenshot({ path: "artifacts/inquiry-mobile.png" });
await browser.close();
console.log("Saved visual review screenshots in artifacts/.");
