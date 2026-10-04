import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/repairs/", "/new-systems/", "/crew/", "/field-notes/", "/field-notes/repair-or-replace/", "/field-notes/ac-not-cooling/"];
for (const width of [320, 390, 768, 1440]) {
  test(`all pages render without overflow or missing images at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1")).toHaveCount(1);
      if (width > 850) await expect(page.locator('.desktop-nav a[aria-current="page"]')).toHaveCount(1);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      const bounds = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      expect(bounds.scroll, `${route} at ${width}px`).toBeLessThanOrEqual(bounds.width + 1);
      for (const image of await page.locator("img").all()) { await image.scrollIntoViewIfNeeded(); await expect(image).toHaveJSProperty("complete", true); }
      const brokenImages = await page.evaluate(() => Array.from(document.images).filter(img => img.naturalWidth === 0).map(img => img.src));
      expect(brokenImages).toEqual([]);
      await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
    }
    expect(errors).toEqual([]);
  });
}
for (const width of [390, 1440]) {
  for (const route of routes) {
    test(`WCAG 2.2 AA automated check: ${route} at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 960 });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
      expect(results.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
    });
  }
}
test("inquiry validation, replacement journey, handoff, reset, and no answer transmission", async ({ page }) => {
  await page.goto("/");
  await page.locator('.hero-paths a[href="#request"]').click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  const outbound: string[] = [];
  page.on("request", request => { if (request.method() !== "GET" || !request.url().startsWith("http://127.0.0.1:3000")) outbound.push(request.url()); });
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(dialog.getByText("Choose an option to continue.")).toBeVisible();
  await dialog.getByRole("radio", { name: "I’m considering a new system." }).check();
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(dialog.locator("#area")).toBeFocused();
  await dialog.getByLabel("Where is the home?").selectOption("Worthington");
  await dialog.getByLabel("What system do you have?").selectOption("Furnace & central AC");
  await dialog.getByLabel("What would you like to improve?").fill("SAMPLE: upstairs is warmer.");
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await dialog.getByLabel("When are you thinking?").selectOption("Planning for the coming season");
  await dialog.getByLabel("Preferred callback window").selectOption("Phone · weekday afternoon");
  await dialog.getByRole("button", { name: "Finish the preview" }).click();
  await expect(dialog.getByText("No request was submitted and no callback is scheduled.")).toBeVisible();
  await expect(dialog.getByText("SAMPLE: upstairs is warmer.")).toBeVisible();
  await dialog.getByRole("button", { name: "See a sample owner handoff" }).click();
  await expect(dialog.locator("#owner-summary")).toBeVisible();
  await expect(dialog.locator("#owner-summary")).not.toContainText("SAMPLE: upstairs is warmer.");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  await dialog.getByRole("button", { name: "Reset and try another path" }).click();
  await expect(dialog.getByRole("radio", { checked: true })).toHaveCount(0);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  expect(outbound).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('.hero-paths a[href="#request"]')).toBeFocused();
});
test("repair branch, direct links, privacy, browser back, and close clearing answers", async ({ page }) => {
  await page.goto("/new-systems/#request");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("radio", { name: "Something isn’t working right." }).check();
  await dialog.getByRole("link", { name: "Explore the repair call demo" }).click();
  await expect(dialog.getByRole("heading", { name: "A real person. One direct call." })).toBeVisible();
  await page.goBack();
  await expect(dialog.getByRole("heading", { name: "Start with your home." })).toBeVisible();
  await expect(dialog.getByRole("radio", { checked: true })).toHaveCount(0);
  await dialog.getByRole("radio", { name: "I want to look after my system." }).check();
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await dialog.getByLabel("Where is the home?").selectOption("Outside the example service area");
  await expect(dialog.getByText(/crew would confirm coverage/)).toBeVisible();
  await dialog.getByLabel("What system do you have?").selectOption("I’m not sure");
  await dialog.getByRole("button", { name: "Continue", exact: true }).click();
  await dialog.getByRole("button", { name: "Back", exact: false }).click();
  await expect(dialog.getByLabel("Where is the home?")).toHaveValue("Outside the example service area");
  await dialog.getByRole("button", { name: "Close dialog" }).click();
  await page.goto("/crew/#privacy");
  await expect(dialog.getByRole("heading", { name: "A concept, clearly." })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});
test("mobile menu keyboard escape, navigation, dialog focus containment, reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu" });
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "New systems" }).click();
  await expect(page).toHaveURL(/new-systems/);
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toHaveCount(0);
  await page.locator('.mobile-actions a[href="#request"]').click();
  await expect(page.getByRole("dialog")).toBeVisible();
  for (let i = 0; i < 18; i++) { await page.keyboard.press("Tab"); expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true); }
  await expect(page.getByRole("dialog")).toBeVisible();
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  expect(results.violations).toEqual([]);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});
test("internal links and anchors have destinations; privacy and noindex defaults", async ({ page, request }) => {
  const hrefs = new Set<string>();
  for (const route of routes) { await page.goto(route); for (const href of await page.locator('a[href^="/"]').evaluateAll(links => links.map(a => a.getAttribute("href")!))) hrefs.add(href); }
  for (const href of hrefs) { const response = await request.get(href.split("#")[0]); expect(response.status(), href).toBe(200); }
  expect((await request.get("/robots.txt")).status()).toBe(200);
  expect(await (await request.get("/robots.txt")).text()).toContain("Disallow: /");
  await page.goto("/missing-page/");
  await expect(page.getByRole("heading", { name: "Let’s get you back on course." })).toBeVisible();
});

test("every call and assessment CTA opens the intended experience", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of routes) {
    await page.goto(route);
    const actions = page.locator('a[href="#call"]:visible, a[href="#request"]:visible');
    for (let i = 0; i < await actions.count(); i++) {
      const action = actions.nth(i);
      const href = await action.getAttribute("href");
      await action.click();
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.locator("#experience-title")).toContainText(href === "#call" ? "A real person." : "Start with your home.");
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
    }
  }
});

test("user text-spacing overrides preserve reflow at narrow and desktop widths", async ({ page }) => {
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.addStyleTag({ content: "* { letter-spacing: .12em !important; word-spacing: .16em !important; line-height: 1.5 !important; } p { margin-bottom: 2em !important; }" });
      const bounds = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      expect(bounds.scroll, `${route} with text spacing at ${width}px`).toBeLessThanOrEqual(bounds.width + 1);
    }
  }
});

test("mobile keyboard focus stays clear of the fixed action bar", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (let i = 0; i < 42; i++) {
    await page.keyboard.press("Tab");
    const focus = await page.evaluate(() => {
      const element = document.activeElement;
      if (!(element instanceof HTMLElement) || element === document.body || element.closest(".mobile-actions")) return null;
      const rect = element.getBoundingClientRect();
      return { tag: element.tagName, text: element.textContent?.slice(0, 60), top: rect.top, bottom: rect.bottom, screen: innerHeight };
    });
    if (focus) { expect(focus.bottom, JSON.stringify(focus)).toBeGreaterThan(0); expect(focus.top, JSON.stringify(focus)).toBeLessThan(focus.screen - 59); }
  }
});

test("reading text and hero actions remain usable at laptop, large monitor, and phone sizes", async ({ page }) => {
  for (const [width, height] of [[320, 568], [390, 844], [1365, 620], [1920, 920]]) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const measurements = await page.evaluate(() => {
      const size = (selector: string) => parseFloat(getComputedStyle(document.querySelector(selector)!).fontSize);
      const cta = document.querySelector(".hero-paths .button")!.getBoundingClientRect();
      return { body: size("body"), card: size(".service-path p"), nav: size(innerWidth > 850 ? ".desktop-nav a" : ".mobile-actions a"), meta: size(".hero-footnote"), ctaBottom: cta.bottom, viewport: innerHeight, scroll: document.documentElement.scrollWidth };
    });
    expect(measurements.body).toBeGreaterThanOrEqual(17);
    expect(measurements.card).toBeGreaterThanOrEqual(17);
    expect(measurements.nav).toBeGreaterThanOrEqual(14);
    expect(measurements.meta).toBeGreaterThanOrEqual(12);
    expect(measurements.ctaBottom, `${width}px hero CTA`).toBeLessThanOrEqual(measurements.viewport);
    expect(measurements.scroll).toBeLessThanOrEqual(width + 1);
  }
});

test("agency contact panel slides in, has a working mail link, and can be dismissed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("complementary", { name: "Customize this website" })).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, 1000));
  const panel = page.getByRole("complementary", { name: "Customize this website" });
  await expect(panel).toBeVisible();
  await expect(panel).toContainText("Like the design?");
  await expect(panel).toContainText("stand apart from your competitors");
  await expect(panel.getByRole("link", { name: "Contact now!" })).toHaveAttribute("href", /^mailto:alec@adrocitystudios\.com\?subject=/);
  const bar = await page.locator(".mobile-actions").boundingBox();
  const box = await panel.boundingBox();
  expect(box!.y + box!.height).toBeLessThanOrEqual(bar!.y);
  await panel.getByRole("button", { name: "Dismiss design inquiry" }).click();
  await expect(panel).toHaveCount(0);
  await page.getByRole("button", { name: "Menu" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "The crew & area" }).click();
  await expect(page).toHaveURL(/crew/);
  await expect(panel).toHaveCount(0);
});
