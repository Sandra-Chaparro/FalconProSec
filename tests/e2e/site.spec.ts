import { test, expect } from '@playwright/test';

const NAV = [
  'Home',
  'Investigations',
  'Tools',
  'Security & Privacy',
  'Technology',
  'About',
  'Contact',
];

const ROUTES = [
  '/',
  '/investigations',
  '/tools',
  '/security-privacy',
  '/technology',
  '/about',
  '/contact',
];

test.describe('FalconProSec site', () => {
  for (const route of ROUTES) {
    test(`${route} loads with a single h1 and canonical URL`, async ({
      page,
    }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      // Scoped to <main>: the Astro dev toolbar adds its own headings in dev.
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        /^https:\/\/falconprosec\.com/
      );
    });
  }

  test('primary navigation has the expected items and no Blog link', async ({
    page,
  }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link')).toHaveText(NAV);
    await expect(nav.getByRole('link', { name: 'Blog' })).toHaveCount(0);
  });

  test('home page shows both calls to action and the disclaimer', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(
      page.getByRole('link', { name: 'Explore Investigations' }).first()
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Explore Tools' })
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'A note on accuracy' })
    ).toBeVisible();
  });

  test('tools that are not built yet are marked as coming soon', async ({
    page,
  }) => {
    await page.goto('/tools');
    await expect(page.getByText('Coming soon').first()).toBeVisible();
  });

  test('contact form fields are labelled and reason is preselectable', async ({
    page,
  }) => {
    await page.goto('/contact?reason=correction');
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
    await expect(page.getByLabel('Reason for contacting')).toHaveValue(
      'correction'
    );
  });

  test('robots.txt points to the sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.ok()).toBeTruthy();
    expect(await res.text()).toContain('sitemap-index.xml');
  });

  test('removed template pages are gone', async ({ page }) => {
    const res = await page.goto('/login');
    expect(res?.status()).toBe(404);
  });
});
