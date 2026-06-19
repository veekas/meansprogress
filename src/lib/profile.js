/** @type {readonly string[]} */
export const skills = [
  'TypeScript',
  'React',
  'Next.js',
  'Svelte',
  'Node.js',
  'GraphQL',
  'PostgreSQL',
  'accessibility',
  'climate tech',
  'AI products'
];

export const tagline = 'senior product engineer · climate tech · allo founder';

export const shortBio =
  'Senior product engineer at SolarAPP+ and founder of Allo, a coaching app for caregivers of young children. Spent two years at Rewiring America building electrification tools — including the Incentive API and Personal Electrification Planner. Seven years in full-stack TypeScript and React, with roots at Arcadia and The Knot.';

export const metaDescription =
  'Senior product engineer at SolarAPP+. Founder of Allo. Climate tech, electrification tools, and full-stack TypeScript — based in Beacon, NY.';

/** @type {readonly { title: string; company: string; period?: string; description: string; technologies: readonly string[]; href?: string }[]} */
export const projects = [
  {
    title: 'Personal Electrification Planner',
    company: 'Rewiring America',
    period: '2023–2025',
    description:
      'Built the initial frontend for a tool that uses machine learning models to estimate the upfront costs and savings of home electrification.',
    technologies: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Figma']
  },
  {
    title: 'Incentives API & Savings Calculator',
    company: 'Rewiring America',
    period: '2023–2025',
    description:
      'Co-managed open-source repos; refactored geolocation models, improved CI/CD data-update workflows, and added endpoints, logging, and analytics.',
    technologies: ['TypeScript', 'Node.js', 'Terraform', 'GCP', 'PostgreSQL'],
    href: 'https://github.com/rewiring-america'
  },
  {
    title: 'Allo',
    company: 'Self',
    period: '2025–present',
    description:
      'Designed and built a childhood speech therapy tool that offers personalized recommendations and support for parents and caregivers.',
    technologies: ['Next.js', 'LangGraph', 'OpenAI API', 'FastAPI', 'Render'],
    href: 'https://allogrow.com'
  },
  {
    title: 'Healthcare chatbot & provider search',
    company: 'Freelance',
    period: '2025–present',
    description:
      'Built and improved the chatbot and provider search experience for direct-pay healthcare services.',
    technologies: ['Next.js', 'LangGraph', 'OpenAI API', 'FastAPI', 'Netlify']
  },
  {
    title: 'Shared infrastructure optimization',
    company: 'Arcadia',
    period: '2022–2023',
    description:
      'Optimized shared infrastructure to reduce cloud storage costs across climate-tech products.',
    technologies: ['TypeScript', 'React', 'Next.js', 'Ruby on Rails', 'AWS']
  },
  {
    title: 'A/B testing platform & component library',
    company: 'The Knot',
    period: '2018–2022',
    description:
      'Built an internal A/B testing service and REST API for experiments and user bucketing. Led development on a company-wide React component library.',
    technologies: ['React', 'Next.js', 'Node.js', 'Ruby on Rails', 'Jenkins']
  }
];

/** @returns {Record<string, unknown>} */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Veekas Ashoka',
    url: 'https://veekasmeansprogress.com',
    email: 'veekas.ashoka@gmail.com',
    jobTitle: 'Senior Product Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'SolarAPP+'
    },
    description: metaDescription,
    knowsAbout: [
      'TypeScript',
      'React',
      'Next.js',
      'Svelte',
      'Node.js',
      'GraphQL',
      'PostgreSQL',
      'Web Accessibility',
      'Climate Technology',
      'Electrification',
      'LangGraph',
      'OpenAI API'
    ],
    sameAs: [
      'https://www.linkedin.com/in/veekas',
      'https://github.com/veekas',
      'https://allogrow.com'
    ],
    alumniOf: [
      { '@type': 'Organization', name: 'Rewiring America' },
      { '@type': 'Organization', name: 'Arcadia' },
      { '@type': 'Organization', name: 'The Knot Worldwide' }
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Bachelor of Arts in Political Science',
        educationalLevel: "Bachelor's Degree",
        credentialCategory: 'degree'
      }
    ]
  };
}

/** @type {readonly { href: string; label: string; external?: boolean }[]} */
export const links = [
  { href: 'https://www.linkedin.com/in/veekas', label: 'linkedin' },
  { href: 'https://www.github.com/veekas', label: 'github' },
  { href: 'https://allogrow.com', label: 'allo' },
  { href: 'https://calendly.com/veekas/meet', label: 'calendar' },
  { href: 'mailto:fit-imply-given@duck.com', label: 'email', external: false },
  { href: '/work', label: 'work', external: false },
  { href: 'https://i.airbuds.fm/veekas/FJLDpeRRL6', label: 'airbuds' },
  { href: 'http://www.instagram.com/veekas', label: 'instagram' },
  { href: 'https://app.thestorygraph.com/profile/veekas', label: 'storygraph' },
  { href: 'https://strava.app.link/gpIRjM032Yb', label: 'strava' }
];
