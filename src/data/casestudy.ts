export type CaseStudyMetric = {
  value: string;
  description: string;
  color: string;
  background: string;
};

export type CaseStudyAboutField = {
  label: string;
  value: string;
};

export type CaseStudyApproachCard = {
  iconSrc: string;
  label: string;
};

export type CaseStudyFocusCard = {
  title: string;
  description: string;
};

export type CaseStudyFlowingMenuItem = {
  link: string;
  text: string;
  image: string;
};

export type CaseStudyRelatedCard = {
  imageSrc: string;
  title: string;
  description: string;
  tag: string;
  href: string;
};

export type CaseStudyCTA = {
  backgroundImageSrc: string;
  headingLines: string[];
  bodyLines: string[];
  buttonLabel: string;
  buttonHref: string;
};

export type CaseStudyDetail = {
  theme: "light" | "dark";
  hero: {
    eyebrow: string;
    title: string;
    heroImageSrc: string;
    metrics: CaseStudyMetric[];
  };
  about: {
    logoSrc: string;
    quote: string;
    fields: CaseStudyAboutField[];
  };
  intro: string;
  objective: {
    heading: string;
    body: string;
  };
  approach: {
    heading: string;
    body: string;
    cards: CaseStudyApproachCard[];
  };
  focusArea: {
    heading: string;
    body: string;
    cards: CaseStudyFocusCard[];
  };
  strategicMarketing: {
    headingPrefix: string;
    headingHighlight: string;
    menuItems: CaseStudyFlowingMenuItem[];
  };
  coreDigitalAssets: {
    headingPrefix: string;
    headingHighlight: string;
    subheading: string;
    items: string[];
  };
  otherTeams: {
    heading: string;
    linkLabel: string;
    linkHref: string;
  };
  relatedCaseStudies: CaseStudyRelatedCard[];
  cta: CaseStudyCTA;
};

export type CaseStudyListing = {
  introText: string;
  title: string;
  imageSrc: string;
  caption: string;
  buttonLabel: string;
  pillLabel?: string;
};

export type CaseStudy = {
  id: number;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  listing: CaseStudyListing;
  detail: CaseStudyDetail;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: "signia",
    metaTitle: "Signia Case Study | Digitally Next",
    metaDescription:
      "Digital campaign on a social cause for a world leader in wearable hearing devices.",
    listing: {
      introText:
        "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
      title: "Signia",
      imageSrc: "/case/c4.webp",
      caption:
        "Digital Campaign on Social Cause for a world leader in wearable hearing devices",
      buttonLabel: "View Case Study",
      pillLabel: "Hearing Aids",
    },
    detail: {
      theme: "light",
      hero: {
        eyebrow: "SIGNIA",
        title:
          "Digital campaign on a social cause for a world leader in wearable hearing devices",
        heroImageSrc: "/case/c4.webp",
        metrics: [
          {
            value: "400%",
            description: "times more Media\nRecognition",
            color: "#E21F26",
            background: "rgba(226,31,38,0.05)",
          },
          {
            value: "30%",
            description: "increase in revenues from a disruptive",
            color: "#0EC8C5",
            background: "rgba(14,200,197,0.05)",
          },
        ],
      },
      about: {
        logoSrc: "/figma/case-study/about-logo.png",
        quote:
          "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat._\"",
        fields: [
          { label: "Industry", value: "Healthcare" },
          { label: "Category", value: "Hearing Aids-Accessories- Software" },
          { label: "Region", value: "India" },
        ],
      },
      intro:
        "Breaking the social taboo to create a high level of awareness where the client is a flag bearer in the bringing the change.",
      objective: {
        heading: "Objective Goal.",
        body:
          "Build a Movement along with strong brand recall and enhanced media attention including global social councils. All from Digital replacing TV spend.",
      },
      approach: {
        heading: "Approach.",
        body: "Mix of Strategy",
        cards: [
          {
            iconSrc: "/figma/case-study/icon-cloud-lightning.svg",
            label: "Functional",
          },
          {
            iconSrc: "/figma/case-study/icon-trending-up.svg",
            label: "Operational pursuits",
          },
        ],
      },
      focusArea: {
        heading: "Focus Area.",
        body:
          "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat._\"",
        cards: [
          { title: "Social Media", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
          { title: "Digital PR", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
          { title: "Thought Leadership", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
          { title: "Industry Association", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        ],
      },
      strategicMarketing: {
        headingPrefix: "Strategic Marketing",
        headingHighlight: "Support",
        menuItems: [
          { link: "#", text: "Mojave", image: "https://picsum.photos/600/400?random=1" },
          { link: "#", text: "Sonoma", image: "https://picsum.photos/600/400?random=2" },
          { link: "#", text: "Monterey", image: "https://picsum.photos/600/400?random=3" },
          { link: "#", text: "Sequoia", image: "https://picsum.photos/600/400?random=4" },
        ],
      },
      coreDigitalAssets: {
        headingPrefix: "Digital",
        headingHighlight: "Assets",
        subheading:
          "All frameworks are powered by Modern DAD thinking and governed by the AI Decision & Acceleration Center.",
        items: [
          "Microsite",
          "Engagement Promotional Assets",
          "Item 3",
          "Item 4",
          "Item 5",
          "Item 6",
          "Item 7",
          "Item 8",
          "Item 9",
        ],
      },
      otherTeams: {
        heading: "See how other teams are\nwinning with Digitally Next.",
        linkLabel: "Case Studies",
        linkHref: "/case-studies",
      },
      relatedCaseStudies: [
        {
          imageSrc: "/figma/case-study/advent-case-study-69de24.png",
          title: "Advent Global",
          description:
            "Transforming Legacy ( more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
          tag: "IT & ITES",
          href: "/case-studies/advent-global",
        },
      ],
      cta: {
        backgroundImageSrc: "/figma/case-study/cta-bg-4ff61d.png",
        headingLines: ["Let's Build Something", "That Lasts."],
        bodyLines: [
          "We work best with teams that value structure, clarity, and long-term thinking.",
          "",
          "If you're looking for shortcuts, quick hacks, or transactional execution, we may not be the right fit.",
          "",
          "If you're building something meant to scale, let's talk.",
        ],
        buttonLabel: "Get In Touch",
        buttonHref: "/contact",
      },
    },
  },
  {
    id: 2,
    slug: "advent-global",
    metaTitle: "Advent Global Case Study | Digitally Next",
    metaDescription:
      "Transforming a legacy organization brand image to new-age positioning.",
    listing: {
      introText:
        "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
      title: "Advent Global",
      imageSrc: "/figma/case-study/advent-case-study-69de24.png",
      caption:
        "Transforming legacy brand image to new-age evolved brand positioning.",
      buttonLabel: "View Case Study",
      pillLabel: "IT & ITES",
    },
    detail: {
      theme: "light",
      hero: {
        eyebrow: "ADVENT GLOBAL",
        title: "Transforming legacy brand image to new-age evolved brand positioning",
        heroImageSrc: "/figma/case-study/advent-case-study-69de24.png",
        metrics: [
          {
            value: "3+",
            description: "decades of legacy\nrepositioned",
            color: "#E21F26",
            background: "rgba(226,31,38,0.05)",
          },
          {
            value: "1",
            description: "unified brand\nsystem",
            color: "#0EC8C5",
            background: "rgba(14,200,197,0.05)",
          },
        ],
      },
      about: {
        logoSrc: "/figma/case-study/about-logo.png",
        quote:
          "\"A legacy business needed a modern narrative and a stronger digital footprint to match where the market was heading._\"",
        fields: [
          { label: "Industry", value: "IT & ITES" },
          { label: "Category", value: "Services" },
          { label: "Region", value: "India" },
        ],
      },
      intro:
        "A transformation project that aligned positioning, communication, and digital systems to reflect a new era for the brand.",
      objective: {
        heading: "Objective Goal.",
        body:
          "Modernize brand perception and improve inbound visibility through a coherent positioning system across channels.",
      },
      approach: {
        heading: "Approach.",
        body: "Strategy + creative system + distribution",
        cards: [
          {
            iconSrc: "/figma/case-study/icon-cloud-lightning.svg",
            label: "Narrative & positioning",
          },
          {
            iconSrc: "/figma/case-study/icon-trending-up.svg",
            label: "Performance distribution",
          },
        ],
      },
      focusArea: {
        heading: "Focus Area.",
        body:
          "A system-first rollout across brand, web experience, and distribution to create consistency and trust.",
        cards: [
          { title: "Brand Strategy", description: "Clear positioning and messaging architecture." },
          { title: "Digital Experience", description: "Improved UX and conversion paths." },
          { title: "Distribution", description: "Channel coherence and repeatable assets." },
          { title: "Authority", description: "Visibility through trust-building narratives." },
        ],
      },
      strategicMarketing: {
        headingPrefix: "Strategic Marketing",
        headingHighlight: "Support",
        menuItems: [
          { link: "#", text: "Strategy", image: "https://picsum.photos/600/400?random=11" },
          { link: "#", text: "Creative", image: "https://picsum.photos/600/400?random=12" },
          { link: "#", text: "Distribution", image: "https://picsum.photos/600/400?random=13" },
          { link: "#", text: "Measurement", image: "https://picsum.photos/600/400?random=14" },
        ],
      },
      coreDigitalAssets: {
        headingPrefix: "Digital",
        headingHighlight: "Assets",
        subheading:
          "A reusable set of assets that keep messaging consistent and scalable across teams.",
        items: [
          "Brand story narrative",
          "Website experience",
          "Campaign landing pages",
          "Core creative templates",
          "Social content toolkit",
        ],
      },
      otherTeams: {
        heading: "See how other teams are\nwinning with Digitally Next.",
        linkLabel: "Case Studies",
        linkHref: "/case-studies",
      },
      relatedCaseStudies: [
        {
          imageSrc: "/case/c4.webp",
          title: "Signia",
          description:
            "Digital Campaign on Social Cause for a world leader in wearable hearing devices",
          tag: "Hearing Aids",
          href: "/case-studies/signia",
        },
      ],
      cta: {
        backgroundImageSrc: "/figma/case-study/cta-bg-4ff61d.png",
        headingLines: ["Let's Build Something", "That Lasts."],
        bodyLines: [
          "We work best with teams that value structure, clarity, and long-term thinking.",
          "",
          "If you're building something meant to scale, let's talk.",
        ],
        buttonLabel: "Get In Touch",
        buttonHref: "/contact",
      },
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
