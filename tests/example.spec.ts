import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("homepage renders the hero and primary nav", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toHaveAttribute(
      "aria-label",
      "Arpit Sarang",
    );
    await expect(
      page.getByRole("navigation", { name: "Primary" }),
    ).toBeVisible();
  });

  test("navigates between pages", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Projects" })
      .click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(
      page.getByRole("heading", { name: "Selected Projects" }),
    ).toBeVisible();
  });

  test("project filter syncs with the URL", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("tab", { name: "AI" }).click();
    await expect(page).toHaveURL(/category=AI/);
    await page.goto("/projects?q=rust");
    await expect(page.getByRole("searchbox")).toHaveValue("rust");
  });

  test("unknown routes show the branded 404", async ({ page }) => {
    await page.goto("/this-does-not-exist");
    await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  });
});

test.describe("Mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("opens, traps focus and closes with Escape", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.getByRole("dialog", { name: "Navigation menu" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: /About/ })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
  });
});

test.describe("Command palette", () => {
  test("opens with the keyboard and navigates", async ({ page }) => {
    await page.goto("/");
    // Wait for hydration before firing the shortcut
    await expect(
      page.getByRole("button", { name: /command palette/i }),
    ).toBeVisible();
    await page.keyboard.press("ControlOrMeta+k");
    const dialog = page.getByRole("dialog", { name: "Command palette" });
    await expect(dialog).toBeVisible();
    await page.keyboard.type("contact");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/contact$/);
  });
});

test.describe("Contact form", () => {
  test("validates inline and submits (mocked)", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByRole("alert").first()).toBeVisible();

    await page.getByRole("textbox", { name: "Name" }).fill("Ada Lovelace");
    await page.getByRole("textbox", { name: "Email" }).fill("ada@example.com");
    await page
      .getByRole("textbox", { name: "Message" })
      .fill("I would love to collaborate on an analytical engine.");
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(
      page.getByRole("status").filter({ hasText: "Message Sent" }),
    ).toBeVisible({ timeout: 10_000 });
  });
});
