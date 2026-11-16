import { getCollection, type CollectionEntry } from 'astro:content';
import { sectionCategorySlugs, type SectionSlug } from '../data/taxonomy';

export type Investigation = CollectionEntry<'investigations'>;
export type Article = CollectionEntry<'articles'>;
export type Finding = CollectionEntry<'findings'>;
export type Tool = CollectionEntry<'tools'>;

/** Drafts are visible while running `npm run dev`, never in a production build. */
const showDrafts = import.meta.env.DEV;

const byNewest = (
  a: { data: { pubDate: Date } },
  b: { data: { pubDate: Date } }
) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

export async function getInvestigations(): Promise<Investigation[]> {
  const entries = await getCollection(
    'investigations',
    ({ data }) => showDrafts || !data.draft
  );
  return entries.sort(byNewest);
}

export async function getFindings(): Promise<Finding[]> {
  const entries = await getCollection(
    'findings',
    ({ data }) => showDrafts || !data.draft
  );
  return entries.sort(byNewest);
}

export function findingUrl(item: Finding): string {
  return `/findings/${item.id}`;
}

/** Findings that draw on a given investigation. */
export async function findingsForInvestigation(id: string): Promise<Finding[]> {
  return (await getFindings()).filter((f) =>
    f.data.investigations.some((ref) => ref.id === id)
  );
}

/** Tools that an investigation created a reason to build. */
export async function toolsForInvestigation(id: string): Promise<Tool[]> {
  return (await getTools()).filter((t) => t.data.investigation?.id === id);
}

/** Investigations tagged with any category from this section. */
export async function getSectionInvestigations(
  section: SectionSlug
): Promise<Investigation[]> {
  const slugs = sectionCategorySlugs(section);
  return (await getInvestigations()).filter((i) =>
    i.data.categories.some((c) => slugs.includes(c))
  );
}

export async function getArticles(section?: SectionSlug): Promise<Article[]> {
  const entries = await getCollection(
    'articles',
    ({ data }) =>
      (showDrafts || !data.draft) && (!section || data.section === section)
  );
  return entries.sort(byNewest);
}

export async function getTools(): Promise<Tool[]> {
  const tools = await getCollection('tools');
  // Available tools first, then keep file order.
  return tools.sort(
    (a, b) =>
      Number(b.data.status === 'available') -
      Number(a.data.status === 'available')
  );
}

/** Featured investigation, falling back to the newest one. */
export function pickFeatured(
  items: Investigation[]
): Investigation | undefined {
  return items.find((i) => i.data.featured) ?? items[0];
}

/** Strip the folder prefix from article ids so URLs stay flat. */
export function articleSlug(article: Article): string {
  return article.id.split('/').pop() ?? article.id;
}

export function articleUrl(article: Article): string {
  return `/${article.data.section}/${articleSlug(article)}`;
}

/** "Brief" or "Investigation", for labels. */
export function formatLabel(item: Investigation): 'Brief' | 'Investigation' {
  return item.data.format === 'brief' ? 'Brief' : 'Investigation';
}

export function investigationUrl(item: Investigation): string {
  return `/investigations/${item.id}`;
}

export function readingTime(body: string | undefined): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 225));
  return `${minutes} min read`;
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
