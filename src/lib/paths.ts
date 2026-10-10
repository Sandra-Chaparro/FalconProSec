import { SECTIONS, type SectionSlug } from '../data/taxonomy';
import { articleSlug, getArticles } from './content';

/** Static paths for /<section>/<article-slug>. */
export async function articlePaths(section: SectionSlug) {
  const all = await getArticles(section);
  return all.map((entry) => ({
    params: { slug: articleSlug(entry) },
    props: {
      entry,
      related: all
        .filter(
          (a) => a.id !== entry.id && a.data.category === entry.data.category
        )
        .slice(0, 3),
    },
  }));
}

/** Static paths for /<section>/category/<category>. */
export function categoryPaths(section: SectionSlug) {
  return SECTIONS[section].categories.map((category) => ({
    params: { category: category.slug },
    props: { category },
  }));
}
