/**
 * Single source of truth for site-wide settings.
 * Update values here rather than in individual pages.
 */
export const SITE = {
  name: 'FalconProSec',
  url: 'https://falconprosec.com',
  tagline: 'Understanding the risks behind technology.',
  description:
    'Independent investigations and explainers on cybersecurity, privacy, AI and the ways information can be exposed or misused.',
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
  { label: 'Security & Privacy', href: '/security-privacy' },
  { label: 'Technology', href: '/technology' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_LINKS: { heading: string; links: NavItem[] }[] = [
  {
    heading: 'Explore',
    links: [
      { label: 'Investigations', href: '/investigations' },
      { label: 'Tools', href: '/tools' },
      { label: 'Security & Privacy', href: '/security-privacy' },
      { label: 'Technology', href: '/technology' },
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
    { value: 'investigation', label: 'Suggest an investigation' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'collaboration', label: 'Collaboration' },
  ],
} as const;
