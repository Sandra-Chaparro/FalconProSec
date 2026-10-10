import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';
import { SECTIONS, SECTION_SLUGS, TOPIC_SLUGS } from './data/taxonomy';

// Files starting with "_" (e.g. _TEMPLATE.md) are ignored.
const MARKDOWN = '**/[^_]*.{md,mdx}';

const source = z.object({
  title: z.string(),
  url: z.url().optional(),
  publisher: z.string().optional(),
  accessed: z.coerce.date().optional(),
});

const correction = z.object({
  date: z.coerce.date(),
  note: z.string(),
});

const heroAltRequired = (d: { heroImage?: unknown; heroAlt?: string }) =>
  !d.heroImage || !!d.heroAlt;
const heroAltMessage = {
  message: 'heroAlt is required when heroImage is set (describe the image).',
  path: ['heroAlt'],
};

const investigations = defineCollection({
  loader: glob({ pattern: MARKDOWN, base: './src/content/investigations' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        question: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        topic: z.enum(TOPIC_SLUGS),
        tags: z.array(z.string()).default([]),
        heroImage: image().optional(),
        heroAlt: z.string().optional(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        sources: z.array(source).default([]),
        corrections: z.array(correction).default([]),
      })
      .refine(heroAltRequired, heroAltMessage),
});

const articles = defineCollection({
  loader: glob({ pattern: MARKDOWN, base: './src/content/articles' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        description: z.string(),
        question: z.string().optional(),
        section: z.enum(SECTION_SLUGS),
        category: z.string(),
        topics: z.array(z.enum(TOPIC_SLUGS)).default([]),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).default([]),
        heroImage: image().optional(),
        heroAlt: z.string().optional(),
        draft: z.boolean().default(false),
        sources: z.array(source).default([]),
        corrections: z.array(correction).default([]),
      })
      .refine(heroAltRequired, heroAltMessage)
      .refine(
        (d) =>
          SECTIONS[d.section].categories.some((c) => c.slug === d.category),
        {
          message:
            'category must be one of the categories defined for this section in src/data/taxonomy.ts',
          path: ['category'],
        }
      ),
});

const tools = defineCollection({
  loader: file('./src/content/tools.json'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.string(),
    status: z.enum(['available', 'coming-soon']),
    icon: z.string().default('wrench'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { investigations, articles, tools };
