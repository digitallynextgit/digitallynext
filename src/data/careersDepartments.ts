export type CareersTone = "red" | "teal";

export type CareersRole = {
  id: string;
  title: string;
  meta?: string;
  summary?: string;
};

export type CareersDepartment = {
  id: string;
  title: string;
  jobsLabel: string;
  tone: CareersTone;
  roles: CareersRole[];
};

export const CAREERS_INTERNSHIP_ROLES: CareersRole[] = [
  {
    id: "intern-graphic-designer",
    title: "Graphic Designer Intern",
    meta: "Internship",
    summary: "Visual storytelling, design assets, and creative execution.",
  },
  {
    id: "intern-content-writer",
    title: "Content Writing Intern",
    meta: "Internship",
    summary: "Write stories and brand-first content across digital platforms.",
  },
  {
    id: "intern-video-editor",
    title: "Video Editing Intern",
    meta: "Internship",
    summary: "Edit reels, shorts, and long-form video with strong storytelling.",
  },
  {
    id: "intern-social-media-creator",
    title: "Social Media Content Creator Intern",
    meta: "Internship",
    summary: "Create platform-native content and follow trends with taste.",
  },
  {
    id: "intern-hr",
    title: "HR Intern",
    meta: "Internship",
    summary: "Support recruitment, onboarding, culture, and HR operations.",
  },
];

export const CAREERS_DEPARTMENTS: CareersDepartment[] = [
  {
    id: "strategic-management",
    title: "Strategic Management Group",
    jobsLabel: "8 Jobs",
    tone: "red",
    roles: [{ id: "strategy-general", title: "General Strategy Application" }],
  },
  {
    id: "account-management",
    title: "Account Management Group",
    jobsLabel: "5 Jobs",
    tone: "teal",
    roles: [{ id: "accounts-general", title: "Account Management Application" }],
  },
  {
    id: "project-management",
    title: "Project Management Group",
    jobsLabel: "4 Jobs",
    tone: "red",
    roles: [{ id: "pm-general", title: "Project Management Application" }],
  },
  {
    id: "creative-studio",
    title: "Creative Studio",
    jobsLabel: "5 Jobs",
    tone: "teal",
    roles: [
      {
        id: "junior-graphic",
        title: "Junior Graphic Designer (1–2 Years)",
        meta: "Full-time",
        summary: "Visual assets across social + landing pages.",
      },
      {
        id: "senior-graphic",
        title: "Senior Graphic Designer",
        meta: "Full-time",
        summary: "Own design output quality and consistency.",
      },
      {
        id: "junior-video",
        title: "Junior Video Editor (1–2 Years)",
        meta: "Full-time",
        summary: "Reels, edits, motion, multi-format content.",
      },
      {
        id: "content-storyteller",
        title: "Content Storyteller",
        meta: "Full-time",
        summary: "Short + long form storytelling with performance lens.",
      },
      {
        id: "creative-manager",
        title: "Creative Manager (4–5+ Years)",
        meta: "Full-time",
        summary: "Lead design/video/content teams for high-impact output.",
      },
    ],
  },
  {
    id: "performance",
    title: "Performance (Organic and Paid)",
    jobsLabel: "2 Jobs",
    tone: "red",
    roles: [
      {
        id: "seo-ai-search",
        title: "Search Engine Optimization | AI Search",
        meta: "Full-time",
        summary: "On-page/off-page/technical SEO + analytics.",
      },
      {
        id: "performance-marketer",
        title: "Performance Marketer",
        meta: "Full-time",
        summary: "Run paid campaigns across Meta/Google/LinkedIn.",
      },
    ],
  },
  {
    id: "adac",
    title: "AI Decision & Acceleration Centre (ADAC)",
    jobsLabel: "4 Jobs",
    tone: "teal",
    roles: [
      {
        id: "ai-strategist-analyst",
        title: "AI Strategist & Analyst",
        meta: "Full-time",
        summary: "Decision systems, analytics, and automation workflows.",
      },
      {
        id: "ai-content-specialist",
        title: "AI Content & Creative Specialist",
        meta: "Full-time",
        summary: "AI-assisted content + visuals while keeping brand tone.",
      },
      {
        id: "ai-performance-specialist",
        title: "AI Performance & Media Specialist",
        meta: "Full-time",
        summary: "AI-driven optimization for scale and efficiency.",
      },
      {
        id: "ai-first-web-dev",
        title: "AI-First Web Developer",
        meta: "Full-time",
        summary: "Build AI-powered platforms with strong ownership.",
      },
    ],
  },
  {
    id: "human-resources",
    title: "Human Resources",
    jobsLabel: "3 Jobs",
    tone: "red",
    roles: [
      {
        id: "hr-executive",
        title: "HR Executive (0–2 Years)",
        meta: "Full-time",
        summary: "Recruitment, onboarding, operations, and engagement.",
      },
      { id: "hr-general", title: "General HR Application", meta: "Apply" },
    ],
  },
  {
    id: "media",
    title: "Media - Social and Digital Presence",
    jobsLabel: "2 Jobs",
    tone: "teal",
    roles: [
      {
        id: "smo-specialist",
        title: "Social Media Optimization Specialist",
        meta: "Full-time",
        summary: "Platform optimization + analytics-driven growth.",
      },
      {
        id: "pr-communications",
        title: "PR & Communications Executive",
        meta: "Full-time",
        summary: "Press releases, media coordination, brand messaging.",
      },
    ],
  },
  {
    id: "web-essentials",
    title: "Web Essentials",
    jobsLabel: "3 Jobs",
    tone: "red",
    roles: [
      {
        id: "junior-fullstack",
        title: "Junior Full Stack Developer (0–2 Years)",
        meta: "Full-time",
        summary: "Next.js/React + strong fundamentals.",
      },
      {
        id: "senior-fullstack",
        title: "Senior Full Stack Developer (2–4 Years)",
        meta: "Full-time",
        summary: "Own features end-to-end and scale systems.",
      },
      {
        id: "ai-integration",
        title: "AI Integration Engineer",
        meta: "Full-time",
        summary: "AI API integration + automation workflows.",
      },
    ],
  },
];
