export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const profile = {
  name: "Noam Benjamin",
  title: "Bilingual Sales & Business Development",
  location: "Montréal, QC",
  email: "noambenjamin40@gmail.com",
  phone: "514-863-7173",
  linkedin: "https://www.linkedin.com/in/noambenjamin4",
  linkedinLabel: "linkedin.com/in/noambenjamin4",
  instagram: "https://www.instagram.com/afterlifevents/",
  instagramLabel: "@afterlifevents",
  cv: "/noam-benjamin-cv.pdf",
  availability: "Open to new opportunities",
  lastUpdated: "May 2026",
  currently: [
    { role: "Founder", org: "Afterlife Events" },
    { role: "Social Science student", org: "Dawson College" },
  ],
  summary:
    "Bilingual Dawson College student and founder. I built a profitable events business from nothing, sold 1,500+ tickets, and landed sponsorships through cold outreach and negotiation. I'm comfortable generating revenue, closing sales, and building client relationships in both English and French.",
};

export const stats = [
  { value: "$50K+", label: "Revenue generated" },
  { value: "1,500+", label: "Tickets sold" },
  { value: "~47%", label: "Profit margin" },
  { value: "600+", label: "Songs mixed" },
];

export const statsNote =
  "Revenue, tickets, and margin from 5 Afterlife Events shows in under one year.";

export const about = {
  paragraphs: [
    "I'm a bilingual Dawson College student who would rather build than wait. I started Afterlife Events with no budget and no audience — just outreach, negotiation, and a lot of follow-up.",
    "In under a year it grew to five events, 1,500+ tickets, and over $50K in revenue at roughly 47% margin, all with zero ad spend. Outside of that I've spent 6+ years as a self-taught mixing engineer and build small web projects on the side. The throughline is the same: spot the opening, do the unglamorous work, and close.",
  ],
};

export const caseStudy = {
  title: "Afterlife Events",
  tag: "Featured",
  rows: [
    {
      k: "Problem",
      v: "No budget, no following, and a crowded Montréal nightlife market to break into.",
    },
    {
      k: "Approach",
      v: "Cold outreach, organic content, and word of mouth to sell out rooms; negotiated venue, vendor, and sponsorship deals to protect margin; hired and led a team of 10+.",
    },
    {
      k: "Result",
      v: "5 events, 1,500+ tickets, and $50K+ in revenue at ~47% margin in under a year — with zero ad spend.",
    },
  ],
};

export type Experience = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Founder",
    org: "Afterlife Events",
    period: "July 2025 – Present",
    points: [
      "Sole founder, generating over $50,000 in revenue at an approximately 47% profit margin across 5 events in under one year.",
      "Sold 1,500+ tickets with zero ad spend, driving all sales through organic outreach, content, and word of mouth.",
      "Secured sponsorships and brand partnerships through cold outreach and direct negotiation.",
      "Built and managed client relationships across thousands of interactions, resolving issues and building a loyal repeat following.",
      "Negotiated venue and vendor contracts to protect margins.",
      "Hired and led teams of 10+ while studying full time at Dawson College.",
    ],
  },
  {
    role: "Retail Associate",
    org: "Zara, Montréal",
    period: "July 2025 – August 2025",
    points: [
      "Served approximately 300 customers per shift on the sales floor in English and French, answering product questions and driving purchase decisions.",
      "Maintained store organization, restocked merchandise, and kept fitting rooms and displays presentation-ready.",
      "Worked within a team of 10+ to keep the floor running smoothly during high-traffic periods.",
    ],
  },
  {
    role: "Bunk Counselor",
    org: "YCC Sleepaway Camp",
    period: "July 2024 – August 2024",
    points: [
      "Supervised a group of approximately 20 children aged 7 to 9 throughout a multi-week residential camp.",
      "Planned and led daily activities including sports, swimming, and drama.",
      "Resolved conflicts between campers and supported children experiencing homesickness.",
      "Coordinated daily routines: meals, hygiene, bedtime, and transitions between activities.",
    ],
  },
  {
    role: "Camp Counselor",
    org: "JHoops Basketball Camp",
    period: "July 2023 – August 2023",
    points: [
      "Supervised mixed-age groups of children aged 6 to 12 throughout the day.",
      "Designed age-appropriate workouts, games, and activities.",
      "Made sure every child felt included, engaged, and safe during transitions.",
    ],
  },
  {
    role: "Team Member, Shooting Guard",
    org: "Villa Maria Basketball Team",
    period: "October 2019 – March 2020",
    points: [
      "Committed to a full competitive season while keeping up with school, attending every practice on time.",
      "Worked closely with teammates toward shared goals under a demanding schedule.",
      "Built early discipline in time management, balancing practices with academic workload.",
    ],
  },
];

export type Project = {
  title: string;
  tag: string;
  description: string;
  link?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    title: "Afterlife Events",
    tag: "Founder · Events",
    description:
      "A profitable events business I built from scratch: 5 events, 1,500+ tickets, and over $50K in revenue at roughly 47% margin, all with zero ad spend.",
    link: "https://www.instagram.com/afterlifevents/",
    linkLabel: "@afterlifevents",
  },
  {
    title: "Audio Engineering",
    tag: "Self-taught · 6+ years",
    description:
      "Mixing engineer for 6+ years. I've mixed 600+ songs across pop, rap, Afrobeat, and more for paying clients, working in Logic Pro and FL Studio.",
  },
  {
    title: "Technology & Web",
    tag: "Builder · AI tools",
    description:
      "I build websites and small apps with AI coding tools like Claude and ChatGPT, and edit videos and montages in Final Cut Pro.",
  },
];

export type Track = {
  title: string;
  genre: string;
  src: string;
  duration: string;
};

export const tracks: Track[] = [
  {
    title: "Breathe Easy",
    genre: "Pop",
    src: "/audio/breathe-easy.m4a",
    duration: "2:56",
  },
  {
    title: "Wildest Thoughts",
    genre: "Pop / R&B",
    src: "/audio/wildest-thoughts.m4a",
    duration: "0:52",
  },
];

export const skills = [
  "Revenue growth",
  "Negotiation & closing",
  "Client relationships",
  "Outreach & prospecting",
  "Bilingual communication",
  "Lead generation & marketing",
];

export const qualities = ["Self-driven", "Resilient", "Persuasive", "Results-oriented"];

export const tools = [
  "Logic Pro",
  "FL Studio",
  "Final Cut Pro",
  "Claude",
  "ChatGPT",
];

export const languages = [
  { name: "English", level: "Native" },
  { name: "French", level: "Native" },
];

export type Education = {
  school: string;
  credential: string;
  detail: string;
};

export const education: Education[] = [
  {
    school: "Dawson College, Montréal",
    credential: "DEC in Social Science",
    detail: "Expected May 2026",
  },
  {
    school: "Villa Maria High School, Montréal",
    credential: "High School Diploma",
    detail: "2024",
  },
];
