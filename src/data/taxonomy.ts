/**
 * Topics and categories used across the site.
 * Content frontmatter is validated against these slugs in src/content.config.ts.
 */
import type { IconName } from '../components/icons';

export interface Term {
  slug: string;
  label: string;
  description: string;
  icon: IconName;
}

export const TOPICS = [
  {
    slug: 'cybersecurity',
    label: 'Cybersecurity',
    description:
      'How systems are attacked and defended, explained without the jargon.',
    icon: 'shield',
  },
  {
    slug: 'privacy',
    label: 'Privacy',
    description:
      'What happens to personal information, who collects it, and why it matters.',
    icon: 'eye',
  },
  {
    slug: 'osint',
    label: 'OSINT',
    description:
      'What can be learned from open, publicly available sources, and its limits.',
    icon: 'search',
  },
  {
    slug: 'social-engineering',
    label: 'Social Engineering',
    description:
      'How people, rather than systems, are manipulated into giving access.',
    icon: 'users',
  },
  {
    slug: 'ai-security',
    label: 'AI & Security',
    description:
      'How artificial intelligence changes both the risks and the defences.',
    icon: 'spark',
  },
  {
    slug: 'data-exposure',
    label: 'Data Exposure',
    description:
      'How information leaks, gets breached, or is published without intent.',
    icon: 'layers',
  },
] as const satisfies readonly Term[];

export const SECTIONS = {
  'security-privacy': {
    slug: 'security-privacy',
    label: 'Security & Privacy',
    intro:
      'Practical explanations of everyday security and privacy questions: what the risk actually is, how it works, and what you can reasonably do about it.',
    categories: [
      {
        slug: 'personal-privacy',
        label: 'Personal Privacy',
        description: 'Controlling what others can learn about you.',
        icon: 'eye',
      },
      {
        slug: 'data-protection',
        label: 'Data Protection',
        description: 'Keeping information safe where it is stored and shared.',
        icon: 'database',
      },
      {
        slug: 'security-awareness',
        label: 'Security Awareness',
        description: 'Recognising risks before they become incidents.',
        icon: 'alert',
      },
      {
        slug: 'social-engineering',
        label: 'Social Engineering',
        description: 'Phishing, pretexting and other manipulation tactics.',
        icon: 'users',
      },
      {
        slug: 'passwords-authentication',
        label: 'Passwords & Authentication',
        description: 'How logins work, fail, and can be strengthened.',
        icon: 'key',
      },
      {
        slug: 'online-exposure',
        label: 'Online Exposure',
        description: 'Your digital footprint and what it reveals.',
        icon: 'globe',
      },
      {
        slug: 'cybersecurity-fundamentals',
        label: 'Cybersecurity Fundamentals',
        description: 'Core concepts explained from the ground up.',
        icon: 'book',
      },
    ],
  },
  technology: {
    slug: 'technology',
    label: 'Technology',
    intro:
      'Broader looks at how technology works and where it is heading, with attention to the security and privacy questions it raises.',
    categories: [
      {
        slug: 'artificial-intelligence',
        label: 'Artificial Intelligence',
        description: 'What AI systems do, and what they cannot do.',
        icon: 'spark',
      },
      {
        slug: 'emerging-technology',
        label: 'Emerging Technology',
        description: 'New tools and platforms, and the questions they raise.',
        icon: 'compass',
      },
      {
        slug: 'technology-privacy',
        label: 'Technology & Privacy',
        description: 'How products and platforms handle personal data.',
        icon: 'eye',
      },
      {
        slug: 'technology-security',
        label: 'Technology & Security',
        description: 'Security trade-offs built into everyday technology.',
        icon: 'shield',
      },
      {
        slug: 'how-technology-works',
        label: 'How Technology Works',
        description: 'Plain-language explanations of the systems we rely on.',
        icon: 'cpu',
      },
      {
        slug: 'ai-security',
        label: 'AI Security',
        description: 'Risks to, and from, AI systems.',
        icon: 'layers',
      },
    ],
  },
} as const satisfies Record<
  string,
  { slug: string; label: string; intro: string; categories: readonly Term[] }
>;

export type TopicSlug = (typeof TOPICS)[number]['slug'];
export type SectionSlug = keyof typeof SECTIONS;

export const TOPIC_SLUGS = TOPICS.map((t) => t.slug) as [
  TopicSlug,
  ...TopicSlug[],
];
export const SECTION_SLUGS = Object.keys(SECTIONS) as [
  SectionSlug,
  ...SectionSlug[],
];

export function getTopic(slug: string): Term | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

export function getCategory(
  section: SectionSlug,
  slug: string
): Term | undefined {
  return SECTIONS[section].categories.find((c) => c.slug === slug);
}

/** Example questions the site intends to explore. Not completed work. */
export const OPEN_QUESTIONS = [
  'How much information can be discovered about a company using only public sources?',
  'How do scammers build profiles of potential victims?',
  'What information can a website unintentionally expose?',
  'How does AI change social engineering?',
  'What can someone learn from a publicly exposed email address?',
  'What actually happens after a data breach?',
  'How do attackers use publicly available information?',
];
