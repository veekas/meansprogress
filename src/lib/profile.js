export const tagline =
  "Veekas is a software engineer, founder of Allo, and a volunteer EMT. He lives in Beacon, NY, with his young son and old dog.";

export const shortBio =
  "Senior software engineer at SolarAPP+ and founder of Allo, a coaching tool for caregivers of young children with speech delays. Seven years in full-stack web development in the climate and health sectors.";

export const metaDescription =
  "Senior product engineer at SolarAPP+, founder of Allo, and volunteer EMT in Beacon, NY.";

/** @type {readonly { title: string; company: string; period?: string; description: string; technologies: readonly string[]; href?: string }[]} */
export const projects = [
  {
    title: "Founder",
    company: "Alloparent LLC (Allo)",
    period: "2025–present",
    description:
      "Designed and built a childhood speech therapy tool that offers personalized recommendations and support for parents and caregivers.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Claude API",
      "FastAPI",
      "Render",
      "AWS",
      "Python",
      "Cloudflare",
      "Supabase",
    ],
    href: "https://allogrow.com",
  },
  {
    title: "Senior Product Engineer",
    company: "SolarAPP+",
    period: "2026–present",
    description:
      "Streamlining the permitting process for governments and clean energy installers to save everyone money and time.",
    technologies: ["PHP", "Laravel", "Vue", "PostgreSQL", "AWS"],
    href: "https://www.gosolarapp.org/",
  },
  {
    title: "Software Engineer (Contract)",
    company: "Self",
    period: "2025–present",
    description:
      "Lots of AI-driven full-stack web development. Some agentic workflows that saved people time and money. Built and improved the chatbot and provider search experience for a direct-pay healthcare service.",
    technologies: ["Next.js", "LangGraph", "OpenAI API", "FastAPI", "Netlify"],
  },
  {
    title: "Software Engineer - Personal Electrification Planner",
    company: "Rewiring America",
    period: "2024–2025",
    description:
      "Built the initial frontend for a tool that uses machine learning models to estimate the upfront costs and savings of home electrification.",
    technologies: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "Figma"],
  },
  {
    title: "Software Engineer - Incentives API & Savings Calculator",
    company: "Rewiring America",
    period: "2023–2024",
    description:
      "Co-managed open-source repos; refactored geolocation models, improved CI/CD data-update workflows, and added endpoints, logging, and analytics.",
    technologies: ["TypeScript", "Node.js", "Terraform", "GCP", "PostgreSQL"],
    href: "https://github.com/rewiring-america",
  },
  {
    title: "Software Engineer III",
    company: "Arcadia",
    period: "2022–2023",
    description:
      "Frontend infrastructure team. Optimized shared infrastructure to reduce cloud storage costs across climate-tech products.",
    technologies: ["TypeScript", "React", "Next.js", "Ruby on Rails", "AWS"],
  },
  {
    title: "Software Engineer",
    company: "The Knot",
    period: "2018–2022",
    description:
      "Worked on the marketplace team. Co-led development of the company-wide React component library. Built an internal A/B testing service and REST API for experiments and user bucketing.",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Ruby on Rails",
      "Jenkins",
      "GraphQL",
    ],
  },
];

/** @type {readonly string[]} */
export const skills = [
  ...new Set(projects.flatMap((project) => project.technologies ?? [])),
];

/** @type {readonly { title: string; company: string; period?: string; description: string; technologies: readonly string[]; href?: string }[]} */
export const volunteer = [
  {
    title: "Emergency Medical Technician - Basic",
    company: "Beacon Volunteer Ambulance Corps",
    period: "2025–present",
    description: "Volunteer EMT since 2025",
    technologies: [],
    href: "https://www.beaconvac.org/",
  },
  {
    title: "Board Member",
    company: "Mid-Hudson Energy Transition: HELP Fund",
    period: "2024–present",
    description:
      "Board member for a fund that helps low-income Mid-Hudson residents remediate their homes and transition to clean energy. Chair of the Fundraising Committee.",
    technologies: [],
    href: "https://www.investinhelp.org/",
  },
];

/** @returns {Record<string, unknown>} */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Veekas Ashoka",
    url: "https://veekasmeansprogress.com",
    email: "fit-imply-given@duck.com",
    jobTitle: "Senior Product Engineer",
    worksFor: [
      {
        "@type": "Organization",
        name: "SolarAPP+",
      },
      {
        "@type": "Organization",
        name: "Alloparent LLC",
      },
    ],
    description: metaDescription,
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Svelte",
      "Node.js",
      "GraphQL",
      "PostgreSQL",
      "Web Accessibility",
      "Climate",
      "Clean Energy",
      "Electrification",
      "Permitting",
      "LangGraph",
      "OpenAI API",
      "Claude API",
      "Amazon Bedrock",
      "FastAPI",
      "Terraform",
      "Amazon Web Services",
      "Google Cloud Platform",
      "Render",
      "Netlify",
      "Figma",
      "PHP",
      "Laravel",
      "Ruby on Rails",
      "Python",
      "Docker",
      "Health Tech",
      "AI Products",
      "Caregiver Support",
      "Speech Therapy",
      "Direct-Pay Healthcare",
      "Emergency Medical Services",
      "EMT",
    ],
    memberOf: {
      "@type": "Organization",
      name: "Beacon Volunteer Ambulance Corps",
      url: "https://www.beaconvac.org/",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Bachelor of Arts in Political Science",
        educationalLevel: "Bachelor's Degree",
        credentialCategory: "degree",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Emergency Medical Technician — Basic (EMT-B)",
        credentialCategory: "certification",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/in/veekas",
      "https://github.com/veekas",
      "https://allogrow.com",
    ],
    alumniOf: [
      { "@type": "Organization", name: "Rewiring America" },
      { "@type": "Organization", name: "Arcadia" },
      { "@type": "Organization", name: "The Knot Worldwide" },
      { "@type": "Organization", name: "XO Group" },
      { "@type": "Organization", name: "Fullstack Academy of Code" },
      { "@type": "Organization", name: "Arizona Technology Council" },
      { "@type": "Organization", name: "Arizona State University" },
      { "@type": "Organization", name: "People for the American Way" },
      { "@type": "Organization", name: "Sunrise Movement" },
    ],
  };
}

/** @type {readonly { href: string; label: string; external?: boolean }[]} */
export const links = [
  { href: "https://allogrow.com", label: "allo" },
  { href: "https://www.linkedin.com/in/veekas", label: "linkedin" },
  { href: "https://www.github.com/veekas", label: "github" },
  { href: "https://calendly.com/veekas/meet", label: "calendar" },
  { href: "mailto:fit-imply-given@duck.com", label: "email", external: false },
  // { href: "https://app.thestorygraph.com/profile/veekas", label: "books" },
  // { href: "https://i.airbuds.fm/veekas/FJLDpeRRL6", label: "music" },
  // { href: 'https://strava.app.link/gpIRjM032Yb', label: 'workouts' }
];
