import { expect, type Locator, type Page, test } from "@playwright/test";

const PAGES: { path: string; heading: RegExp }[] = [
  { path: "/home", heading: /Hi, I'm/ },
  { path: "/about", heading: /About Me/ },
  { path: "/projects", heading: /Projects/ },
  { path: "/experience", heading: /Experience/ },
  { path: "/skills", heading: /Skills & Technologies/ },
  { path: "/certificates", heading: /Achievements & Certifications/ },
  { path: "/contact", heading: /Contact Me/ },
];

/** "Showing 12 of 25" -> 12 */
async function shownCount(page: Page): Promise<number> {
  const text: string = await page.getByText(/^Showing \d+ of \d+$/).innerText();
  return Number(text.match(/Showing (\d+)/)![1]);
}

/** every card in the results grid is fully visible (guards the "cards stay invisible after clearing" bug) */
async function expectAllCardsVisible(grid: Locator, expected: number): Promise<void> {
  await expect(grid.locator(":scope > div")).toHaveCount(expected);
  await expect.poll(async () => grid.locator(":scope > div").evaluateAll(cards =>
    cards.filter(card => Number(getComputedStyle(card).opacity) < 0.98).length)).toBe(0);
}

async function openFilter(page: Page, name: RegExp): Promise<Locator> {
  await page.getByRole("button", { name }).click();
  return page.getByRole("listbox");
}

async function search(page: Page, text: string): Promise<void> {
  await page.getByRole("searchbox").fill(text);
}

test.describe("pages", () => {
  for (const { path, heading } of PAGES) {
    test(`${path} renders without errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1, name: heading }).first()).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test("unknown URLs go to the home page", async ({ page }) => {
    await page.goto("/does-not-exist");
    await expect(page).toHaveURL(/\/home$/);
  });

  test("each page has its own browser-tab title", async ({ page }) => {
    await page.goto("/skills");
    await expect(page).toHaveTitle("Skills & Technologies | Karthi");
  });
});

test.describe("theme", () => {
  test("toggle cycles System -> Light -> Dark and remembers the choice", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/home");
    const html = page.locator("html");
    await expect(html).toHaveClass(/dark/);

    const toggle = page.getByRole("button", { name: /theme/i });
    await toggle.click();
    await expect(html).toHaveClass(/light/);
    await page.reload();
    await expect(html).toHaveClass(/light/);

    await page.getByRole("button", { name: /theme/i }).click();
    await expect(html).toHaveClass(/dark/);
    await page.getByRole("button", { name: /theme/i }).click(); // back to System
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBeNull();
  });
});

test.describe("skills & certificates filters", () => {
  test("skills: category filter, search, and clearing brings every card back", async ({ page }) => {
    await page.goto("/skills");
    const grid = page.locator("main .grid").first();
    const total: number = await shownCount(page);
    await expectAllCardsVisible(grid, total);

    await search(page, "java");
    await expect.poll(() => shownCount(page)).toBeLessThan(total);
    await search(page, "");
    await expectAllCardsVisible(grid, total);

    const list = await openFilter(page, /Category/);
    await list.getByRole("option").first().click();
    await list.getByRole("option").nth(1).click();
    const filtered: number = await shownCount(page);
    expect(filtered).toBeLessThan(total);
    await page.keyboard.press("Escape"); // close the dropdown (it covers "Clear all" on small screens)
    await expect(list).toBeHidden();
    await page.getByRole("button", { name: "Clear all" }).click();
    await expectAllCardsVisible(grid, total);
  });

  test("certificates: picking two platforms shows both", async ({ page }) => {
    await page.goto("/certificates");
    const list = await openFilter(page, /Platform/);
    const counts: number[] = [];
    for (const index of [0, 1]) {
      const option = list.getByRole("option").nth(index);
      counts.push(Number(await option.locator("span").last().innerText()));
      await option.click();
    }
    await expect.poll(() => shownCount(page)).toBe(counts[0] + counts[1]);
  });

  test("no results shows a message and a way back", async ({ page }) => {
    await page.goto("/certificates");
    await search(page, "zzz-no-such-certificate");
    await expect(page.getByText("No certificates match your filters.")).toBeVisible();
    await page.getByRole("button", { name: "Clear filters" }).click();
    await expect.poll(() => shownCount(page)).toBeGreaterThan(0);
  });
});

test.describe("projects", () => {
  test("filter by category and technology, and search", async ({ page }) => {
    await page.goto("/projects");
    const total: number = await shownCount(page);
    const list = await openFilter(page, /^Filter/);
    await expect(list.getByRole("presentation")).toHaveText(["Category", "Technology"]);

    await list.getByRole("option", { name: /Backend/ }).click();
    const backend: number = await shownCount(page);
    expect(backend).toBeGreaterThan(0);
    expect(backend).toBeLessThan(total);

    await page.keyboard.press("Escape");
    await expect(list).toBeHidden();
    await page.getByRole("button", { name: "Clear all" }).click();
    await search(page, "razorpay");
    await expect.poll(() => shownCount(page)).toBe(1);
  });

  test("clicking a card opens details; Back closes it and stays on Projects", async ({ page }) => {
    await page.goto("/projects");
    await page.locator("main article").first().locator("p").click();
    const dialog = page.locator("dialog.project-modal");
    await expect(dialog).toBeVisible();
    await expect(page).toHaveURL(/\?project=/);

    await page.goBack();
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("shared project link opens that project; next/previous and Esc work", async ({ page }) => {
    await page.goto("/projects?project=expense-tracker");
    const dialog = page.locator("dialog.project-modal");
    await expect(dialog.getByRole("heading", { level: 2 })).toHaveText("Expense Tracker");
    await expect(page).toHaveTitle(/Expense Tracker/);

    const counter = dialog.getByText(/^Project \d+ \/ \d+$/);
    const before: string = await counter.innerText();
    await dialog.getByRole("button", { name: "Next", exact: false }).last().click();
    await expect(counter).not.toHaveText(before);

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("full-screen viewer: first Esc closes only the viewer", async ({ page }) => {
    await page.goto("/projects?project=expense-tracker");
    const dialog = page.locator("dialog.project-modal");
    await dialog.getByRole("button", { name: "View full screen" }).click();
    const viewer = page.locator("dialog.lightbox");
    await expect(viewer).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(viewer).toBeHidden();
    await expect(dialog).toBeVisible();
  });

  test("featured projects on Home open in the Projects page", async ({ page }) => {
    await page.goto("/home");
    const featured = page.getByRole("heading", { name: /Featured Projects/ }).locator("xpath=ancestor::section[1]");
    await expect(featured.locator("article")).toHaveCount(3);
    await featured.locator("article").first().getByRole("button", { name: /View details/ }).click();
    await expect(page).toHaveURL(/\/projects\?project=/);
    await expect(page.locator("dialog.project-modal")).toBeVisible();
  });
});

test.describe("contact form", () => {
  async function fill(page: Page): Promise<void> {
    await page.getByPlaceholder("Full Name").fill("Test Person");
    await page.getByPlaceholder("Email Address").fill("test@example.com");
    await page.getByPlaceholder("Subject").fill("Hello");
    await page.getByPlaceholder("Your message").fill("Just testing");
  }

  test("sends once, disables the button while sending, shows success", async ({ page }) => {
    let requests = 0;
    // never contact the real EmailJS service from tests
    await page.route("**/api.emailjs.com/**", async route => {
      requests += 1;
      await new Promise(resolve => setTimeout(resolve, 800));
      await route.fulfill({ status: 200, body: "OK" });
    });
    await page.goto("/contact");
    await fill(page);
    const send = page.getByRole("button", { name: /Send Message|Sending/ });
    await send.click();
    await expect(send).toBeDisabled();
    await send.click({ force: true }); // a second click while sending must be ignored
    await expect(page.getByText("Message sent successfully!")).toBeVisible();
    expect(requests).toBe(1);
  });

  test("spam bots that fill the hidden field are ignored", async ({ page }) => {
    let requests = 0;
    await page.route("**/api.emailjs.com/**", route => { requests += 1; return route.abort(); });
    await page.goto("/contact");
    await fill(page);
    await page.locator('input[name="website"]').evaluate((input: HTMLInputElement) => { input.value = "http://spam.example"; });
    await page.getByRole("button", { name: /Send Message/ }).click();
    await expect(page.getByText("Message sent successfully!")).toBeVisible();
    expect(requests).toBe(0);
  });
});

test.describe("navigation", () => {
  test("mobile menu opens, navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "the menu button only exists on small screens");
    await page.goto("/home");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByRole("button", { name: "Close menu" })).toBeHidden();
  });

  test("a page whose code fails to download shows a reload screen instead of a blank page", async ({ page }) => {
    await page.goto("/home");
    await page.route(/\/assets\/Skills-[^/]+\.js$/, route => route.abort());
    await page.evaluate(() => window.history.pushState({}, "", "/skills"));
    await page.evaluate(() => window.dispatchEvent(new PopStateEvent("popstate")));
    // the site reloads once to fetch the latest version; when that also fails, the reload screen appears
    await expect(page.getByRole("alert")).toContainText("This page couldn't load", { timeout: 15_000 });
    await expect(page.getByRole("button", { name: "Reload page" })).toBeVisible();
  });
});
