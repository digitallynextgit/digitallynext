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
  title: string;
  description: string;
  tag: string;
  href?: string;
};

export type ServiceYourAsk = {
  eyebrow?: string;
  lines: string[];
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  arrowSrc?: string;
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
    footerText?: string;
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
  media: string;
  sliderText: string;
  metaTitle: string;
  metaDescription: string;
  theme: ServiceTheme;
  hero: ServiceHeroSection;
  yourAsk: ServiceYourAsk;
  sections: ServiceSection[];
  cta: ServiceCTA;
};

// ─── Data ────────────────────────────────────────────────────────────────────

export const services: ServiceDetail[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. Strategy, Brand & Growth Intelligence
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "sbgi",
    slug: "brand-strategy",
    title: "Strategy, Brand & Growth Intelligence.",
    media: "/home/service1.png",
    sliderText:
      "D2C market entry & growth strategy · Brand & digital strategy · Positioning & GTM · Market & audience intelligence · Founder & niche authority strategy · Community & ecosystem strategy",
    metaTitle: "Strategy, Brand & Growth Intelligence | Digitally Next",
    metaDescription:
      "Where direction is defined before execution begins — authority-led growth strategy for D2C, B2B, and niche markets.",
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
      breadcrumb: "Services > Strategy, Brand & Growth Intelligence",
      titleLines: ["Strategy, Brand &", "Growth Intelligence."],
      layout: "stacked",
      backgroundVideo: "/services/service-hero-video.mp4",
      overlay:
        "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(226,31,38,0.88) 100%)",
      subtitle: "Where direction is defined before execution begins",
      quoteLead: "We often see brands say things like this",
      quoteText: "\u201cWe want D2C scale without becoming discount-led.\u201d",
      quoteColor: "#1BB9B4",
      body: [
        "These are not marketing requests.",
        "What they\u2019re really asking for is <strong>authority-led growth, not volume.</strong>",
      ],
      ctaLabel: "Inquire Now",
      ctaHref: "/contact",
      ctaVariant: "light",
      arrowSrc: "/figma/services/arrow2.svg",
    },
    yourAsk: {
      eyebrow: "If this sounds like your ask",
      lines: [
        "Entering a competitive <strong>D2C market</strong>",
        "Launching a new <strong>B2B or niche vertical</strong>",
        "Planning <strong>PR- and influence-led</strong> growth",
        "Or <strong>seeking AI-enabled</stromg> strategy without generic outputs"
      ],
      description:
        "Then Strategy, Brand & Growth Intelligence at DigitallyNext is built for you.",
      ctaLabel: "Get In Touch",
      ctaHref: "/contact",
      arrowSrc: "/figma/services/arrow2.svg",
    },
    sections: [
      {
        type: "realBrief",
        eyebrow: "The Real Brief",
        heading: "What brands are actually asking for",
        description: "Across D2C and B2B, the underlying needs are clear:",
        list: [
          { accent: "accent", text: "A <strong>clear market and audience</strong> definition" },
          { accent: "alt", text: "Sharp <strong>positioning</strong> that doesn\u2019t<br> collapse under competition" },
          { accent: "accent", text: "A <strong>growth path</strong> that matches<br> the business model" },
          { accent: "alt", text: "<strong>Strategic clarity</strong> before money<br> is spent on execution" },
          { accent: "accent", text: "Confidence that decisions<br> are <strong>informed, not fashionable</strong>" },
        ],
        highlightText:
          'What brands need isn\u2019t more frameworks. They need <span style="color:#E21F26">direction they can trust.</span>',
      },
      {
        type: "featureGrid",
        eyebrow: "Strategy, Brand & Growth Intelligence",
        headingLines: [
          'Where <span style="color:#0EC8C5">direction is defined</span>',
          'before execution begins<span style="color:#E21F26">.</span>',
        ],
        description:
          "At Digitally Next, strategy is not a presentation.\nIt\u2019s a decision-making layer.\n\n<strong>We help brands:</strong>",
        cards: [
          {
            iconSrc: "/services/icon1.png",
            title: "Enter Markets with Clarity",
            description:
              "Launch B2B Verticals with Credibility. Strategically enter new markets, especially D2C, with defined positioning, audience intelligence, and a clear path to revenue.",
          },
          {
            iconSrc: "/services/icon2.png",
            title: "Launch B2B Verticals with Credibility",
            description:
              "Establish authority from day one, aligning narrative, proof, and go-to-market frameworks to build trust at scale.",
          },
          {
            iconSrc: "/services/icon3.png",
            title: "Define Positioning Before Scaling Spend",
            description:
              "Clarify category stance, value proposition, and differentiation \u2014 ensuring media investment amplifies a strong strategic foundation.",
          },
          {
            iconSrc: "/services/icon4.png",
            title: "Align Brand, Content, Performance & Platforms",
            description:
              "Unify storytelling, distribution, and technology \u2014 creating an integrated growth engine rather than siloed execution.",
          },
          {
            iconSrc: "/services/icon5.png",
            title: "Scale across teams",
            description:
              "Authority-building through earned media, strategic placements, and narrative-led distribution.",
          },
        ],
        footerText:
          "So that every action that follows is intentional, aligned, and scalable.",
      },
      {
        type: "scope",
        eyebrow: "Scope",
        heading: 'What this includes<span style="color:#0EC8C5">.</span>',
        description:
          "Depending on the business model and stage, this typically spans:",
        items: [
          {
            title: "D2C Market Entry & Growth Strategy",
            description:
              "End-to-end go-to-market and growth frameworks, spanning validation, positioning, acquisition, retention, and scalable performance.",
            imageSrc: "/services/ss1.png",
          },
          {
            title: "Brand & Digital Strategy",
            description:
              "Business-aligned brand and digital architecture \u2014 ensuring narrative, platforms, and performance drive measurable outcomes.",
            imageSrc: "/services/ss2.png",
          },
          {
            title: "Positioning & GTM Frameworks",
            description:
              "Category definition, value proposition clarity, and structured go-to-market systems \u2014 across both D2C and B2B models.",
            imageSrc: "/services/ss3.png",
          },
          {
            title: "Market & Audience Intelligence",
            description:
              "Human insight layered with AI-assisted analysis \u2014 informing segmentation, demand mapping, and strategic decision-making.",
            imageSrc: "/services/ss4.png",
          },
          {
            title: "Founder & Niche Authority Strategy",
            description:
              "Leadership positioning, thought capital development, and narrative systems \u2014 building durable authority within defined categories.",
            imageSrc: "/services/ss5.png",
          },
          {
            title: "Community & Ecosystem Strategy",
            description:
              "Structured community design and partnership ecosystems, strengthening retention, advocacy, and long-term brand equity.",
            imageSrc: "/services/ss6.png",
          },
        ],
        footerText:
          'Some strategies lead to execution.\n\nSome exist to <strong>prevent expensive mistakes</strong>\n\nBoth are valuable.',
      },
      {
        type: "caseStudy",
        heading: 'How this shows up in the real world<span style="color:#0EC8C5">.</span>',
        ctaLabel: "View Case Study",
        ctaHref: "/case-studies",
        cards: [
          {
            imageSrc: "/case/c3.webp",
            title: "Advent Global",
            description:
              "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
            tag: "IT & ITES",
            href: "/case-studies/neotech-genomics",
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

  // ─────────────────────────────────────────────────────────────────────────
  // 2. Content, Culture & Media Creation
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ccmc",
    slug: "ui-ux-design",
    title: "Content, Culture & Media Creation.",
    media: "/home/service2.png",
    sliderText:
      "Content strategy · Video & visual production · Podcast production · UGC programs · Social content systems · Creative asset libraries",
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
      backgroundVideo: "/home/service2.mp4",
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
    yourAsk: {
      eyebrow: "If this sounds like your ask",
      lines: [
        "Content that builds <strong>recall</strong>, not just reach",
        "Media that <strong>compounds</strong> over time",
        "Systems that <strong>scale creativity</strong> without chaos",
      ],
      description:
        "Then Content, Culture & Media Creation at Digitally Next is built for you.",
      ctaLabel: "Get In Touch",
      ctaHref: "/contact",
      arrowSrc: "/figma/services/arrow1.svg",
    },
    sections: [
      {
        type: "realBrief",
        eyebrow: "The Real Brief",
        heading: "What brands are actually asking for",
        description:
          "Behind these asks is a common problem:\n\nWhat brands need isn\u2019t more content.\nThey need content systems.",
        list: [
          { accent: "accent", text: "Content is <strong>created faster</strong> than<br> it\u2019s being thought through" },
          { accent: "alt", text: "<strong>Formats change</strong>, but<br> meaning doesn\u2019t travel" },
          { accent: "accent", text: "<strong>Output increases</strong>,<br> but narrative weakens" },
          { accent: "alt", text: "Teams create <strong>assets</strong>,<br> but systems are missing" },
        ],
        highlightText:
          'What brands need isn\u2019t more content. They need <span style="color:#0EC8C5">content systems.</span>',
      },
      {
        type: "featureGrid",
        eyebrow: "Content, Culture & Media Creation",
        headingLines: [
          'Where <span style="color:#E21F26">stories</span> are crafted',
          'to endure <span style="font-weight:300">platforms and trends</span><span style="color:#0EC8C5">.</span>',
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
            imageSrc: "/services/ss7.png",
          },
          {
            title: "Video & visual production",
            description: "(short-form, long-form, campaign-led)",
            imageSrc: "/services/ss8.png",
          },
          {
            title: "Podcast production",
            description: "(end-to-end) \u2013 from concept to distribution",
            imageSrc: "/services/ss9.png",
          },
          {
            title: "UGC programs",
            description: "designed for scale and performance",
            imageSrc: "/services/ss10.png",
          },
          {
            title: "Social content systems",
            description: "across platforms",
            imageSrc: "/services/ss11.png",
          },
          {
            title: "Creative asset libraries",
            description: "built for reuse and consistency",
            imageSrc: "/services/ss12.png",
          },
        ],
      },
      {
        type: "caseStudy",
        heading: 'How this shows up in the real world<span style="color:#0EC8C5">.</span>',
        ctaLabel: "View Case Study",
        ctaHref: "/case-studies",
        cards: [
          {
            imageSrc: "/case/c3.webp",
            title: "Advent Global",
            description:
              "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
            tag: "IT & ITES",
            href: "/case-studies/neotech-genomics",
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

  // ─────────────────────────────────────────────────────────────────────────
  // 3. Performance, Distribution & Demand
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "pdd",
    slug: "seo-optimization",
    title: "Performance, Distribution & Demand.",
    media: "/home/service3.png",
    sliderText:
      "Brand & digital strategy · Positioning & GTM · Personal & founder branding · Community strategy · Podcast strategy & narrative design · Market & audience research",
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
      backgroundVideo: "/home/service3.mp4",
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
    yourAsk: {
      eyebrow: "If this sounds like your ask",
      lines: [
        "<strong>Growth</strong> without chaos",
        "<strong>Performance</strong> without brand erosion",
        "Distribution systems that <strong>scale</strong>",
      ],
      description:
        "We work best with teams that value structure, clarity, and long-term thinking. If you\u2019re building something meant to scale \u2013 let\u2019s talk.",
      ctaLabel: "Learn More",
      ctaHref: "/contact",
      arrowSrc: "/figma/services/arrow2.svg",
    },
    sections: [
      {
        type: "realBrief",
        eyebrow: "The Real Brief",
        heading: "What brands are actually asking for",
        description: "Behind all of this language is one common need:",
        list: [
          { accent: "accent", text: "<strong>A distribution system,<br></strong> not disconnected channels" },
          { accent: "alt", text: "Performance that builds <strong>authority,<br></strong> not just traffic" },
          { accent: "accent", text: "Growth that is <strong>predictable</strong>,<br> not experimental every month" },
          { accent: "alt", text: "SEO, paid, PR, and UGC<br> <strong>working together,</strong> not in silos" },
          { accent: "accent", text: "Decisions driven by <strong>data and<br> context</strong>, not assumptions" },
        ],
        highlightText:
          'This is where fragmented execution fails, and where <span style="color:#E21F26">systems win.</span>',
      },
      {
        type: "featureGrid",
        eyebrow: "The System",
        headingLines: [
          'Where <span style="color:#E21F26">growth</span> is',
          'engineered, <span style="font-weight:300; color:#787878;">not assumed</span><span style="color:#0EC8C5">.</span>',
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
            imageSrc: "/services/ss7.png",
          },
          {
            title: "Paid Media",
            description:
              "Performance media buying across search, social, and programmatic, governed by attribution and ROI frameworks.",
            imageSrc: "/services/ss13.png",
          },
          {
            title: "UGC",
            description:
              "User-generated content strategy and production, creator-led assets built for conversion and brand alignment.",
            imageSrc: "/services/ss4.png",
          },
          {
            title: "Digital PR",
            description:
              "Earned media, authority placements, and strategic narrative distribution, building trust at scale.",
            imageSrc: "/services/ss14.png",
          },
          {
            title: "ORM",
            description:
              "Online reputation management, monitoring, response frameworks, and brand perception governance.",
            imageSrc: "/services/ss15.png",
          },
        ],
      },
      {
        type: "caseStudy",
        heading: 'How this shows up in the real world<span style="color:#0EC8C5">.</span>',
        ctaLabel: "View Case Study",
        ctaHref: "/case-studies",
        cards: [
          {
            imageSrc: "/case/c3.webp",
            title: "Advent Global",
            description:
              "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
            tag: "IT & ITES",
            href: "/case-studies/neotech-genomics",
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

  // ─────────────────────────────────────────────────────────────────────────
  // 4. Platforms, Web & Digital Experience
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "pwde",
    slug: "web-development",
    title: "Platforms, Web & Digital Experience.",
    media: "/home/service4.png",
    sliderText:
      "Websites & landing experiences · UX & conversion design · Web applications · CMS & headless architecture · Analytics & CRO · E-commerce & D2C platforms",
    metaTitle: "Platforms, Web & Digital Experience | Digitally Next",
    metaDescription:
      "Conversion-focused digital platforms built as infrastructure — designed to evolve, integrate, and scale.",
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
      breadcrumb: "Services > Platforms, Web & Digital Experience.",
      titleLines: ["Platforms, Web &", "Digital Experience."],
      layout: "stacked",
      backgroundVideo: "/home/service4.mp4",
      overlay:
        "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(14,200,197,0.85) 100%)",
      subtitle: "Where digital foundations are built for scale",
      quoteLead: "We often see brands say things like this",
      quoteText:
        "\u201cLooking for a reliable website development partner \u2014 not just a one-time build.\u201d",
      quoteColor: "#000",
      body: [
        "These are familiar asks.",
        "What they\u2019re really asking for is <strong>a system, not a site.</strong>",
        "What they\u2019re really asking for is <strong>commerce built with intent, not templates.</strong>",
      ],
      ctaLabel: "Inquire Now",
      ctaHref: "/contact",
      ctaVariant: "light",
      arrowSrc: "/figma/services/arrow1.svg",
    },
    yourAsk: {
      eyebrow: "If this sounds like your ask",
      lines: [
        "A <strong style='font-weight:600'>web partner</strong>, not a one-off vendor",
        "Platforms that support <strong style='font-weight:600'>performance and scale</strong>",
        "D2C and brand <strong style='font-weight:600'>experiences</strong> that don’t feel generic",
        "<strong style='font-weight:600'>Systems</strong> that improve over time",
      ],
      description:
        "Then Platforms, Web & Digital Experience at Digitally Next is built for you.",
      ctaLabel: "Get In Touch",
      ctaHref: "/contact",
      arrowSrc: "/figma/services/arrow1.svg",
    },
    sections: [
      {
        type: "realBrief",
        eyebrow: "The Real Brief",
        heading: "What brands are actually asking for",
        description:
          "Behind these requests is a clear pattern:\n\nWhat brands need isn\u2019t more content.\nThey need content systems.",
        list: [
          { accent: "accent", text: "Websites are treated as <strong>projects</strong>,<br> not products" },
          { accent: "alt", text: "UX is <strong>designed</strong> without<br> conversion logic" },
          { accent: "accent", text: "Performance teams are <strong>limited</strong><br> by poor foundations" },
          { accent: "alt", text: "Data <strong>exists</strong>, but decisions<br> aren\u2019t trusted" },
          { accent: "accent", text: "Platforms <strong>scale traffic</strong>,<br> but not experience" },
        ],
        highlightText:
          'What brands really need are <span style="color:#0EC8C5">digital foundations</span> built to grow with them.',
      },
      {
        type: "featureGrid",
        eyebrow: "Platforms, Web & Digital Experience",
        headingLines: [
          "<span style='font-weight:400'>Where digital foundations</span>",
          '<span style="font-weight:400">are</span> built for <span style="color:#E21F26">scale</span><span style="color:#0EC8C5">.</span>',
        ],
        description:
          "At Digitally Next, websites are not deliverables.\n\nThey\u2019re infrastructure.\nWe design and build robust, conversion-focused digital platforms that:",
        cards: [
          {
            iconSrc: "/services/icon1.png",
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
            iconSrc: "/services/icon3.png",
            title: "Built to Evolve",
            description:
              "Architected for adaptability, allowing your systems and processes to scale and evolve without structural breakdowns.",
          },
          {
            iconSrc: "/services/icon4.png",
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
            title: "Websites & Landing Experiences",
            description:
              "Brand-led, performance-focused web experiences, spanning corporate sites, high-conversion landing pages, and D2C ecosystems.",
            imageSrc: "/figma/services/seo.svg",
          },
          {
            title: "UX & Conversion Design",
            description:
              "Behaviour- and intent-driven user experience design, structured to reduce friction and maximise measurable conversion.",
            imageSrc: "/figma/services/seo.svg",
          },
          {
            title: "Analytics & Tracking",
            description:
              "GA4 architecture, event tracking, funnel mapping, and custom dashboards, ensuring decision-making is governed by clean data.",
            imageSrc: "/figma/services/seo.svg",
          },
          {
            title: "CRM & Platform Integrations",
            description:
              "HubSpot and marketing stack integrations, connecting websites, automation systems, and CRM workflows seamlessly.",
            imageSrc: "/figma/services/seo.svg",
          },
          {
            title: "Performance Optimisation",
            description:
              "Speed, stability, and scalable infrastructure, engineered for long-term performance, not short-term patches.",
            imageSrc: "/figma/services/seo.svg",
          },
        ],
      },
      {
        type: "caseStudy",
        heading: 'How this shows up in the real world<span style="color:#0EC8C5">.</span>',
        ctaLabel: "View Case Study",
        ctaHref: "/case-studies",
        cards: [
          {
            imageSrc: "/case/c3.webp",
            title: "Advent Global",
            description:
              "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
            tag: "IT & ITES",
            href: "/case-studies/neotech-genomics",
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

  // ─────────────────────────────────────────────────────────────────────────
  // 5. AI Enablement & Decision Systems (ADAC-Powered)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "adac",
    slug: "ai-enablement",
    title: "AI Enablement & Decision Systems (ADAC-Powered).",
    media: "/home/service5.png",
    sliderText:
      "AI governance & decision frameworks · Branding AI enablement · Content AI acceleration · Performance AI optimization · Web & platform AI intelligence · ADAC-powered operations",
    metaTitle: "AI Enablement & Decision Systems (ADAC-Powered) | Digitally Next",
    metaDescription:
      "Intelligence without dilution — a governed AI practice that decides how, where, and why AI is applied across your digital work.",
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
      titleLines: ["AI Enablement &", "Decision Systems", "(ADAC-Powered)."],
      layout: "stacked",
      backgroundVideo: "/home/service5.mp4",
      overlay:
        "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(226,31,38,0.88) 100%)",
      subtitle: "",
      quoteLead: "We often see brands say things like this",
      quoteText:
        "\u201cEveryone is using AI \u2014 but outputs are starting to look the same.\u201d",
      quoteColor: "#1BB9B4",
      body: [
        "These aren\u2019t technology questions.",
        "They\u2019re decision and accountability questions.",
        "What they\u2019re really asking for is <strong>intelligence without dilution.</strong>",
      ],
      ctaLabel: "Inquire Now",
      ctaHref: "/contact",
      ctaVariant: "light",
      arrowSrc: "/figma/services/arrow2.svg",
    },
    yourAsk: {
      eyebrow: "If this sounds like your ask",
      lines: [
        "<strong>Exploring AI but wary of generic outputs</strong>",
        "<strong>Scaling digital work without wanting to lose judgment</strong>",
        "<strong>Looking for governance, not just automation</strong>",
      ],
      description:
        "We work best with teams that value structure, clarity, and long-term thinking. If you\u2019re building something meant to scale \u2013 let\u2019s talk.",
      ctaLabel: "Learn More",
      ctaHref: "/contact",
      arrowSrc: "/figma/services/arrow2.svg",
    },
    sections: [
      {
        type: "realBrief",
        eyebrow: "The Real Brief",
        heading: "What brands are actually asking for",
        description:
          "Across branding, content, performance, and platforms, the pattern is clear:",
        list: [
          { accent: "accent", text: "AI is powerful,<br> but <strong>undirected</strong>" },
          { accent: "alt", text: "Speed is increasing,<br> but <strong>clarity is dropping</strong>" },
          { accent: "accent", text: "Outputs scale,<br> but <strong>judgment risks eroding</strong>" },
          { accent: "alt", text: "Teams adopt tools,<br> but <strong>decision logic is missing</strong>" },
          { accent: "accent", text: "<strong>Accountability</strong> becomes<br> blurry" },
        ],
        highlightText:
          'What brands need isn\u2019t more AI tools. They need a <span style="color:#0EC8C5">system that decides how intelligence is applied.</span>',
      },
      {
        type: "featureGrid",
        eyebrow: "AI Enablement & Decision Systems",
        headingLines: [
          "<span style='font-weight:400'>How intelligence</span> <span style='color:#E21F26'>accelerates</span>",
          'everything we do',
        ],
        description:
          "At Digitally Next, AI is not treated as a capability.\n\nIt\u2019s treated as a <strong>governed layer.</strong>\nWe apply AI through a decision-first practice that determines:",
        cards: [
          {
            iconSrc: "/services/icon6.png",
            title: "Should AI Be Used Here?",
            description:
              "Evaluate where AI genuinely adds value, applying it intentionally rather than by default.",
          },
          {
            iconSrc: "/services/icon2.png",
            title: "Human Judgment as Governance",
            description:
              "Define the level of human oversight required, ensuring strategy, ethics, and contextual nuance remain intact.",
          },
          {
            iconSrc: "/services/icon7.png",
            title: "AI with Defined Outcomes",
            description:
              "Authority-building through earned media, strategic placements, and narrative-led distribution.",
          },
        ],
      },
      {
        type: "scope",
        eyebrow: "Scope",
        heading: 'How this is applied<span style="color:#0EC8C5">.</span>',
        description: "AI enablement at DigitallyNext cuts across:",
        items: [
          {
            title: "Branding",
            description:
              "Research support, insight mining, and positioning inputs \u2014 strengthening strategic foundations with AI-assisted intelligence.",
            imageSrc: "/figma/services/seo.svg",
          },
          {
            title: "Content",
            description:
              "Ideation acceleration, drafting support, variation generation, and structured testing \u2014 enhancing creative throughput without diluting narrative quality.",
            imageSrc: "/figma/services/seo.svg",
          },
          {
            title: "Performance",
            description:
              "Data analysis, signal detection, and optimisation support \u2014 augmenting human decision-making with pattern recognition and predictive insight.",
            imageSrc: "/figma/services/seo.svg",
          },
          {
            title: "Web & Platforms",
            description:
              "Quality assurance, technical optimisation, and performance intelligence \u2014 improving stability, speed, and measurable digital outcomes.",
            imageSrc: "/figma/services/seo.svg",
          },
        ],
      },
      {
        type: "caseStudy",
        heading: 'How this shows up in the real world<span style="color:#0EC8C5">.</span>',
        ctaLabel: "View Case Study",
        ctaHref: "/case-studies",
        cards: [
          {
            imageSrc: "/case/c3.webp",
            title: "Advent Global",
            description:
              "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
            tag: "IT & ITES",
            href: "/case-studies/neotech-genomics",
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
