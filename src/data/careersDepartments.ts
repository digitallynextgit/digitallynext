export type CareersTone = "red" | "teal";

export type CareersModalStep = "department" | "role" | "description" | "form";

export type CareersRoleDescription = {
  intro: string;
  jobEssence?: string;
  keyRequirements?: string[];
  currentOpenings?: string[];
};

export type CareersRole = {
  id: string;
  title: string;
  meta?: string;
  summary?: string;
  description?: CareersRoleDescription;
};

export type CareersDepartment = {
  id: string;
  title: string;
  jobsLabel: string;
  tone: CareersTone;
  roles: CareersRole[];
};

// ─── INTERNSHIP DEPARTMENTS ──────────────────────────────────────────────────

export const CAREERS_INTERNSHIP_DEPARTMENTS: CareersDepartment[] = [
  {
    id: "internships",
    title: "Internships",
    jobsLabel: "5 Positions",
    tone: "teal",
    roles: [
      {
        id: "intern-graphic-designer",
        title: "Graphic Designer Intern",
        description: {
          intro:
            "Are you a visual storyteller with a passion for design? Do you see the world in colors, shapes, and patterns? Join us as a Graphic Designer Intern and let your creativity shine.",
        },
      },
      {
        id: "intern-content-writer",
        title: "Content Writing Intern",
        description: {
          intro:
            "Are you a wordsmith with a passion for storytelling? If you have a knack for turning ideas into compelling content, join us as a Content Writing Intern.",
        },
      },
      {
        id: "intern-video-editor",
        title: "Video Editing Intern",
        description: {
          intro:
            "Do you have a passion for storytelling through visuals? Are you a wizard with video editing software? If so, we have an exciting opportunity for you! Join us as a Video Editor Intern and help us create compelling visual content that captivates and inspires.",
        },
      },
      {
        id: "intern-social-media-creator",
        title: "Social Media Content Creator Intern",
        description: {
          intro:
            "Are you a storyteller at heart with a flair for creating captivating content? Do you live and breathe social media trends? If so, we have the perfect opportunity for you! Join us as a Social Media Content Creator Intern and help us tell our story to the world.",
        },
      },
      {
        id: "intern-hr",
        title: "HR Intern",
        description: {
          intro:
            "Are you passionate about people, culture and building great workplaces? Do you enjoy organizing, communicating and being the go-to person who keeps things running smoothly? If so, we have the perfect opportunity for you! Join us as an HR Intern and be a part of shaping an engaging and high-performing work environment.",
        },
      },
    ],
  },
];

// ─── FULL-TIME DEPARTMENTS ───────────────────────────────────────────────────

export const CAREERS_DEPARTMENTS: CareersDepartment[] = [
  {
    id: "account-management",
    title: "Account Management Group",
    jobsLabel: "1 Role",
    tone: "teal",
    roles: [
      {
        id: "account-manager",
        title: "Account Manager",
        description: {
          intro:
            "Strategic thinking, operational structure, and financial clarity are what our clients demand. We’re looking for Account Managers who can translate business goals into actionable digital plans, align internal teams seamlessly, and ensure every account grows profitably while maintaining long-term client relationships.",
          jobEssence:
            "Sound understanding of client lifecycle management, brand brief creation, inter-department coordination, structured execution planning, profitability tracking, reporting alignment with performance metrics, and identifying upsell or growth opportunities within existing accounts.",
          keyRequirements: [
            "3–4 years of experience in Consulting firms and/or Agency environment",
            "Strong communication and professional tonality",
            "Strategic and structured thinking ability",
            "Advanced Excel & PPT proficiency",
            "Financial understanding of margins and receivables",
            "Stakeholder and multi-project management skills",
            "Familiarity with Analytics & CRM tools (like GSC, Notion)",
            "Strong attention to deadlines and workflow discipline",
            "Confidence in handling client escalations",
          ],
        },
      },
    ],
  },
  {
    id: "project-management",
    title: "Project Management Group",
    jobsLabel: "1 Role",
    tone: "red",
    roles: [
      {
        id: "project-manager",
        title: "Project Manager",
        description: {
          intro:
            "Great ideas fail without great execution. We’re looking for a system-driven Project Manager who builds structure, drives operational clarity, and integrates AI into execution across teams.",
          jobEssence:
            "Lead and streamline the entire Create–Publish–Promote lifecycle with structured execution and operational clarity. Align budgets with bandwidth, validate Time & Effort vs Cost metrics, drive AI-enabled process optimization, and ensure seamless coordination across teams to deliver projects on time, with quality and profitability.",
          keyRequirements: [
            "3–4 years of experience in Digital / Creative Agencies or Consulting",
            "Strong operational & database management skills",
            "Ability to manage parallel projects under structured timelines",
            "Expertise in Excel & PowerPoint",
            "Familiarity with GSC, Notion or similar PM/CRM tools",
            "Exposure to automation & AI-enabled workflows",
            "Strong analytical and reporting capabilities",
            "Clear communication and coordination mindset",
          ],
        },
      },
    ],
  },
  {
    id: "creative-studio",
    title: "Creative Studio",
    jobsLabel: "1 Role",
    tone: "teal",
    roles: [
      {
        id: "visual-artist-graphic-designer",
        title: "Visual Artist aka Graphic Designer",
        description: {
          intro:
            "Fine arts, visual finesse, and visual treats are what our clients demand. We are looking for modern-day artists who can be inspired by Michelangelo and know how to create captivating visual treats for the audience of 2019!",
          jobEssence:
            "Having a sound understanding Visual Content assets – Infographics | Memes | Social Media creative updates | Comic Strips | Mind Maps | Caricatures | Announcement creatives | landing page based on Storyboarding/Trends specific Scenarios.",
          keyRequirements: [
            "Visualization",
            "Adobe Photoshop",
            "Adobe Illustrator",
            "Any other related software",
            "Familiarity with AI enabled tools",
          ],
          currentOpenings: [
            "Junior Graphic Designer (1-2 Years Exp)",
            "Senior Graphic Designer",
            "Visual Lead",
          ],
        },
      },
    ],
  },
  {
    id: "performance",
    title: "Performance (Organic and Paid)",
    jobsLabel: "2 Roles",
    tone: "red",
    roles: [
      {
        id: "seo-ai-search",
        title: "Search Engine Optimization | AI Search",
        description: {
          intro:
            "It’s not just keywords… it’s the art of being discovered. Like hidden trails leading to breathtaking views, or a compass guiding travelers home, your expertise ensures brands are found where it matters most. We’re looking for someone who understands the rhythm of search engines, the pulse of online audiences, and can weave strategy with creativity to amplify a brand’s digital heartbeat.",
          jobEssence:
            "Having a deep understanding of search engine optimization across on-page, off-page, and technical aspects. Skilled in analyzing trends, optimizing content, and improving website visibility. Ideal for someone who can blend data-driven insights with creative problem-solving to drive measurable growth.",
          keyRequirements: [
            "On-page and off-page SEO",
            "Keyword research and competitor analysis",
            "Technical SEO and site audits",
            "Content optimization and link-building strategies",
            "Journey from SEO>GEO>AEO",
            "Familiarity with tools like Google Analytics, Search Console, and SEMrush",
          ],
          currentOpenings: [
            "Junior SEO Executive (1-2 Years Exp)",
            "SEO Specialist",
            "SEO Lead",
          ],
        },
      },
      {
        id: "performance-marketer",
        title: "Performance Marketer",
        description: {
          intro:
            "Strategy, plan, and process make a digital campaign more effective and perform better. Only operational understanding or knowledge of tools won't give any results anymore. If that's what you also think, then we are looking for you.",
          jobEssence:
            "The role focuses on crafting and implementing data-driven campaigns that optimize user engagement, leveraging insights to deliver measurable business growth and impactful results.",
          keyRequirements: [
            "Paid media setups - Meta | Google | LinkedIn | Quora | Bing",
            "Google Analytics",
            "Organic marketing, including ORM",
            "Result centric landing page knowledge",
            "Must have experience of D2C brands",
          ],
          currentOpenings: [
            "Performance Marketer (2-3 Years Exp)",
            "Performance Marketer (4-7 Years Exp)",
          ],
        },
      },
    ],
  },
  {
    id: "web-essentials",
    title: "Web Essentials",
    jobsLabel: "1 Role",
    tone: "red",
    roles: [
      {
        id: "full-stack-developer",
        title: "Full Stack Developer",
        description: {
          intro:
            "Turning code into high-impact brand experiences. In a world where digital performance defines perception, this role goes beyond building websites — it’s about engineering fast, scalable, and conversion-focused platforms. If you think in systems, care about performance, and build with ownership, you’ll fit right in.",
          jobEssence:
            "The role focuses on building end-to-end web applications using modern frontend and backend technologies. This includes developing scalable architectures, optimizing performance and SEO readiness, integrating APIs and databases, and managing deployments to ensure stability, speed, and long-term reliability.",
          keyRequirements: [
            "Strong expertise in Next.js & React.js",
            "TypeScript / JavaScript proficiency",
            "Frontend + Backend integration (Node.js and/or Python)",
            "Database handling (Supabase, NeonDB, AWS databases)",
            "ORM tools like Prisma / Drizzle",
            "Responsive UI development & Figma collaboration",
            "Deployment via Vercel / AWS",
            "Git & GitHub with CI/CD pipelines",
            "Knowledge of DNS, hosting & domain management",
            "Familiarity with AI enabled tools",
          ],
          currentOpenings: [
            "Junior Full Stack Developer(0-2 years Exp)",
            "Senior Full Stack Developer(2-4 years Exp)",
          ],
        },
      },
    ],
  },
  {
    id: "adac",
    title: "AI Decision and Acceleration Centre (ADAC)",
    jobsLabel: "4 Roles",
    tone: "teal",
    roles: [
      {
        id: "ai-strategists-analysts",
        title: "AI Strategists and Analysts",
        description: {
          intro:
            "Intelligence is the new competitive advantage. At ADAC, we don’t just use AI — we design decision systems that accelerate growth. As part of this team, you turn data into direction, insights into action, and automation into measurable business impact. If you think beyond dashboards and understand how intelligence can shape strategy, this role is built for you.",
          jobEssence:
            "The role focuses on leveraging data, AI tools, and analytical frameworks to drive smarter business decisions. This includes identifying automation opportunities, building AI-powered workflows, analyzing performance data, and translating complex insights into clear strategic recommendations.",
          keyRequirements: [
            "Strong analytical & data interpretation skills",
            "Understanding of AI tools, automation & decision systems",
            "Business strategy alignment with AI insights",
            "Data visualization & reporting",
            "Process optimization mindset",
            "Research-driven & innovation-oriented approach",
          ],
          currentOpenings: ["AI Strategist& Analysts"],
        },
      },
      {
        id: "ai-content-creative",
        title: "AI Content & Creative Specialists",
        description: {
          intro:
            "Creativity is evolving — and AI is its new co-creator. This role sits at the intersection of imagination and intelligence. If you know how to use AI not just as a tool, but as a creative accelerator, you’ll thrive here.",
          jobEssence:
            "The role focuses on leveraging AI tools to enhance content creation, visual storytelling, and creative workflows. This includes generating AI-assisted copies, visuals, concepts, and campaign ideas while ensuring brand consistency and originality.",
          keyRequirements: [
            "Proficiency with AI content & creative tools",
            "Prompt engineering & structured AI workflows",
            "Content strategy & brand tone understanding",
            "AI-assisted design & ideation",
            "Creative experimentation mindset",
            "Strong storytelling skills",
          ],
          currentOpenings: ["AI Content Specialist"],
        },
      },
      {
        id: "ai-performance-media",
        title: "AI Performance & Media Specialist",
        description: {
          intro:
            "Performance marketing meets machine intelligence. This role is about using AI to optimize media spends, automate decision-making, and unlock smarter scaling. If you understand both performance metrics and predictive systems, this is your arena.",
          jobEssence:
            "The role focuses on integrating AI tools into paid media and performance strategies. This includes campaign automation, audience modeling, predictive insights, budget optimization, and data-driven scaling across digital platforms.",
          keyRequirements: [
            "Performance marketing expertise (paid media & analytics)",
            "AI-based campaign optimization tools",
            "Data interpretation & forecasting",
            "Automation workflows for ad platforms",
            "ROI & conversion-driven mindset",
            "Strong analytical decision-making skills",
          ],
          currentOpenings: ["AI Performance Specialist"],
        },
      },
      {
        id: "ai-first-web-developers",
        title: "AI-First Web Developers",
        description: {
          intro:
            "Development is no longer just code — it’s intelligent architecture. As an AI-First Web Developer, you build platforms that are not just responsive, but adaptive. You integrate automation, AI APIs, and smart systems into scalable digital infrastructure.",
          jobEssence:
            "The role focuses on building modern web applications with AI integrations at their core. This includes implementing AI APIs, automating backend processes, optimizing performance using intelligent systems, and developing scalable AI-powered digital platforms.",
          keyRequirements: [
            "Strong expertise in modern web frameworks (Next.js / React preferred)",
            "AI API integration & automation workflows",
            "Backend & database understanding",
            "Performance optimization & scalable architecture",
            "Deployment & cloud environment familiarity",
            "Systems-thinking & innovation mindset",
          ],
          currentOpenings: ["AI Integration Engineer"],
        },
      },
    ],
  },
  {
    id: "human-resources",
    title: "Human Resources",
    jobsLabel: "1 Role",
    tone: "red",
    roles: [
      {
        id: "hr-executive",
        title: "HR Executive",
        description: {
          intro:
            "Behind every high-performing team is a strong HR backbone that attracts, nurtures, and empowers talent. As an HR Executive, you won’t just manage processes — you’ll help shape culture, drive engagement and create an environment where people do their best work.",
          jobEssence:
            "The role focuses on managing core HR operations including recruitment, onboarding, performance management, employee engagement, employer branding and compliance and as a whole ensuring smooth employee lifecycle management.",
          keyRequirements: [
            "End-to-end recruitment coordination",
            "Candidate sourcing & screening",
            "Onboarding & documentation management",
            "Performance management",
            "HR operations & compliance understanding",
            "Employee engagement initiatives",
            "Employer Branding",
            "Strong communication & interpersonal skills",
          ],
          currentOpenings: ["HR EXECUTIVE(0-2 yrs. Exp)"],
        },
      },
    ],
  },
  {
    id: "media",
    title: "Media - Social and Digital Presence",
    jobsLabel: "3 Roles",
    tone: "teal",
    roles: [
      {
        id: "smo-specialist",
        title: "Social Media Optimization Specialist - LinkedIN | Meta | X | YouTube",
        description: {
          intro:
            "Visibility is power in today’s digital-first world. Social media isn’t just about posting content — it’s about shaping perception, driving engagement, and building brand authority. If you understand how to engineer reach, relevance, and impact across platforms, we’d love to have you on board.",
          jobEssence:
            "The role focuses on optimizing social media presence across platforms to maximize reach, engagement, and performance. This includes platform-specific content optimization, trend analysis, audience behavior tracking, and data-backed strategies to ensure the brand remains memorable, relevant, and influential.",
          keyRequirements: [
            "Social Media Optimization (SMO)",
            "Platform Algorithm Understanding",
            "Content & Engagement Strategy",
            "Analytics & Performance Tracking",
            "Hashtag, Keyword & Caption Optimization",
            "SEO for Social Media",
          ],
          currentOpenings: [
            "Social Media Optimization Specialist (1–2+ Years Exp)",
            "SMO - Meta Specialist",
            "SMO - LinkedIn Specialist",
            "SMO - YouTube Specialist",
          ],
        },
      },
      {
        id: "pr-communications",
        title: "PR and Communication Executive",
        description: {
          intro:
            "Perception is powerful. In a world driven by narratives, brands don’t just need visibility — they need credibility. As a PR & Communications Executive, you shape how the world sees, hears, and remembers us. If you understand storytelling, media relationships, and strategic messaging, this role is for you.",
          jobEssence:
            "The role focuses on managing brand communication and media presence to strengthen reputation and positioning. This includes drafting press releases, coordinating with media houses, ensuring consistent brand messaging, and supporting external and internal communication strategies.",
          keyRequirements: [
            "Media relations & coordination",
            "Press release & PR content writing",
            "Brand messaging & communication strategy",
            "Crisis communication understanding",
            "Strong writing & articulation skills",
            "Relationship management & networking",
          ],
          currentOpenings: ["PR& COMMUNICATIONS EXECUTIVE (1–2+ Years Exp)"],
        },
      },
      {
        id: "influencer-marketing",
        title: "Influencer Marketing",
        description: {
          intro:
            "Influence drives action. Today’s digital conversations are shaped by creators, communities, and culture. As an Influencer Marketing Specialist, you don’t just collaborate – you build partnerships that amplify reach, relevance, and measurable impact.",
          jobEssence:
            "The role focuses on identifying, managing, and executing influencer collaborations to drive brand visibility and engagement. This includes creator research, campaign coordination, negotiation, performance tracking, and ensuring brand alignment across digital platforms.",
          keyRequirements: [
            "Influencer research & shortlisting",
            "Campaign planning & execution",
            "Negotiation & partnership management",
            "Analytics & performance tracking",
            "Platform trend & algorithm understanding",
            "Strong coordination & communication skills",
          ],
          currentOpenings: ["Influencer Marketing Specialist (2-3+ Years Exp)"],
        },
      },
    ],
  },
];
