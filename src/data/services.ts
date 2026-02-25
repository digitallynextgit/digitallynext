// ─── Types ───────────────────────────────────────────────────────────────────

export type ServiceTheme = {
  heroBg: string;
  heroText: string;
  heroMutedText: string;
  accent: string;
  accentAlt: string;
  surfaceBg: string;
  surfaceBorder: string;
  bodyText: string;
  mutedText: string;
};

export type ServiceHeroSection = {
  breadcrumb: string;
  titleLines: string[];
  layout: "centered" | "stacked";
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: string;
  subtitle?: string;
  quoteLead?: string;
  quoteText: string;
  quoteColor?: string;
  quoteShadow?: string;
  body: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaVariant?: "accent" | "alt" | "light";
  ctaColor?: string;
  arrowSrc?: string;
};

export type ServiceListItem = {
  accent: "accent" | "alt";
  text: string;
};

export type ServiceFeatureCard = {
  iconSrc: string;
  title: string;
  description: string;
};

export type ServiceScopeItem = {
  title: string;
  description: string;
  imageSrc?: string;
};

export type ServiceCaseStudyCard = {
  imageSrc: string;
  title: string;       // supports HTML e.g. 'Advent <span style="color:#E21F26">Global</span>'
  description: string;
  tag: string;
  href?: string;
};

export type ServiceSection =
  | {
      type: "realBrief";
      eyebrow: string;
      heading: string;
      description: string;
      list: ServiceListItem[];
      highlightText: string;
    }
  | {
      type: "featureGrid";
      eyebrow: string;
      headingLines: string[];
      description: string;
      cards: ServiceFeatureCard[];
      footerText?: string;
    }
  | {
      type: "scope";
      eyebrow: string;
      heading: string;
      description?: string;
      items: ServiceScopeItem[];
    }
  | {
      type: "caseStudy";
      heading: string;
      ctaLabel: string;
      ctaHref: string;
      cards: ServiceCaseStudyCard[];
    };

export type ServiceCTA = {
  heading: string;
  buttonLabel: string;
  buttonHref: string;
};

export type ServiceDetail = {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  theme: ServiceTheme;
  hero: ServiceHeroSection;
  sections: ServiceSection[];
  cta: ServiceCTA;
};

// ─── Data ────────────────────────────────────────────────────────────────────

export const services: ServiceDetail[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // 1. Performance, Distribution & Demand
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pdd",
    slug: "seo-optimization",
    title: "Performance, Distribution & Demand.",
    metaTitle: "Performance, Distribution & Demand | Digitally Next",
    metaDescription:
      "Performance, Distribution & Demand — a system-first approach to growth that compounds across channels.",
    theme: {
      heroBg: "#0A0A0A",
      heroText: "#FFFFFF",
      heroMutedText: "rgba(255,255,255,0.7)",
      accent: "#E21F26",
      accentAlt: "#0EC8C5",
      surfaceBg: "#FAFAFA",
      surfaceBorder: "rgba(0,0,0,0.1)",
      bodyText: "#000000",
      mutedText: "#787878",
    },
    hero: {
      breadcrumb: "Services > Performance, Distribution & Demand.",
      titleLines: ["Performance,", "Distribution &", "Demand"],
      layout: "centered",
      backgroundVideo: "/services/service-hero-video.mp4",
      overlay:
        "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(226,31,38,0.88) 100%)",
      quoteText: "\u201cWe need a system, not more agencies.\u201d",
      quoteColor: "#1BB9B4",
      body: [
        "These are familiar conversations.",
        "What they\u2019re really asking for is <strong>creative that performs without burning out.</strong>",
      ],
      ctaLabel: "Inquire Now",
      ctaHref: "/contact",
      ctaVariant: "light",
      arrowSrc: "/figma/services/arrow2.svg",
    },
    sections: [
      {
        type: "realBrief",
        eyebrow: "The Real Brief",
        heading: "What brands are actually asking for.",
        description: "Behind all of this language is one common need:",
        list: [
          {
            accent: "accent",
            text: "<strong>A distribution system,</strong> not disconnected channels",
          },
          {
            accent: "alt",
            text: "Performance that builds <strong>authority,</strong> not just traffic",
          },
          {
            accent: "accent",
            text: "Growth that is <strong>predictable</strong>, not experimental every month",
          },
          {
            accent: "alt",
            text: "SEO, paid, PR, and UGC <strong>working together,</strong> not in silos",
          },
          {
            accent: "accent",
            text: "Decisions driven by <strong>data and context</strong>, not assumptions",
          },
        ],
        highlightText:
          'This is where fragmented execution fails, and where <span style="color:#E21F26">systems win.</span>',
      },
      {
        type: "featureGrid",
        eyebrow: "The System",
        headingLines: [
          'Where <span style="color:#E21F26">growth</span> is',
          'engineered, not assumed<span style="color:#0EC8C5">.</span>',
        ],
        description: "Channels should compound \u2014 not compete with each other.",
        cards: [
          {
            iconSrc: "/figma/services/pdd-organic-visibility.svg",
            title: "Organic Visibility",
            description:
              "SEO, AEO & GEO working as a unified discoverability engine \u2014 not isolated keyword plays.",
          },
          {
            iconSrc: "/figma/services/pdd-paid-performance.svg",
            title: "Paid Performance",
            description:
              "Precision-driven media buying governed by data intelligence and attribution modelling.",
          },
          {
            iconSrc: "/figma/services/pdd-digital-pr.svg",
            title: "Digital PR",
            description:
              "Authority-building through earned media, strategic placements, and narrative-led distribution.",
          },
          {
            iconSrc: "/figma/services/pdd-ugc-influencer.svg",
            title: "UGC & Influencer Conversion",
            description:
              "Creator-led content designed for conversion, not just reach \u2014 with full attribution governance.",
          },
        ],
      },
      {
        type: "scope",
        eyebrow: "Scope",
        heading: 'What this includes<span style="color:#0EC8C5">.</span>',
        items: [
          {
            title: "SEO, AEO & GEO",
            description:
              "Search engine optimisation, answer engine optimisation, and generative engine optimisation, unified discoverability.",
            imageSrc: "/figma/services/scope-seo.jpg",
          },
          {
            title: "Paid Media",
            description:
              "Performance media buying across search, social, and programmatic, governed by attribution and ROI frameworks.",
            imageSrc: "/figma/services/scope-paid.jpg",
          },
          {
            title: "UGC",
            description:
              "User-generated content strategy and production, creator-led assets built for conversion and brand alignment.",
            imageSrc: "/figma/services/scope-ugc.jpg",
          },
          {
            title: "Digital PR",
            description:
              "Earned media, authority placements, and strategic narrative distribution, building trust at scale.",
            imageSrc: "/figma/services/scope-pr.jpg",
          },
          {
            title: "ORM",
            description:
              "Online reputation management, monitoring, response frameworks, and brand perception governance.",
            imageSrc: "/figma/services/scope-orm.jpg",
          },
        ],
      },
      {
        type: "caseStudy",
        heading:
          'How this shows up in the real world<span style="color:#0EC8C5">.</span>',
        ctaLabel: "View Case Study",
        ctaHref: "/case-studies",
        cards: [
          {
            imageSrc: "/case/c1.webp",
            title: 'Advent <span style="color:#E21F26">Global</span>',
            description:
              "Transforming Legacy ( more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
            tag: "IT & ITES",
            href: "/case-studies/advent-global",
          },
        ],
      },
    ],
    cta: {
      heading: "Inquire Now",
      buttonLabel: "Inquire Now",
      buttonHref: "/contact",
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 2. Content, Culture & Media Creation
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "ccmc",
    slug: "ui-ux-design",
    title: "Content, Culture & Media Creation.",
    metaTitle: "Content, Culture & Media Creation | Digitally Next",
    metaDescription:
      "Content systems that travel across formats, platforms, and teams — without losing meaning.",
    theme: {
      heroBg: "#0A0A0A",
      heroText: "#FFFFFF",
      heroMutedText: "rgba(255,255,255,0.7)",
      accent: "#E21F26",
      accentAlt: "#0EC8C5",
      surfaceBg: "#FAFAFA",
      surfaceBorder: "rgba(0,0,0,0.1)",
      bodyText: "#000000",
      mutedText: "#787878",
    },
    hero: {
      breadcrumb: "Services > Content, Culture & Media Creation",
      titleLines: ["Content, Culture", "& Media Creation."],
      layout: "stacked",
      backgroundVideo: "/services/service-hero-video.mp4",
      overlay:
        "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(14,200,197,0.85) 100%)",
      subtitle: "Where stories are crafted to endure platforms and trends",
      quoteLead: "We often see brands say things like this",
      quoteText:
        "\u201cWe need content, but not just posts \u2014 a real content strategy.\u201d",
      quoteColor: "#000",
      body: [
        "These are familiar conversations.",
        "They\u2019re also where most content efforts quietly start to lose direction.",
        "What they\u2019re really asking for is <strong>scale without loss of identity.</strong>",
      ],
      ctaLabel: "Inquire Now",
      ctaHref: "/contact",
      ctaVariant: "light",
      arrowSrc: "/figma/services/arrow1.svg",
    },
    sections: [
      {
        type: "realBrief",
        eyebrow: "The Real Brief",
        heading: "What brands are actually asking for.",
        description:
          "Behind these asks is a common problem:\n\nWhat brands need isn\u2019t more content.\nThey need content systems.",
        list: [
          {
            accent: "accent",
            text: "Content is created faster than it\u2019s being thought through",
          },
          {
            accent: "alt",
            text: "Formats change, but meaning doesn\u2019t travel",
          },
          {
            accent: "accent",
            text: "Output increases, but narrative weakens",
          },
          {
            accent: "alt",
            text: "Teams create assets, but systems are missing",
          },
        ],
        highlightText:
          'What brands need isn\u2019t more content. They need <span style="color:#E21F26">content systems.</span>',
      },
      {
        type: "featureGrid",
        eyebrow: "Content, Culture & Media Creation",
        headingLines: [
          'Where <span style="color:#E21F26">stories</span> are crafted',
          'to endure platforms and trends<span style="color:#0EC8C5">.</span>',
        ],
        description:
          "At Digitally Next, content is not treated as output.\n\nIt\u2019s treated as <strong>infrastructure.</strong>\nWe design <strong>high-impact content systems</strong> that allow stories to:",
        cards: [
          {
            iconSrc: "/figma/services/ccmc-travel.svg",
            title: "Travel across formats",
            description:
              "SEO, AEO & GEO working as a unified discoverability engine \u2014 not isolated keyword plays.",
          },
          {
            iconSrc: "/figma/services/ccmc-adapt.svg",
            title: "Adapt across platforms",
            description:
              "Precision-driven media buying governed by data intelligence and attribution modelling.",
          },
          {
            iconSrc: "/figma/services/ccmc-scale.svg",
            title: "Scale across teams",
            description:
              "Authority-building through earned media, strategic placements, and narrative-led distribution.",
          },
        ],
        footerText: "Without losing meaning, tone, or quality.",
      },
      {
        type: "scope",
        eyebrow: "Scope",
        heading: 'What this includes<span style="color:#0EC8C5">.</span>',
        description: "Depending on the brand and context, this typically spans:",
        items: [
          {
            title: "SEO, AEO & GEO",
            description:
              "Search engine optimisation, answer engine optimisation, and generative engine optimisation, unified discoverability.",
            imageSrc: "/figma/services/scope-seo.jpg",
          },
          {
            title: "Video & visual production",
            description: "(short-form, long-form, campaign-led)",
            imageSrc: "/figma/services/scope-video.jpg",
          },
          {
            title: "Podcast production",
            description: "(end-to-end) \u2013 from concept to distribution",
            imageSrc: "/figma/services/scope-podcast.jpg",
          },
          {
            title: "UGC programs",
            description: "designed for scale and performance",
            imageSrc: "/figma/services/scope-ugc.jpg",
          },
          {
            title: "Social content systems",
            description: "across platforms",
            imageSrc: "/figma/services/scope-social.jpg",
          },
          {
            title: "Creative asset libraries",
            description: "built for reuse and consistency",
            imageSrc: "/figma/services/scope-assets.jpg",
          },
        ],
      },
      {
        type: "caseStudy",
        heading:
          'How this shows up in the real world<span style="color:#0EC8C5">.</span>',
        ctaLabel: "View Case Study",
        ctaHref: "/case-studies",
        cards: [
          {
            imageSrc: "/figma/case-studies/advent-global.jpg",
            title: 'Advent <span style="color:#E21F26">Global</span>',
            description:
              "Transforming Legacy ( more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
            tag: "IT & ITES",
            href: "/case-studies/advent-global",
          },
        ],
      },
    ],
    cta: {
      heading: "Inquire Now",
      buttonLabel: "Inquire Now",
      buttonHref: "/contact",
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 3. Platforms, Web & Digital Experience
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: "pwde",
    slug: "web-development",
    title: "Platforms, Web & Digital Experience.",
    metaTitle: "Platforms, Web & Digital Experience | Digitally Next",
    metaDescription:
      "Conversion-focused digital platforms built as infrastructure — designed to evolve, integrate, and scale.",
    theme: {
      heroBg: "#0A0A0A",
      heroText: "#FFFFFF",
      heroMutedText: "#C9C9C9",
      accent: "#E21F26",
      accentAlt: "#0EC8C5",
      surfaceBg: "#FAFAFA",
      surfaceBorder: "rgba(0,0,0,0.1)",
      bodyText: "#000000",
      mutedText: "#787878",
    },
    hero: {
      breadcrumb: "Services > Platforms, Web & Digital Experience.",
      titleLines: ["Platforms, Web &", "Digital Experience."],
      layout: "stacked",
      overlay:
        "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)",
      subtitle: "Where digital foundations are built for scale",
      quoteLead: "We often see brands say things like this",
      quoteText:
        "\u201cLooking for a reliable website development partner \u2014 not just a one-time build.\u201d",
      quoteColor: "#1BB9B4",
      body: [
        "These are familiar asks.",
        "What they\u2019re really asking for is <strong>a system, not a site.</strong>",
        "What they\u2019re really asking for is <strong>commerce built with intent, not templates.</strong>",
      ],
      ctaLabel: "Inquire Now",
      ctaHref: "/contact",
      ctaVariant: "light",
    },
    sections: [
      {
        type: "realBrief",
        eyebrow: "The Real Brief",
        heading: "What brands are actually asking for.",
        description:
          "Behind these requests is a clear pattern:\n\nWhat brands need isn\u2019t more content.\nThey need content systems.",
        list: [
          {
            accent: "accent",
            text: "Websites are treated as projects, not products",
          },
          {
            accent: "alt",
            text: "UX is designed without conversion logic",
          },
          {
            accent: "accent",
            text: "Performance teams are limited by poor foundations",
          },
          {
            accent: "alt",
            text: "Data exists, but decisions aren\u2019t trusted",
          },
          {
            accent: "accent",
            text: "Platforms scale traffic, but not experience",
          },
        ],
        highlightText:
          'What brands really need are <span style="color:#E21F26">digital foundations</span> built to grow with them.',
      },
      {
        type: "featureGrid",
        eyebrow: "Platforms, Web & Digital Experience",
        headingLines: [
          "Where digital foundations",
          'are built for scale<span style="color:#0EC8C5">.</span>',
        ],
        description:
          "At Digitally Next, websites are not deliverables.\n\nThey\u2019re infrastructure.\n\nWe design and build robust, conversion-focused digital platforms that:",
        cards: [
          {
            iconSrc: "/figma/services/pwde-growth.svg",
            title: "Support Growth & Performance",
            description:
              "Built to enable measurable growth \u2014 aligning systems, strategy, and execution to drive sustained performance outcomes.",
          },
          {
            iconSrc: "/figma/services/pwde-integration.svg",
            title: "Seamless Marketing Integration",
            description:
              "Designed to integrate effortlessly with your existing marketing stack, ensuring data continuity, automation, and operational efficiency.",
          },
          {
            iconSrc: "/figma/services/pwde-evolve.svg",
            title: "Built to Evolve",
            description:
              "Architected for adaptability, allowing your systems and processes to scale and evolve without structural breakdowns.",
          },
          {
            iconSrc: "/figma/services/pwde-reliability.svg",
            title: "Reliability Over Quick Fixes",
            description:
              "Focused on long-term stability and performance integrity, prioritising dependable frameworks over temporary tactical wins.",
          },
        ],
        footerText:
          "From brand sites to high-traffic platforms to D2C commerce ecosystems.",
      },
      {
        type: "scope",
        eyebrow: "Scope",
        heading: 'What this includes<span style="color:#0EC8C5">.</span>',
        description: "Depending on the brand and context, this typically spans:",
        items: [
          {
            title: "Brand & Marketing Websites",
            description:
              "High-performance sites built for brand authority, lead generation, and conversion \u2014 not just aesthetics.",
            imageSrc: "/figma/services/scope-brand-site.jpg",
          },
          {
            title: "E-commerce & D2C Platforms",
            description:
              "Full-stack commerce ecosystems built for scale \u2014 with attribution, inventory, and CX built in from day one.",
            imageSrc: "/figma/services/scope-ecommerce.jpg",
          },
          {
            title: "Web Applications",
            description:
              "Custom web apps and dashboards designed for operational efficiency, user retention, and data visibility.",
            imageSrc: "/figma/services/scope-webapp.jpg",
          },
          {
            title: "CMS & Headless Architecture",
            description:
              "Flexible, scalable content infrastructure that lets your teams move fast without breaking structure.",
            imageSrc: "/figma/services/scope-cms.jpg",
          },
          {
            title: "Analytics & Conversion Optimisation",
            description:
              "Data pipelines, heatmaps, A/B frameworks, and CRO strategies that turn traffic into measurable outcomes.",
            imageSrc: "/figma/services/scope-analytics.jpg",
          },
        ],
      },
      {
        type: "caseStudy",
        heading:
          'How this shows up in the real world<span style="color:#0EC8C5">.</span>',
        ctaLabel: "View Case Study",
        ctaHref: "/case-studies",
        cards: [
          {
            imageSrc: "/figma/case-studies/advent-global.jpg",
            title: 'Advent <span style="color:#E21F26">Global</span>',
            description:
              "Transforming Legacy ( more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
            tag: "IT & ITES",
            href: "/case-studies/advent-global",
          },
        ],
      },
    ],
    cta: {
      heading: "Inquire Now",
      buttonLabel: "Inquire Now",
      buttonHref: "/contact",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}
