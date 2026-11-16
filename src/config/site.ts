/**
 * Single source of truth for site-wide settings.
 * Update values here rather than in individual pages.
 */
export const SITE = {
  name: 'FalconProSec',
  url: 'https://falconprosec.com',
  tagline: 'Investigating technology and its human impact.',
  description:
    'An independent research initiative investigating problems at the intersection of technology, cybersecurity, AI and human behavior: what puts people at risk, why, and what can reduce it.',
  locale: 'en',
  ogImage: '/og-default.jpg',
  ogImageAlt: 'FalconProSec logo: a stylised falcon inside a shield outline',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

// The logo links home, so there is no separate Home item.
export const NAV_ITEMS: NavItem[] = [
  { label: 'Research', href: '/research' },
  { label: 'Investigations', href: '/investigations' },
  { label: 'Findings', href: '/findings' },
  { label: 'Tools', href: '/tools' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS: { heading: string; links: NavItem[] }[] = [
  {
    heading: 'Research',
    links: [
      { label: 'Areas & questions', href: '/research' },
      { label: 'Investigations', href: '/investigations' },
      { label: 'Findings', href: '/findings' },
      { label: 'Methods', href: '/methods' },
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
