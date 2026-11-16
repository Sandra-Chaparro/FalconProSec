import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';
import { file, glob } from 'astro/loaders';
import {
  CATEGORY_SLUGS,
  SECTIONS,
  SECTION_SLUGS,
  TOPIC_SLUGS,
} from './data/taxonomy';

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
        /**
         * investigation: original work (new evidence, analysis across sources,
         * testing). brief: a short analysis of a public case based on
         * published reporting, framing a question for future investigation.
         */
        format: z.enum(['investigation', 'brief']).default('investigation'),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        topic: z.enum(TOPIC_SLUGS),
        // Section categories (e.g. social-engineering) this investigation
        // also appears under in Security & Privacy / Technology.
        categories: z.array(z.enum(CATEGORY_SLUGS)).default([]),
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

/**
 * Findings: conclusions or recurring observations that emerge across
 * investigations. Each one links back to the investigations it rests on and
 * states how well supported it is.
 */
const findings = defineCollection({
  loader: glob({ pattern: MARKDOWN, base: './src/content/findings' }),
  schema: z.object({
    title: z.string(),
    /** The finding itself, in one or two plain sentences. */
    statement: z.string(),
    description: z.string(),
    /**
     * emerging: a pattern seen more than once, not yet well supported.
     * supported: consistent evidence across investigations.
     * contested: evidence points in different directions.
     * revised: an earlier version was changed by new evidence.
     */
    status: z.enum(['emerging', 'supported', 'contested', 'revised']),
    areas: z.array(z.enum(TOPIC_SLUGS)).min(1),
    investigations: z.array(reference('investigations')).min(1),
    openQuestions: z.array(z.string()).default([]),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    sources: z.array(source).default([]),
    corrections: z.array(correction).default([]),
  }),
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
    question: z.string().optional(),
    category: z.string(),
    /** What kind of instrument this is: why it was built, not what stack it uses. */
    kind: z.enum([
      'experiment',
      'simulator',
      'visualization',
      'educational tool',
      'detection concept',
      'research prototype',
      'analysis tool',
    ]),
    /** Area of inquiry the tool came out of. */
    area: z.enum(TOPIC_SLUGS),
    /** The investigation or finding that created a reason to build it, if any. */
    investigation: reference('investigations').optional(),
    finding: reference('findings').optional(),
    status: z.enum(['available', 'coming-soon']),
    icon: z.string().default('wrench'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { investigations, findings, articles, tools };
