import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '../config/site';
import {
  articleUrl,
  getArticles,
  getInvestigations,
  investigationUrl,
} from '../lib/content';

export const GET: APIRoute = async (context) => {
  const [investigations, articles] = await Promise.all([
    getInvestigations(),
    getArticles(),
  ]);

  const items = [
    ...investigations.map((i) => ({
      title: i.data.title,
      description: i.data.description,
      pubDate: i.data.pubDate,
      link: investigationUrl(i),
      categories: ['Investigation', i.data.topic, ...i.data.tags],
    })),
    ...articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: articleUrl(a),
      categories: [a.data.section, a.data.category, ...a.data.tags],
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items,
  });
};
