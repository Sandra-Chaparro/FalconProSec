import { getCollection, type CollectionEntry } from 'astro:content';
import type { SectionSlug } from '../data/taxonomy';

export type Investigation = CollectionEntry<'investigations'>;
export type Article = CollectionEntry<'articles'>;
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
