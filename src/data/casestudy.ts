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
    slug: "neotech",
    metaTitle: "NeoTech Case Study | Digitally Next",
    metaDescription:
      "Complete Brand Revamp for a US Tech Co. Helped them to bag one of the biggest social networking platforms as their client.",
    listing: {
      introText:
        "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
      title: 'Neo<span style="color:#E21F26">Tech</span>',
      imageSrc: "/case/c1.webp",
      caption:
        "Complete Brand Revamp for a US Tech Co. Helped them to bag one of the biggest social networking platforms as their client.",
      buttonLabel: "View Case Study",
      pillLabel: "Genomics",
    },
    detail: {
      theme: "light",
      hero: {
        eyebrow: "NEOTECH",
        title:
          "Complete Brand Revamp for a US Tech Co. Helped them to bag one of the biggest social networking platforms as their client",
        heroImageSrc: "/case/c1.webp",
        metrics: [
          {
            value: "3X",
            description: "Brand Visibility Growth",
            color: "#E21F26",
            background: "rgba(226,31,38,0.05)",
          },
          {
            value: "1",
            description: "Major Social Network\nOnboarded",
            color: "#0EC8C5",
            background: "rgba(14,200,197,0.05)",
          },
        ],
      },
      about: {
        logoSrc: "/figma/case-study/about-logo.png",
        quote:
          '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat._"',
        fields: [
          { label: "Industry", value: "Technology" },
          { label: "Category", value: "Digital Transformation" },
          { label: "Region", value: "Global" },
        ],
      },
      intro:
        "Transforming Legacy (more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
      objective: {
        heading: "Objective Goal.",
        body: "Build and Ensure up to Date Digital Brand Presence that resonates with the stakeholders of today's 3.0 world",
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
        heading: "Focus Area",
        body: "Transformed a 3-decade-old US Tech company's legacy brand image into a modern, New Age digital presence that resonates with today's stakeholders. A complete brand revamp strategy was executed across digital platforms, technology infrastructure, and market positioning. The result helped the client secure one of the world's biggest social networking platforms as a major new client.",
        cards: [
          {
            title: "Digital Brand Transformation",
            description:
              "Rebuilt the brand's digital identity from the ground up to reflect a contemporary, globally relevant technology company.",
          },
          {
            title: "Technology Innovation",
            description:
              "Implemented cutting-edge digital solutions to modernise the tech stack and align the brand with today's 3.0 world standards.",
          },
          {
            title: "Market Leadership",
            description:
              "Repositioned the company as a category leader, enabling them to attract and win enterprise-level global clients and partnerships.",
          },
        ],
      },
      strategicMarketing: {
        headingPrefix: "Strategic Marketing",
        headingHighlight: "Support",
        menuItems: [
          { link: "#", text: "Digital Strategy Development", image: "https://picsum.photos/600/400?random=21" },
          { link: "#", text: "Technology Implementation", image: "https://picsum.photos/600/400?random=22" },
          { link: "#", text: "Brand Positioning", image: "https://picsum.photos/600/400?random=23" },
          { link: "#", text: "Market Analysis", image: "https://picsum.photos/600/400?random=24" },
          { link: "#", text: "Performance Optimization", image: "https://picsum.photos/600/400?random=24" },
        ],
      },
      coreDigitalAssets: {
        headingPrefix: "Core",
        headingHighlight: "Digital Assets",
        subheading:
          "All frameworks are powered by Modern DAD thinking and governed by the AI Decision & Acceleration Center.",
        items: [
          "Modern Web Platform",
          "Digital Brand Identity",
          "Technology Solutions",
          "Analytics Dashboard",
        ],
      },
      otherTeams: {
        heading: "Digitally Next.",
        linkLabel: "Case Studies",
        linkHref: "/case-studies",
      },
      relatedCaseStudies: [
        {
          imageSrc: "/figma/case-study/advent-case-study-69de24.png",
          title: "Advent Global",
          description:
            "Transforming Legacy (more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
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
    slug: "neotech-genomics",
    metaTitle: "NeoTech Genomics Case Study | Digitally Next",
    metaDescription:
      "Complete Re-Branding and marketing function set up of an acquired organization (post completion of M&A).",
    listing: {
      introText:
        "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
      title: 'Neo<span style="color:#E21F26">Tech</span>',
      imageSrc: "/case/c2.webp",
      caption:
        "Complete Brand makeover of a global brand (Post M&A) to a new name and digital brand communication.",
      buttonLabel: "View Case Study",
      pillLabel: "Genomics",
    },
    detail: {
      theme: "light",
      hero: {
        eyebrow: "NEOTECH",
        title:
          "Complete Re-Branding and marketing function set up of an acquired organization (post completion of M&A)",
        heroImageSrc: "/case/c2.webp",
        metrics: [
          {
            value: "85%",
            description: "Rebranding Acceptance Rate",
            color: "#E21F26",
            background: "rgba(226,31,38,0.05)",
          },
          {
            value: "2X",
            description: "Market Reach Expansion",
            color: "#0EC8C5",
            background: "rgba(14,200,197,0.05)",
          },
        ],
      },
      about: {
        logoSrc: "/figma/case-study/about-logo.png",
        quote:
          '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat._"',
        fields: [
          { label: "Industry", value: "Healthcare" },
          { label: "Category", value: "Genomics / Genetics" },
          { label: "Region", value: "India and UAE" },
        ],
      },
      intro:
        "Complete Brand makeover of a global brand (Post M&A) to a new name and digital brand communication.",
      objective: {
        heading: "Objective Goal.",
        body: "Awareness, Outreach, Recognition and Acceptance of rebranding that resonates with the varied stakeholders from health care and government sector",
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
        heading: "Focus Area",
        body: "Executed a complete brand makeover for a global Genomics and Healthcare company post-M&A, transitioning to a new name and digital brand identity across India and UAE. The strategy covered reworking the Go-To-Market plan, revising brand guidelines, and rolling out a 360° digital and social media calendar. Every touchpoint was redesigned to drive awareness, recognition, and acceptance of the rebranding among healthcare professionals, government bodies, and key stakeholders.",
        cards: [
          {
            title: "Brand Outreach and Engagement",
            description:
              "A structured outreach programme was launched to drive recognition and trust of the rebranded identity across healthcare and government stakeholders in India and UAE.",
          },
          {
            title: "Thought Leadership Reach Out",
            description:
              "Senior voices from within the organisation were positioned as credible thought leaders through podcasts, digital PR, and targeted publications within the genomics and healthcare space.",
          },
          {
            title: "Community Building",
            description:
              "An engaged digital community was cultivated around the new brand by developing thematic content, visual communication plans, and social media activations tailored to the healthcare and genomics audience.",
          },
        ],
      },
      strategicMarketing: {
        headingPrefix: "Strategic Marketing",
        headingHighlight: "Support",
        menuItems: [
          { link: "#", text: "Go-To-Market Strategy", image: "https://picsum.photos/600/400?random=31" },
          { link: "#", text: "Brand Guidelines Revision", image: "https://picsum.photos/600/400?random=32" },
          { link: "#", text: "Content & Themes Planning", image: "https://picsum.photos/600/400?random=33" },
          { link: "#", text: "Visual Communication", image: "https://picsum.photos/600/400?random=34" },
          { link: "#", text: "Social Media Planning", image: "https://picsum.photos/600/400?random=34" },
          { link: "#", text: "Digital PR Planning", image: "https://picsum.photos/600/400?random=34" },
          { link: "#", text: "Data & Analytics", image: "https://picsum.photos/600/400?random=34" },
        ],
      },
      coreDigitalAssets: {
        headingPrefix: "Core",
        headingHighlight: "Digital Assets",
        subheading:
          "All frameworks are powered by Modern DAD thinking and governed by the AI Decision & Acceleration Center.",
        items: [
          "JS Website",
          "Branding Kit",
          "Podcast",
          "360 degree Digital Social Media calendar set up and Roll Out",
        ],
      },
      otherTeams: {
        heading: "Digitally Next.",
        linkLabel: "Case Studies",
        linkHref: "/case-studies",
      },
      relatedCaseStudies: [
        {
          imageSrc: "/figma/case-study/advent-case-study-69de24.png",
          title: "Advent Global",
          description:
            "Transforming Legacy (more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
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
    id: 3,
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
          "Digital Campaign on Social Cause for a world leader in wearable hearing devices",
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
        logoSrc: "/figma/case-study/signia.png",
        quote:
          "Signia is a world-leading hearing aid brand dedicated to creating life-enhancing technology that empowers people to hear brilliantly. With cutting-edge Integrated Xperience technology, Signia delivers natural, effortless hearing in real-world conversations, helping people stay connected, confident, and fully engaged in every moment of life.",
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
        body: "Build a Movement along with strong brand recall and enhanced media attention including global social councils. All from Digital replacing TV spend.",
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
        heading: "Focus Area",
        body: "Drove a purpose-led digital campaign for a world-leading hearing device brand in India, breaking the social taboo around hearing loss to spark a national movement. The strategy replaced traditional TV spend with a powerful all-digital approach, earning 400% more media recognition and a 30% revenue increase. A microsite, podcasts, UGC distribution, and a 360° social media calendar were deployed to build lasting brand recall and global attention.",
        cards: [
          {
            title: "Social Media",
            description:
              "A 360° social media calendar was rolled out with thematic content and visual communication to drive mass awareness and build a movement around hearing health across India.",
          },
          {
            title: "Digital PR",
            description:
              "A targeted digital PR calendar amplified the campaign's reach across national news channels, media houses, and international publications, drawing attention from global health organisations.",
          },
          {
            title: "Thought Leadership Forums and Bodies",
            description:
              "The brand was positioned as a flag bearer for social change through thought leadership forums, healthcare bodies, and global social councils.",
          },
          {
            title: "Local Industry Associations Communiqué",
            description:
              "Strategic communiqués were directed at local industry associations and healthcare networks across India to deepen credibility and extend the campaign's Pan-India geographic reach.",
          },
          {
            title: "Employer Branding",
            description:
              "The campaign's social cause narrative was extended internally, reinforcing the brand's values and purpose-driven culture to engage employees as active advocates of the movement.",
          },
          {
            title: "Brand Ambassador Engagement",
            description:
              "Brand ambassadors drove authentic storytelling and peer-level influence to break hearing loss stigma and boost community participation.",
          },
        ],
      },
      strategicMarketing: {
        headingPrefix: "Strategic Marketing",
        headingHighlight: "Support",
        menuItems: [
          { link: "#", text: "Content & Themes Planning", image: "https://picsum.photos/600/400?random=1" },
          { link: "#", text: "Visual & Social Media", image: "https://picsum.photos/600/400?random=2" },
          { link: "#", text: "Digital PR & Analytics", image: "https://picsum.photos/600/400?random=3" },
        ],
      },
      coreDigitalAssets: {
        headingPrefix: "Core",
        headingHighlight: "Digital Assets",
        subheading:
          "All frameworks are powered by Modern DAD thinking and governed by the AI Decision & Acceleration Center.",
        items: [
          "Microsite",
          "Engagement Promotional Assets",
          "Podcast- Audio and Video",
          "360 degree Digital Social Media calendar set up and Roll Out",
          "Digital PR Calendar including UGC distribution",
        ],
      },
      otherTeams: {
        heading: "Digitally Next.",
        linkLabel: "Case Studies",
        linkHref: "/case-studies",
      },
      relatedCaseStudies: [
        {
          imageSrc: "/figma/case-study/advent-case-study-69de24.png",
          title: "Advent Global",
          description:
            "Transforming Legacy (more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
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
    id: 4,
    slug: "insurtech-pan-india",
    metaTitle: "InsurTech PAN India Launch Case Study | Digitally Next",
    metaDescription:
      "First Ever PAN India launch of InsurTech and their Phygital Model for the Tier-II & III cities (Bharat).",
    listing: {
      introText:
        "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
      title: "InsurTech",
      imageSrc: "/case/c3.webp",
      caption:
        "PAN India Launch (Online) of a disruptive phygital model in insurance sector to prevent mis-selling, mis-information and honest reach of the insurance products in the interiors of India.",
      buttonLabel: "View Case Study",
      pillLabel: "Insurance",
    },
    detail: {
      theme: "light",
      hero: {
        eyebrow: "INSURTECH",
        title:
          "First Ever PAN India launch of InsurTech and their Phygital Model for the Tier-II & III cities (Bharat)",
        heroImageSrc: "/case/c3.webp",
        metrics: [
          {
            value: "6000+",
            description: "Pin Codes Reached Across\nTier-II & III Cities in Just 2 Years",
            color: "#E21F26",
            background: "rgba(226,31,38,0.05)",
          },
          {
            value: "Series B",
            description: "Funding Secured Post\nSuccessful PAN India Digital Launch",
            color: "#0EC8C5",
            background: "rgba(14,200,197,0.05)",
          },
        ],
      },
      about: {
        logoSrc: "/figma/case-study/signia.png",
        quote:
          "Signia is a world-leading hearing aid brand dedicated to creating life-enhancing technology that empowers people to hear brilliantly. With cutting-edge Integrated Xperience technology, Signia delivers natural, effortless hearing in real-world conversations, helping people stay connected, confident, and fully engaged in every moment of life.",
        fields: [
          { label: "Industry", value: "BFSI" },
          { label: "Category", value: "Insurance Services" },
          { label: "Region", value: "India" },
        ],
      },
      intro:
        "PAN India Launch (Online) of a disruptive phygital model in insurance sector to prevent mis-selling, mis-information and honest reach of the insurance products in the interiors of India.",
      objective: {
        heading: "Objective Goal.",
        body: "Complete new D2C centric website integrating with Apps along with 360 degrees performance marketing asset creation and B2B centric social media.",
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
        heading: "Focus Area",
        body: "Executed the first-ever PAN India online launch of a disruptive phygital InsurTech model targeting tier-II and tier-III cities across Bharat. The strategy tackled insurance mis-selling and misinformation by building an honest, tech-driven D2C model that reached 6,000+ pin codes in just two years. A complete 360° digital rollout, including website, podcasts, social media, and digital PR — helped the brand secure Series B funding and a special mention by TiE.",
        cards: [
          {
            title: "D2C Website",
            description:
              "A fully integrated D2C website was built and launched, connecting seamlessly with apps and performance marketing assets to drive direct insurance outreach across India's tier-II and tier-III markets.",
          },
          {
            title: "Social Media",
            description:
              "A B2B-focused social media strategy was deployed with thematic content, visual communication, and a 360° calendar to build brand credibility and educate audiences on honest insurance practices.",
          },
          {
            title: "Digital PR",
            description:
              "A targeted digital PR and publications calendar drove national media coverage and UGC distribution, positioning the brand as a disruptive force in India's insurance sector.",
          },
          {
            title: "Personal Branding & Thought Leadership",
            description:
              "Founders and leadership were established as credible InsurTech voices through podcasts, thought leadership forums, and strategic personal branding.",
          },
        ],
      },
      strategicMarketing: {
        headingPrefix: "Strategic Marketing",
        headingHighlight: "Support",
        menuItems: [
          { link: "#", text: "Content & Themes Planning", image: "https://picsum.photos/600/400?random=41" },
          { link: "#", text: "Visual Communication", image: "https://picsum.photos/600/400?random=42" },
          { link: "#", text: "Social Media Planning", image: "https://picsum.photos/600/400?random=43" },
          { link: "#", text: "Digital PR & Publications", image: "https://picsum.photos/600/400?random=44" },
          { link: "#", text: "Data & Analytics", image: "https://picsum.photos/600/400?random=44" },
        ],
      },
      coreDigitalAssets: {
        headingPrefix: "Core",
        headingHighlight: "Digital Assets",
        subheading:
          "All frameworks are powered by Modern DAD thinking and governed by the AI Decision & Acceleration Center.",
        items: [
          "Website",
          "Engagement Promotional Assets",
          "Podcast- Audio and Video",
          "360 degree Digital Social Media calendar set up and Roll Out",
          "Digital PR Calendar including UGC distribution"
        ],
      },
      otherTeams: {
        heading: "Digitally Next.",
        linkLabel: "Case Studies",
        linkHref: "/case-studies",
      },
      relatedCaseStudies: [
        {
          imageSrc: "/figma/case-study/advent-case-study-69de24.png",
          title: "Advent Global",
          description:
            "Transforming Legacy (more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
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
    id: 5,
    slug: "fintech-student-value-card",
    metaTitle: "Fintech Student Value Card Case Study | Digitally Next",
    metaDescription:
      "Digital Branding for a Fintech — Student value cards (endorsed by UNESCO) with a spread in 125+ Countries.",
    listing: {
      introText:
        "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
      title: "Fintech Student Value Card",
      imageSrc: "/case/c3.webp",
      caption:
        "Digital Branding for a Fintech — Student value cards (endorsed by UNESCO) with a spread in 125+ Countries.",
      buttonLabel: "View Case Study",
      pillLabel: "Value Card Services",
    },
    detail: {
      theme: "light",
      hero: {
        eyebrow: "FINTECH",
        title:
          "Digital Branding for a Fintech — Student value cards (endorsed by UNESCO) with a spread in 125+ Countries",
        heroImageSrc: "/case/c3.webp",
        metrics: [
          {
            value: "100%",
            description: "increase in Card Purchases\nin less than a year",
            color: "#E21F26",
            background: "rgba(226,31,38,0.05)",
          },
          {
            value: "150%",
            description: "increase in Social Media\nFollower",
            color: "#0EC8C5",
            background: "rgba(14,200,197,0.05)",
          },
        ],
      },
      about: {
        logoSrc: "/figma/case-study/signia.png",
        quote:
          "Signia is a world-leading hearing aid brand dedicated to creating life-enhancing technology that empowers people to hear brilliantly. With cutting-edge Integrated Xperience technology, Signia delivers natural, effortless hearing in real-world conversations, helping people stay connected, confident, and fully engaged in every moment of life.",
        fields: [
          { label: "Industry", value: "BFSI" },
          { label: "Category", value: "Value Card Services" },
          { label: "Region", value: "India, Spain and Czech Republic" },
        ],
      },
      intro:
        "Awareness building among students and educational institutes about the value card.",
      objective: {
        heading: "Objective Goal.",
        body: "Manage Complete Digital Branding and performance Marketing with focus on Brand outreach and demand generation.",
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
        heading: "Focus Area",
        body: "Drove complete digital branding and performance marketing for a UNESCO-endorsed Fintech student value card operating across 125+ countries in India, Spain, and Czech Republic. The strategy focused on brand outreach and demand generation among students and educational institutes, delivering a 100% increase in card purchases in under a year. A 360° social media rollout, digital PR calendar, and paid ads achieved a 150% growth in social media followers and earned features in Forbes and Business Standard.",
        cards: [
          {
            title: "Social Media",
            description:
              "A 360° social media calendar was rolled out with thematic content and visual communication to drive awareness and demand among students and educational institutions across key markets.",
          },
          {
            title: "Digital PR",
            description:
              "A targeted digital PR and UGC distribution calendar secured high-profile media coverage including features in Forbes and Business Standard, building credibility for the brand across India and international markets.",
          },
          {
            title: "Community Development",
            description:
              "An engaged student and institutional community was built around the value card through consistent digital activations, content programmes, and outreach across India, Spain, and Czech Republic.",
          },
          {
            title: "Paid Ads",
            description:
              "Performance-driven paid ad campaigns were deployed to accelerate demand generation, directly contributing to a 100% increase in card purchases within the first year of the engagement.",
          },
        ],
      },
      strategicMarketing: {
        headingPrefix: "Strategic Marketing",
        headingHighlight: "Support",
        menuItems: [
          { link: "#", text: "Content & Themes Planning", image: "https://picsum.photos/600/400?random=41" },
          { link: "#", text: "Visual Communication", image: "https://picsum.photos/600/400?random=42" },
          { link: "#", text: "Social Media Planning", image: "https://picsum.photos/600/400?random=43" },
          { link: "#", text: "Digital PR & Publications", image: "https://picsum.photos/600/400?random=44" },
          { link: "#", text: "Data & Analytics", image: "https://picsum.photos/600/400?random=44" },
        ],
      },
      coreDigitalAssets: {
        headingPrefix: "Core",
        headingHighlight: "Digital Assets",
        subheading:
          "All frameworks are powered by Modern DAD thinking and governed by the AI Decision & Acceleration Center.",
        items: [
          "Engagement Promotional Assets",
          "360 degree Digital Social Media calendar set up and Roll Out",
          "Digital PR Calendar including UGC distribution",
        ],
      },
      otherTeams: {
        heading: "Digitally Next.",
        linkLabel: "Case Studies",
        linkHref: "/case-studies",
      },
      relatedCaseStudies: [
        {
          imageSrc: "/figma/case-study/advent-case-study-69de24.png",
          title: "Advent Global",
          description:
            "Transforming Legacy (more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
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
    id: 6,
    slug: "real-estate-advisory",
    metaTitle: "Real Estate Advisory Case Study | Digitally Next",
    metaDescription:
      "140 years+ old Global name in advisory and standards advocacy in built environment — land, real estate, construction and infrastructure.",
    listing: {
      introText:
        "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
      title: "Real Estate Advisory",
      imageSrc: "/case/c3.webp",
      caption:
        "Digital Brand Communication of the enriched legacy and the transformational work done to make world a better place.",
      buttonLabel: "View Case Study",
      pillLabel: "Real Estate Advisory",
    },
    detail: {
      theme: "light",
      hero: {
        eyebrow: "REAL ESTATE ADVISORY",
        title:
          "140 years+ old Global name in advisory and standards advocacy in built environment — land, real estate, construction and infrastructure.",
        heroImageSrc: "/case/c3.webp",
        metrics: [
          {
            value: "5X",
            description: "Community Growth",
            color: "#E21F26",
            background: "rgba(226,31,38,0.05)",
          },
          {
            value: "140+",
            description: "Years of Legacy\nRepositioned",
            color: "#0EC8C5",
            background: "rgba(14,200,197,0.05)",
          },
        ],
      },
      about: {
        logoSrc: "/figma/case-study/signia.png",
        quote:
          "Signia is a world-leading hearing aid brand dedicated to creating life-enhancing technology that empowers people to hear brilliantly. With cutting-edge Integrated Xperience technology, Signia delivers natural, effortless hearing in real-world conversations, helping people stay connected, confident, and fully engaged in every moment of life.",
        fields: [
          { label: "Industry", value: "Consulting" },
          { label: "Category", value: "Real Estate Advisory" },
          { label: "Region", value: "APac" },
        ],
      },
      intro:
        "Digital Brand Communication of the enriched legacy and the transformational work done to make world a better place.",
      objective: {
        heading: "Objective Goal.",
        body: "Manage Complete Digital Branding and performance Marketing with focus on Brand outreach, Community development and Thought leadership.",
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
        heading: "Focus Area",
        body: "Drove complete digital branding and performance marketing for a UNESCO-endorsed Fintech student value card operating across 125+ countries in India, Spain, and Czech Republic. The strategy focused on brand outreach and demand generation among students and educational institutes, delivering a 100% increase in card purchases in under a year. A 360° social media rollout, digital PR calendar, and paid ads achieved a 150% growth in social media followers and earned features in Forbes and Business Standard.",
        cards: [
          {
            title: "Social Media",
            description:
              "A 360° social media calendar was rolled out with thematic content and visual communication to drive awareness and demand among students and educational institutions across key markets.",
          },
          {
            title: "Digital PR",
            description:
              "A targeted digital PR and UGC distribution calendar secured high-profile media coverage including features in Forbes and Business Standard, building credibility for the brand across India and international markets.",
          },
          {
            title: "Community Development",
            description:
              "An engaged student and institutional community was built around the value card through consistent digital activations, content programmes, and outreach across India, Spain, and Czech Republic.",
          },
          {
            title: "Thought Leadership",
            description:
              "Performance-driven paid ad campaigns were deployed to accelerate demand generation, directly contributing to a 100% increase in card purchases within the first year of the engagement.",
          },
        ],
      },
      strategicMarketing: {
        headingPrefix: "Strategic Marketing",
        headingHighlight: "Support",
        menuItems: [
          { link: "#", text: "Content & Themes Planning", image: "https://picsum.photos/600/400?random=41" },
          { link: "#", text: "Visual Communication", image: "https://picsum.photos/600/400?random=42" },
          { link: "#", text: "Social Media Planning", image: "https://picsum.photos/600/400?random=43" },
          { link: "#", text: "Digital PR & Publications", image: "https://picsum.photos/600/400?random=44" },
          { link: "#", text: "Data & Analytics", image: "https://picsum.photos/600/400?random=44" },
        ],
      },
      coreDigitalAssets: {
        headingPrefix: "Core",
        headingHighlight: "Digital Assets",
        subheading:
          "All frameworks are powered by Modern DAD thinking and governed by the AI Decision & Acceleration Center.",
        items: [
          "360° Social Media Calendar",
          "Digital PR & Publications Calendar",
          "Thought Leadership Content",
          "Community Outreach Programme",
          "Visual Communication Plan",
          "Brand Outreach Toolkit",
          "Podcast Production",
          "Legacy Repositioning Narrative",
          "Standards Advocacy Content",
        ],
      },
      otherTeams: {
        heading: "Digitally Next.",
        linkLabel: "Case Studies",
        linkHref: "/case-studies",
      },
      relatedCaseStudies: [
        {
          imageSrc: "/figma/case-study/advent-case-study-69de24.png",
          title: "Advent Global",
          description:
            "Transforming Legacy (more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
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
    id: 7,
    slug: "legal-ip-advisory",
    metaTitle: "Legal & IP Advisory Case Study | Digitally Next",
    metaDescription:
      "Managing Digital Assets of a Global Legal and advisory firm specializing in intellectual property.",
    listing: {
      introText:
        "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
      title: "Legal & IP Advisory",
      imageSrc: "/case/c7.webp",
      caption:
        "Digital Brand Communication of the enriched legacy and the transformational work done in all fields of law with emphasis on Media, Entertainment, Sweepstakes, Promotions and IP Law.",
      buttonLabel: "View Case Study",
      pillLabel: "Attorneys at Law",
    },
    detail: {
      theme: "light",
      hero: {
        eyebrow: "LEGAL & IP ADVISORY",
        title:
          "Managing Digital Assets of a Global Legal and advisory firm specializing in intellectual property",
        heroImageSrc: "/case/c7.webp",
        metrics: [
          {
            value: "40+",
            description: "Years of Legal Legacy\nAmplified Through Digital Brand Communication",
            color: "#E21F26",
            background: "rgba(226,31,38,0.05)",
          },
          {
            value: "3X",
            description: "Increase in Thought Leadership Visibility\nAcross APac Digital Channels",
            color: "#0EC8C5",
            background: "rgba(14,200,197,0.05)",
          },
        ],
      },
      about: {
        logoSrc: "/figma/case-study/about-logo.png",
        quote:
          "Digital Brand Communication of the enriched legacy and the transformational work done in all fields of law with emphasis on Media, Entertainment, Sweepstakes, Promotions and IP Law.",
        fields: [
          { label: "Industry", value: "Consulting" },
          { label: "Category", value: "Attorneys at Law" },
          { label: "Region", value: "APac" },
        ],
      },
      intro:
        "Digital Brand Communication of the enriched legacy and the transformational work done in all fields of law with emphasis on Media, Entertainment, Sweepstakes, Promotions and IP Law.",
      objective: {
        heading: "Objective Goal.",
        body: "Manage Digital Branding assets with focus on Brand outreach and Thought leadership.",
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
        heading: "Focus Area",
        body: "Managed and elevated the complete digital brand communication for a global legal and advisory firm specialising in intellectual property across the Asia-Pacific region. The strategy highlighted the firm's enriched legacy and transformational work across Media, Entertainment, Sweepstakes, Promotions, and IP Law. All digital assets, including the website, were curated and optimised to strengthen brand outreach and establish the firm as a leading thought leader in its field.",
        cards: [
          {
            title: "Digital Assets Including the Website",
            description:
              "All digital brand assets and the website were managed to communicate the firm's expertise in IP, Media, Entertainment, and Law across the Asia-Pacific region.",
          },
          {
            title: "Thought Leadership",
            description:
              "Senior legal experts and partners were positioned as credible thought leaders in IP, Media, and Entertainment Law through strategic content, publications, and digital PR across APac channels.",
          },
          {
            title: "Brand Outreach",
            description:
              "A structured brand outreach programme was deployed to amplify the firm's 40+ year legacy, driving awareness among corporates, media houses, and legal stakeholders across the region.",
          },
        ],
      },
      strategicMarketing: {
        headingPrefix: "Strategic Marketing",
        headingHighlight: "Support",
        menuItems: [
          { link: "#", text: "Digital Assets", image: "https://picsum.photos/600/400?random=71" },
          { link: "#", text: "Thought Leadership", image: "https://picsum.photos/600/400?random=72" },
          { link: "#", text: "Brand Outreach", image: "https://picsum.photos/600/400?random=73" },
          { link: "#", text: "IP Law Content", image: "https://picsum.photos/600/400?random=74" },
        ],
      },
      coreDigitalAssets: {
        headingPrefix: "Core",
        headingHighlight: "Digital Assets",
        subheading:
          "All frameworks are powered by Modern DAD thinking and governed by the AI Decision & Acceleration Center.",
        items: [
          "Website Management & Optimisation",
          "Digital Brand Asset Library",
          "Thought Leadership Content",
          "Digital PR & Publications Calendar",
          "Social Media Calendar",
          "Visual Communication Plan",
          "Brand Outreach Toolkit",
          "IP Law Content Programme",
          "Legacy Narrative & Positioning",
        ],
      },
      otherTeams: {
        heading: "Digitally Next.",
        linkLabel: "Case Studies",
        linkHref: "/case-studies",
      },
      relatedCaseStudies: [
        {
          imageSrc: "/figma/case-study/advent-case-study-69de24.png",
          title: "Advent Global",
          description:
            "Transforming Legacy (more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
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
    id: 8,
    slug: "judaica-art-gallery",
    metaTitle: "Judaica Art Gallery Case Study | Digitally Next",
    metaDescription:
      "Launch of a high end Judaica Art gallery and 5 Artists for International Markets — US & UK.",
    listing: {
      introText:
        "From ambitious startups to scaling enterprises – Digitally Next builds performance-driven creative systems that turn attention into measurable growth.",
      title: "Judaica Art Gallery",
      imageSrc: "/case/c8.webp",
      caption:
        "Launch of a high end Judaica Art gallery and 5 Artists for International Markets — US & UK.",
      buttonLabel: "View Case Study",
      pillLabel: "UK",
    },
    detail: {
      theme: "light",
      hero: {
        eyebrow: "JUDAICA ART GALLERY",
        title:
          "Launch of a high end Judaica Art gallery and 5 Artists for International Markets — US | UK",
        heroImageSrc: "/case/c8.webp",
        metrics: [
          {
            value: "3X",
            description: "Times More Reach in\nInternational Art Markets (US & UK)",
            color: "#E21F26",
            background: "rgba(226,31,38,0.05)",
          },
          {
            value: "5",
            description: "Individual Artist Brands Launched\nwith Dedicated D2C Storefronts",
            color: "#0EC8C5",
            background: "rgba(14,200,197,0.05)",
          },
        ],
      },
      about: {
        logoSrc: "/figma/case-study/about-logo.png",
        quote:
          '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat._"',
        fields: [
          { label: "Industry", value: "Art & Culture" },
          { label: "Category", value: "Art Gallery & E-commerce" },
          { label: "Region", value: "US & UK" },
        ],
      },
      intro:
        "Launch of a high end Judaica Art gallery and 5 Artists for International Markets — US & UK.",
      objective: {
        heading: "Objective Goal.",
        body: "Build a Movement along with strong brand recall and enhanced media attention including global social councils. All from Digital replacing TV spend.",
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
        heading: "Focus Area",
        body: "Launched a high-end Judaica Art Gallery alongside five distinct artist portfolios, targeting international markets across the US and UK. The strategy blended social media activations, personal branding, SEO, and e-commerce infrastructure to build awareness among real estate builders, interior designers, architects, and art collectors. A fully functional D2C shop was established on Shopify and WooCommerce to enable direct global sales of contemporary and modern Judaica artwork.",
        cards: [
          {
            title: "Social Media",
            description:
              "Targeted social media campaigns were activated to build community and awareness around Judaica art and the five featured artists across international markets.",
          },
          {
            title: "Digital PR",
            description:
              "Strategic digital PR amplified the gallery's launch, securing visibility across key publications and platforms within the art and luxury lifestyle space.",
          },
          {
            title: "Thought Leadership",
            description:
              "The gallery's artists were positioned as cultural voices in the Judaica world through curated content, interviews, and expert commentary on digital platforms.",
          },
          {
            title: "Industry Association",
            description:
              "Meaningful connections were built with art collectors, interior designers, architects, and real estate developers to expand the gallery's professional network and clientele.",
          },
        ],
      },
      strategicMarketing: {
        headingPrefix: "Strategic Marketing",
        headingHighlight: "Support",
        menuItems: [
          { link: "#", text: "Social Media", image: "https://picsum.photos/600/400?random=81" },
          { link: "#", text: "Digital PR", image: "https://picsum.photos/600/400?random=82" },
          { link: "#", text: "Thought Leadership", image: "https://picsum.photos/600/400?random=83" },
          { link: "#", text: "D2C E-commerce", image: "https://picsum.photos/600/400?random=84" },
        ],
      },
      coreDigitalAssets: {
        headingPrefix: "Core",
        headingHighlight: "Digital Assets",
        subheading:
          "All frameworks are powered by Modern DAD thinking and governed by the AI Decision & Acceleration Center.",
        items: [
          "D2C Shopify & WooCommerce Store",
          "Artist Portfolio Websites (x5)",
          "360° Social Media Calendar",
          "Digital PR & Publications Calendar",
          "Personal Branding — 5 Artists",
          "SEO Strategy",
          "Visual Communication Plan",
          "Art Collector Outreach Programme",
          "Thought Leadership Content",
        ],
      },
      otherTeams: {
        heading: "Digitally Next.",
        linkLabel: "Case Studies",
        linkHref: "/case-studies",
      },
      relatedCaseStudies: [
        {
          imageSrc: "/figma/case-study/advent-case-study-69de24.png",
          title: "Advent Global",
          description:
            "Transforming Legacy (more than 3 decades old organization) Brand Image to the New Age evolved Brand Positioning.",
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
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
