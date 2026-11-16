/**
 * Single source of truth for site-wide settings.
 * Update values here rather than in individual pages.
 */
export const SITE = {
  name: 'FalconProSec',
  url: 'https://falconprosec.com',
  tagline: 'Technology, security & human impact.',
  description:
    'An independent research space investigating how technology and AI affect human trust, safety, identity and opportunity, and how they can be used to protect people.',
  locale: 'en',
  ogImage: '/og-default.jpg',
  ogImageAlt: 'FalconProSec logo: a stylised falcon inside a shield outline',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Investigations', href: '/investigations' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS: { heading: string; links: NavItem[] }[] = [
  {
    heading: 'Explore',
    links: [
      { label: 'Investigations', href: '/investigations' },
      { label: 'Tools', href: '/tools' },
    ],
  },
  {
    heading: 'Site',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Suggest a correction', href: '/contact?reason=correction' },
      { label: 'RSS feed', href: '/rss.xml' },
    ],
  },
];

export const CONTACT = {
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',
  reasons: [
    { value: 'general', label: 'General question' },
    { value: 'correction', label: 'Correction' },
    { value: 'investigation', label: 'Suggest a question to investigate' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'collaboration', label: 'Collaboration' },
  ],
} as const;
