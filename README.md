# FalconProSec

**Understanding the risks behind technology.**

FalconProSec is an independent investigation and awareness site covering
cybersecurity, privacy, technology, artificial intelligence, OSINT, social
engineering and data exposure.

Live site: https://falconprosec.com

Built with [Astro](https://astro.build) 6 and Tailwind CSS 4. It is a fully
static site: no accounts, no database, no tracking.

---

## Getting started

```bash
npm install
cp .env.example .env   # then add your Web3Forms key (see below)
npm run dev            # http://localhost:4321
```

| Command              | What it does                               |
| -------------------- | ------------------------------------------ |
| `npm run dev`        | Local dev server (drafts are visible here) |
| `npm run build`      | Production build to `dist/`                |
| `npm run preview`    | Preview the production build               |
| `npm run lint`       | ESLint                                     |
| `npm run format`     | Prettier                                   |
| `npm run type-check` | TypeScript                                 |
| `npm test`           | Playwright end-to-end tests                |

## Project structure

```
src/
  config/site.ts          Site name, URL, navigation, footer links, contact settings
  data/taxonomy.ts        Topics, section categories, open questions
  content.config.ts       Content collection schemas
  content/
    investigations/       Investigations (Markdown)
    articles/
      security-privacy/   Security & Privacy articles
      technology/         Technology articles
    tools.json            Tool list (status: available | coming-soon)
  components/             Reusable UI (cards, metadata, disclaimer, header, footer…)
    tools/                Interactive tool components + registry
  layouts/                Base, investigation, article and tool layouts
  lib/                    Content helpers, SEO helpers
  pages/                  Routes
```

## Adding content

### A new investigation

1. Copy `src/content/investigations/_TEMPLATE.md` to a new file. The file name
   becomes the URL, e.g. `what-a-public-email-reveals.md` →
   `/investigations/what-a-public-email-reveals`.
2. Fill in the frontmatter: `title`, `description`, `question`, `pubDate`,
   `topic`, `tags`, `sources`.
3. Write the body under the standard headings: Background → Evidence &
   research → Findings → What the findings mean → Security & privacy
   implications.
4. Keep `draft: true` while writing (visible only in `npm run dev`). Set it to
   `false` to publish. Set `featured: true` to feature it on the home page.
5. To record a correction, add an entry to `corrections` with a date and note.

Images: put them next to the Markdown file and reference them with
`heroImage: ./my-image.jpg` plus a descriptive `heroAlt`.

### A new Security & Privacy or Technology article

Copy `src/content/articles/_TEMPLATE.md` into
`src/content/articles/security-privacy/` or `src/content/articles/technology/`.
The `category` must be one of the categories listed for that section in
`src/data/taxonomy.ts`. Add `topics` to also list it on `/topics/<topic>`.

### Launching a tool

1. Build the tool as `src/components/tools/<Name>.astro`.
2. Register it in `src/components/tools/index.ts` under the tool's `id`.
3. Change its `status` to `"available"` in `src/content/tools.json`.

Tools marked `coming-soon` show a clear “Coming soon” badge, their pages are
`noindex`, and they are excluded from the sitemap.

## Contact form (Web3Forms)

The contact form delivers messages to your email inbox through
[Web3Forms](https://web3forms.com). Your address never appears in the code.

1. Go to https://web3forms.com and create an access key using the email
   address that should receive messages.
2. Add the key to `.env` as `PUBLIC_WEB3FORMS_KEY=...`.
3. Add the same variable in your hosting provider's environment settings
   (e.g. Vercel → Project → Settings → Environment Variables) and redeploy.

Until a key is set, the form shows a clear “not connected yet” notice and is
disabled. The access key is designed to be public.

## SEO

- Site URL is set in `astro.config.mjs` (`site`) and `src/config/site.ts`.
- Each page sets its own title and description via the `Layout` props.
- Canonical URLs, Open Graph/Twitter tags and JSON-LD (WebSite, Organization,
  Article, BreadcrumbList) are generated automatically.
- `sitemap-index.xml`, `robots.txt` and `rss.xml` are generated at build time.

## Licence

MIT. See [LICENSE](LICENSE). Originally based on an open-source Astro blog
template.
