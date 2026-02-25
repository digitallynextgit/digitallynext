export const siteConfig = {
  name: "Digitally Next",
  subtitle: "Think. Act. Disrupt.",
  tagline: "We Don't Just Build Campaigns",
  description:
    "Full-stack digital marketing agency. Strategy, branding, performance marketing, AI-driven decisions — all under one roof.",
  url: "https://www.digitallynext.com",
};

export const navLinksLeft = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/#services" },
];

export const navLinksRight = [
  { label: "CASE STUDIES", href: "/case-study" },
  { label: "CONTACT", href: "/#contact" },
];

export const navLinks = [...navLinksLeft, ...navLinksRight];

export const services = [
  {
    id: 1,
    title: "Strategy, Brand & Growth Intelligence",
    subtitle: "Brand & digital strategy · Positioning & GTM",
    description:
      "We decode markets, define positioning, and craft go-to-market strategies that give your brand a competitive edge in the digital landscape.",
  },
  {
    id: 2,
    title: "Content, Culture & Media Creation",
    subtitle: "Content strategy · Video & visual production",
    description:
      "From viral campaigns to brand storytelling — we create content that resonates with culture and drives authentic engagement.",
  },
  {
    id: 3,
    title: "Performance, Distribution & Demand",
    subtitle: "SEO & organic growth · Paid media & optimization",
    description:
      "Data-driven performance marketing that maximizes ROI. We optimize every channel from search to social to drive measurable growth.",
  },
  {
    id: 4,
    title: "Platforms, Web & Digital Experience",
    subtitle: "Websites & landing experiences · UX & conversion",
    description:
      "We build digital experiences that convert. From landing pages to full platforms — designed for speed, beauty, and results.",
  },
  {
    id: 5,
    title: "AI Enablement & Decision Systems",
    subtitle:
      "Guided by ADAC · Websites & landing experiences · UX & conversion",
    description:
      "Leverage AI to accelerate execution, automate decisions, and unlock insights. Our ADAC framework turns data into action.",
    highlight: "ADAC",
  },
];

export const caseStudies = [
  {
    id: 1,
    title: "Advent Global",
    highlight: "Global",
    description:
      "Transforming Legacy (more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
    category: "IT & ITES",
    color: "#E53935",
    image: "/case/c1.webp",
  },
  {
    id: 2,
    title: "NeoTech",
    description:
      "Complete Brand makeover of a global brand (Post M&A) to a new name and digital brand communication.",
    category: "Genomics",
    color: "#00BCD4",
    image: "/case/c2.webp",
  },
  {
    id: 3,
    title: "", // Kept as NeoTech based on image text, though description implies Judaica Gallery
    description:
      "Launch of a high end Judaica Art gallery and 5 Artists for International Markets-US",
    category: "UK",
    color: "#00BCD4",
    image: "/case/c3.webp",
  },
  {
    id: 4,
    title: "Signia",
    description:
      "Digital Campaign on Social Cause for a world leader in wearable hearing devices",
    category: "Hearing Aids",
    color: "#E53935",
    image: "/case/c4.webp",
  },
];

export const stats = [
  { value: 100, suffix: "+", label: "Brands Served" },
  { value: 12, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Campaigns Executed" },
  { value: 15, suffix: "+", label: "Industries Covered" },
];

export const clientLogos = [
  "Signia",
  "SensuQ",
  "Gajna",
  "Khaleej",
  "House of Nandini",
  "ADAC",
];

export const dadPillars = [
  {
    letter: "D",
    word: "Data",
    tagline: "shapes decisions",
    description: "Decide with data.",
  },
  {
    letter: "A",
    word: "AI",
    tagline: "accelerates execution",
    description: "Move with intelligence.",
  },
  {
    letter: "D",
    word: "Digital",
    tagline: "systems deliver outcomes",
    description: "Build digitally.",
  },
];

export const insights = [
  {
    id: 1,
    title: "Why Your Brand Needs a Full-Stack Digital Strategy in 2025",
    excerpt:
      "In an era of fragmented attention, a unified digital approach isn't optional — it's essential for survival.",
    date: "Feb 10, 2025",
    category: "Strategy",
  },
  {
    id: 2,
    title: "The Modern DAD Framework: How We Use Data, AI & Digital",
    excerpt:
      "Our proprietary framework that transforms how brands make decisions and execute campaigns at scale.",
    date: "Jan 28, 2025",
    category: "Thought Leadership",
  },
  {
    id: 3,
    title: "Performance Marketing Beyond Clicks: Measuring Real Impact",
    excerpt:
      "Why vanity metrics are killing your ROI and how to build measurement frameworks that actually matter.",
    date: "Jan 15, 2025",
    category: "Performance",
  },
];

export const philosophy =
  "In a noisy world, we choose clarity. Digitally Next is where stories are shaped and strategies are born. We walk with giants and guide the underdogs — not as service providers, but as partners in purpose.";
