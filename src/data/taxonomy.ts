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

export interface ResearchArea extends Term {
  /** The central question this area of inquiry is trying to understand. */
  inquiry: string;
  /** Disciplines this area tends to draw on. Indicative, not exhaustive. */
  disciplines: readonly string[];
}

/**
 * Areas of inquiry. These are human problems, not service lines or career
 * tracks: each one draws on whatever disciplines the question needs, and the
 * boundaries are expected to shift as investigations reveal connections.
 */
export const TOPICS = [
  {
    slug: 'human-vulnerability',
    signal: "ai scams that already know your name",
    label: 'Human Vulnerability',
    inquiry:
      'Why do some people, in some moments, become easier to deceive, pressure or exploit, and how does technology change who is exposed?',
    description:
      'Scams, impersonation, social engineering and manipulation, studied as an interaction between a technique and the circumstances of the person it reaches.',
    disciplines: ['Cybersecurity', 'Psychology', 'Behavioral science'],
    icon: 'users',
  },
  {
    slug: 'trust-identity',
    signal: "cloned voices begging for money",
    label: 'Trust & Identity',
    inquiry:
      'How do people decide what, and who, is real when voices, faces, documents and messages can be generated?',
    description:
      'Deepfakes, synthetic identities, authentication and misinformation: the signals people rely on to establish trust, and what happens when those signals can be imitated.',
    disciplines: ['AI', 'Cybersecurity', 'Psychology'],
    icon: 'key',
  },
  {
    slug: 'ai-decision-making',
    signal: "algorithms deciding who gets a chance",
    label: 'AI & Human Decision-Making',
    inquiry:
      'What happens to judgement, accountability and recourse when automated systems shape decisions about people?',
    description:
      'Automated decisions, bias, over-reliance and explainability, examined from the side of the people those decisions are made about.',
    disciplines: ['AI', 'Software engineering', 'Behavioral science'],
    icon: 'spark',
  },
  {
    slug: 'human-connections',
    signal: "ai companions built to keep you hooked",
    label: 'Human Connection',
    inquiry:
      'How do systems designed for companionship and attention affect dependency, wellbeing and influence?',
    description:
      'AI companions, emotionally responsive systems and digital relationships, and where support ends and manipulation begins.',
    disciplines: ['AI', 'Psychology', 'Software engineering'],
    icon: 'message',
  },
  {
    slug: 'human-safety',
    signal: "the systems your life quietly depends on",
    label: 'Human Safety',
    inquiry:
      'How do security failures in essential systems turn into consequences for the people who depend on them?',
    description:
      'Healthcare, education, finance and public services: the human side of security failures in systems people cannot easily avoid.',
    disciplines: ['Cybersecurity', 'Software engineering', 'Behavioral science'],
    icon: 'shield',
  },
] as const satisfies readonly ResearchArea[];

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

/** Every category slug across all sections (they are unique site-wide). */
export const CATEGORY_SLUGS = Object.values(SECTIONS).flatMap((s) =>
  s.categories.map((c) => c.slug)
) as [string, ...string[]];

/** Category slugs that belong to a section. */
export function sectionCategorySlugs(section: SectionSlug): string[] {
  return SECTIONS[section].categories.map((c) => c.slug);
}

/** Find a category by slug in any section. */
export function findCategory(
  slug: string
): { section: SectionSlug; category: Term } | undefined {
  for (const [section, s] of Object.entries(SECTIONS)) {
    const category = (s.categories as readonly Term[]).find((c) => c.slug === slug);
    if (category) return { section: section as SectionSlug, category };
  }
  return undefined;
}

export function getTopic(slug: string): ResearchArea | undefined {
  return (TOPICS as readonly ResearchArea[]).find((t) => t.slug === slug);
}

export function getCategory(
  section: SectionSlug,
  slug: string
): Term | undefined {
  return SECTIONS[section].categories.find((c) => c.slug === slug);
}

export type QuestionStatus = 'open' | 'investigating';

export interface ResearchQuestion {
  question: string;
  /** Areas of inquiry the question belongs to. The first is the primary one. */
  areas: TopicSlug[];
  status: QuestionStatus;
  /** Ids of investigations that address this question, fully or in part. */
  investigations?: string[];
}

/**
 * The research agenda: questions currently being explored. Most are open.
 * When an investigation takes one on, set status to 'investigating' and
 * list the investigation id.
 */
export const RESEARCH_QUESTIONS: ResearchQuestion[] = [
  {
    question: 'How can personal trust and relationships become a path to sensitive information, and can the person involved tell when it is happening?',
    areas: ['human-vulnerability', 'trust-identity'],
    status: 'investigating',
    investigations: ['when-trust-becomes-an-attack-surface'],
  },
  {
    question: 'How does AI change the way people establish trust in a voice, a face or a message?',
    areas: ['trust-identity'],
    status: 'open',
  },
  {
    question: 'What evidence remains useful when identities, voices, images and communications can be artificially generated?',
    areas: ['trust-identity'],
    status: 'open',
  },
  {
    question: 'How should people reason about authenticity when technology can convincingly imitate someone they know?',
    areas: ['trust-identity', 'human-vulnerability'],
    status: 'open',
  },
  {
    question: 'Why are some technology-enabled scams persuasive even to technically knowledgeable people?',
    areas: ['human-vulnerability'],
    status: 'open',
  },
  {
    question: 'How does AI change the economics of a scam when a convincing message costs almost nothing to produce?',
    areas: ['human-vulnerability'],
    status: 'open',
  },
  {
    question: 'When does a cybersecurity problem actually become a human behavior problem?',
    areas: ['human-vulnerability', 'human-safety'],
    status: 'open',
  },
  {
    question: 'How do psychological factors interact with technical security controls, and when do controls fail because of how people actually behave?',
    areas: ['human-safety', 'human-vulnerability'],
    status: 'open',
  },
  {
    question: 'Which security practices quietly assume a level of access, language or ability that many people do not have?',
    areas: ['human-safety'],
    status: 'open',
  },
  {
    question: 'When an automated system makes a decision about someone, what would they need in order to understand or challenge it?',
    areas: ['ai-decision-making'],
    status: 'open',
  },
  {
    question: 'What design choices make an AI companion supportive, and which ones make it manipulative?',
    areas: ['human-connections'],
    status: 'open',
  },
  {
    question: 'What happens to the people who rely on a public service after a security failure they had no way to opt out of?',
    areas: ['human-safety'],
    status: 'open',
  },
];

export function questionsForArea(area: TopicSlug): ResearchQuestion[] {
  return RESEARCH_QUESTIONS.filter((q) => q.areas.includes(area));
}

export function questionsForInvestigation(id: string): ResearchQuestion[] {
  return RESEARCH_QUESTIONS.filter((q) => q.investigations?.includes(id));
}
