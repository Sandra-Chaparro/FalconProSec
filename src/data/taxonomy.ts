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
  /** Short, high-stakes phrase cycled in the homepage hero ("investigating: ..."). */
  signal?: string;
}

/**
 * Areas of investigation. These are human problems, not career tracks:
 * each one draws on whatever discipline the question needs.
 */
export const TOPICS = [
  {
    slug: 'human-vulnerability',
    signal: "ai scams that already know your name",
    label: 'Human Vulnerability',
    description:
      'AI-powered scams, impersonation, social engineering and manipulation, and why some people are more exposed than others.',
    icon: 'users',
  },
  {
    slug: 'trust-identity',
    signal: "cloned voices begging for money",
    label: 'Trust & Identity',
    description:
      'Deepfakes, synthetic identities, authentication and misinformation: how we decide what, and who, to trust.',
    icon: 'key',
  },
  {
    slug: 'ai-decision-making',
    signal: "algorithms deciding who gets a chance",
    label: 'AI & Human Decision-Making',
    description:
      'Automated decisions, bias, accountability and explainability, and the people on the receiving end.',
    icon: 'spark',
  },
  {
    slug: 'human-connections',
    signal: "ai companions built to keep you hooked",
    label: 'Human Connection',
    description:
      'AI companionship, emotional dependency and digital wellbeing as technology becomes more personal.',
    icon: 'message',
  },
  {
    slug: 'human-safety',
    signal: "the systems your life quietly depends on",
    label: 'Human Safety',
    description:
      'Security risks in the systems people depend on: healthcare, schools, finance and public services.',
    icon: 'shield',
  },
] as const satisfies readonly Term[];

export const SECTIONS = {
  'security-privacy': {
    slug: 'security-privacy',
    label: 'Security & Privacy',
    intro:
      'Plain explanations of the security and privacy risks that reach ordinary people: what the risk actually is, how it works, and what you can reasonably do about it.',
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
      'How technology works, where it is heading, and what that means for the people who use it, or are affected by it without ever choosing to.',
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

/**
 * Questions planned for investigation, grouped by area. Not completed work.
 */
export const OPEN_QUESTIONS: { area: TopicSlug; question: string }[] = [
  {
    area: 'human-vulnerability',
    question: 'How does AI change the economics of a scam when a convincing message costs almost nothing to produce?',
  },
  {
    area: 'human-vulnerability',
    question: 'How do scammers build profiles of potential victims from public information?',
  },
  {
    area: 'trust-identity',
    question: 'If a voice can be cloned from a short clip, what should a family or a help desk use to verify who is calling?',
  },
  {
    area: 'trust-identity',
    question: 'What can an ordinary person realistically check to tell whether an image or video is authentic?',
  },
  {
    area: 'ai-decision-making',
    question: 'When an automated system makes a decision about someone, what would they need in order to understand or challenge it?',
  },
  {
    area: 'human-connection',
    question: 'What design choices make an AI companion supportive, and which ones make it manipulative?',
  },
  {
    area: 'access-opportunity',
    question: 'Which security practices quietly assume a level of access, language or ability that many people do not have?',
  },
  {
    area: 'human-safety',
    question: 'What actually happens to patients, students or citizens after a data breach at a service they cannot opt out of?',
  },
];
