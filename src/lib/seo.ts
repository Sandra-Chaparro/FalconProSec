import { SITE } from '../config/site';

const publisher = {
  '@type': 'Organization',
  name: SITE.name,
  url: SITE.url,
  logo: {
    '@type': 'ImageObject',
    url: new URL('/icon-192.png', SITE.url).href,
  },
};

export function siteJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url,
      description: SITE.description,
      inLanguage: 'en',
    },
    { '@context': 'https://schema.org', ...publisher },
  ];
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  url: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.pubDate.toISOString(),
    dateModified: (input.updatedDate ?? input.pubDate).toISOString(),
    mainEntityOfPage: input.url,
    image: new URL(input.image ?? SITE.ogImage, SITE.url).href,
    keywords: input.keywords?.join(', '),
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher,
  };
}
