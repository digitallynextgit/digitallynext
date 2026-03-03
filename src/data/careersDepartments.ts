export type CareersTone = "red" | "teal";

export type CareersModalStep = "department" | "role" | "description" | "form";

export type CareersRoleDescription = {
  intro: string;
  jobEssence: string;
  keyRequirements: string[];
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
    id: "intern-creative",
    title: "Creative Studio",
    jobsLabel: "3 Positions",
    tone: "teal",
    roles: [
      {
        id: "intern-graphic-designer",
        title: "Graphic Designer Intern",
        meta: "Internship | Delhi",
        summary: "Visual storytelling, design assets, and creative execution.",
        description: {
          intro:
            "Are you a visual storyteller with a passion for design? Do you see the world in colors, shapes, and patterns? Join us as a Graphic Designer Intern and let your creativity shine.",
          jobEssence:
            "You'll work on real creative briefs from day one — social media creatives, infographics, campaign assets, and announcement creatives. No busywork, only real output.",
          keyRequirements: [
            "Proficiency in Adobe Photoshop and Illustrator",
            "Strong eye for visual composition and typography",
            "Understanding of social media creative formats",
            "Familiarity with AI design tools is a plus",
            "Portfolio of personal or academic work required",
          ],
        },
      },
      {
        id: "intern-content-writer",
        title: "Content Writing Intern",
        meta: "Internship | Delhi",
        summary: "Write stories and brand-first content across digital platforms.",
        description: {
          intro:
            "Are you a wordsmith with a passion for storytelling? If you have a knack for turning ideas into compelling content, join us as a Content Writing Intern.",
          jobEssence:
            "You'll craft short-form and long-form content for brands — social captions, blogs, email copy, and campaign scripts. Every word must serve a purpose.",
          keyRequirements: [
            "Strong command of written English (Hindi is a plus)",
            "Understanding of content for social media and digital platforms",
            "Ability to adapt tone and voice per brand",
            "Basic SEO awareness",
            "Curiosity and a genuine love for language",
          ],
        },
      },
      {
        id: "intern-video-editor",
        title: "Video Editing Intern",
        meta: "Internship | Delhi",
        summary: "Edit reels, shorts, and long-form video with strong storytelling.",
        description: {
          intro:
            "Do you have a passion for storytelling through visuals? Are you a wizard with video editing software? Join us as a Video Editor Intern.",
          jobEssence:
            "You'll edit reels, short-form videos, product showcases, and brand stories. Pacing, transitions, and sound sync matter as much as the cut.",
          keyRequirements: [
            "Proficiency in Adobe Premiere Pro or DaVinci Resolve",
            "Understanding of pacing, transitions, and storytelling",
            "Experience with short-form content (Reels / Shorts)",
            "Basic knowledge of After Effects or motion graphics",
            "Portfolio of edited work required",
          ],
        },
      },
    ],
  },
  {
    id: "intern-media",
    title: "Media & Social",
    jobsLabel: "1 Position",
    tone: "red",
    roles: [
      {
        id: "intern-social-media-creator",
        title: "Social Media Content Creator Intern",
        meta: "Internship | Delhi",
        summary: "Create platform-native content and follow trends with taste.",
        description: {
          intro:
            "Are you a storyteller at heart with a flair for creating captivating content? Do you live and breathe social media trends? Join us as a Social Media Content Creator Intern.",
          jobEssence:
            "You'll create content calendars, ideate posts, write captions, and track what's trending. The best content feels native to the platform it lives on.",
          keyRequirements: [
            "Strong understanding of Instagram, LinkedIn, and X",
            "Ability to ideate and create platform-native content",
            "Writing captions that engage and convert",
            "Trend awareness and cultural relevance",
            "Basic understanding of analytics and performance",
          ],
        },
      },
    ],
  },
  {
    id: "intern-hr-dept",
    title: "Human Resources",
    jobsLabel: "1 Position",
    tone: "teal",
    roles: [
      {
        id: "intern-hr",
        title: "HR Intern",
        meta: "Internship | Delhi",
        summary: "Support recruitment, onboarding, culture, and HR operations.",
        description: {
          intro:
            "Are you passionate about people, culture, and building great workplaces? Join us as an HR Intern and help shape an engaging, high-performing work environment.",
          jobEssence:
            "You'll support recruitment coordination, candidate screening, onboarding documentation, and employee engagement activities — building your HR foundation from the ground up.",
          keyRequirements: [
            "Strong communication and interpersonal skills",
            "Organized and detail-oriented mindset",
            "Ability to maintain confidentiality",
            "Eagerness to learn HR operations and processes",
            "Proficiency in basic office tools (Sheets, Docs, etc.)",
          ],
        },
      },
    ],
  },
];

// ─── FULL-TIME DEPARTMENTS ───────────────────────────────────────────────────

export const CAREERS_DEPARTMENTS: CareersDepartment[] = [
  {
    id: "strategic-management",
    title: "Strategic Management Group",
    jobsLabel: "8 Jobs",
    tone: "red",
    roles: [
      {
        id: "strategy-general",
        title: "General Strategy Application",
        meta: "Full Time | Delhi",
        summary: "Strategy, business growth, and client success operations.",
        description: {
          intro:
            "The Strategic Management Group drives business growth, client strategy, and long-term planning. If you think in systems and have a bias for clarity, this is your team.",
          jobEssence:
            "This is an open application for strategic, business development, and operations roles within the group. Tell us your expertise and what you bring to the table.",
          keyRequirements: [
            "Strong analytical and strategic thinking",
            "Client-facing communication skills",
            "Experience in business development or consulting",
            "Data-driven decision making",
            "Stakeholder management and cross-functional coordination",
          ],
        },
      },
    ],
  },
  {
    id: "account-management",
    title: "Account Management Group",
    jobsLabel: "5 Jobs",
    tone: "teal",
    roles: [
      {
        id: "accounts-general",
        title: "Account Management Application",
        meta: "Full Time | Delhi",
        summary: "Client relationships, delivery oversight, and account growth.",
        description: {
          intro:
            "Account Management at Digitally Next means being the bridge between client ambitions and agency execution. You own the relationship and the outcome.",
          jobEssence:
            "You'll manage client briefs, coordinate with internal teams, ensure on-time delivery, and proactively identify growth opportunities within accounts.",
          keyRequirements: [
            "Strong client communication and relationship management",
            "Ability to manage multiple accounts simultaneously",
            "Understanding of digital marketing deliverables",
            "Problem-solving under pressure",
            "Excellent written and verbal communication",
          ],
        },
      },
    ],
  },
  {
    id: "project-management",
    title: "Project Management Group",
    jobsLabel: "4 Jobs",
    tone: "red",
    roles: [
      {
        id: "pm-general",
        title: "Project Management Application",
        meta: "Full Time | Delhi",
        summary: "Cross-team delivery, timelines, and execution clarity.",
        description: {
          intro:
            "The Project Management Group ensures ideas turn into flawless execution. If you keep teams aligned and timelines honest, this is your group.",
          jobEssence:
            "You'll coordinate between creative, performance, and tech teams — managing timelines, resolving blockers, and ensuring project delivery at the highest quality.",
          keyRequirements: [
            "Strong project planning and coordination skills",
            "Experience with tools like Asana, Notion, or Jira",
            "Ability to manage multiple concurrent projects",
            "Clear communicator across teams",
            "Problem-solving and escalation management",
          ],
        },
      },
    ],
  },
  {
    id: "creative-studio",
    title: "Creative Studio",
    jobsLabel: "7 Jobs",
    tone: "teal",
    roles: [
      {
        id: "junior-graphic",
        title: "Junior Graphic Designer",
        meta: "Full Time | 1–2 Years Exp | Delhi",
        summary: "Visual assets across social, landing pages, and campaigns.",
        description: {
          intro:
            "Fine arts, visual finesse, and visual treats are what our clients demand. We're looking for modern-day artists who can be inspired by Michelangelo and know how to create captivating visual treats for today's audience.",
          jobEssence:
            "Sound understanding of visual content assets — Infographics, Memes, Social Media creatives, Comic Strips, Mind Maps, Caricatures, Announcement creatives, and landing pages based on storyboarding/trend-specific scenarios.",
          keyRequirements: [
            "Visualization and strong conceptual thinking",
            "Adobe Photoshop and Illustrator proficiency",
            "Any other related creative software",
            "Familiarity with AI-enabled design tools",
            "Strong attention to brand consistency",
          ],
        },
      },
      {
        id: "senior-graphic",
        title: "Senior Graphic Designer",
        meta: "Full Time | Delhi",
        summary: "Own design output quality, consistency, and creative direction.",
        description: {
          intro:
            "A Senior Graphic Designer at Digitally Next leads by example — setting the visual standard and mentoring junior creatives while delivering high-impact brand work.",
          jobEssence:
            "You'll handle complex visual briefs, maintain brand identity across campaigns, and collaborate closely with the Creative Head and content team for cohesive storytelling.",
          keyRequirements: [
            "Advanced Adobe Photoshop and Illustrator",
            "Strong portfolio across brand and campaign work",
            "Design leadership and ability to mentor juniors",
            "Cross-platform visual adaptation",
            "Familiarity with AI-enabled design tools",
          ],
        },
      },
      {
        id: "junior-video",
        title: "Junior Video Editor",
        meta: "Full Time | 1–2 Years Exp | Delhi",
        summary: "Reels, edits, motion, multi-format brand content.",
        description: {
          intro:
            "Every video you edit should be a movie, a story, a legendary portfolio — capable of moving mountains and arousing emotions. We're looking for someone who creates memories.",
          jobEssence:
            "Sound understanding of Podcasts, Reels, video shoots with multiple camera setups, YouTube, OTTs, Motion Graphics, Explanatory videos, and Streaming/News-centric content.",
          keyRequirements: [
            "Adobe After Effects and Premiere Pro",
            "Any related video editing software",
            "Cinematography and storytelling-led video editing",
            "Familiarity with AI-enabled video outputs",
            "Strong sense of pacing and audio sync",
          ],
        },
      },
      {
        id: "senior-video",
        title: "Senior Video Editor",
        meta: "Full Time | Delhi",
        summary: "Lead complex video productions from shoot to final cut.",
        description: {
          intro:
            "A Senior Video Editor at Digitally Next doesn't just cut — they direct narratives. You'll own production quality and bring cinematic storytelling to brand content.",
          jobEssence:
            "Handle end-to-end video production from multi-camera shoot coordination to final delivery across OTT, YouTube, and social platforms. Mentor junior editors.",
          keyRequirements: [
            "Expert-level Adobe Premiere Pro and After Effects",
            "Color grading and audio mixing",
            "Multi-camera production experience",
            "Motion graphics and animation skills",
            "Strong storytelling and narrative structure",
          ],
        },
      },
      {
        id: "content-storyteller",
        title: "Content Storyteller",
        meta: "Full Time | Delhi",
        summary: "Short + long form storytelling with a performance lens.",
        description: {
          intro:
            "It's only words…and the words are all I have. We're looking for those who can feel the soul of a brand and communicate it to build a real connect with its audience.",
          jobEssence:
            "Sound understanding of storytelling across creative writing for digital and social mediums, PR outreach, business and commercial aspects. Ideal to be adept in both short and long form writing.",
          keyRequirements: [
            "Creative writing for social media and digital platforms",
            "Commercial and campaign-driven copywriting",
            "SEO → AEO → GEO driven content journeys",
            "Performance-based campaign storytelling",
            "Media and brand outreach communication",
          ],
        },
      },
      {
        id: "content-lead",
        title: "Content Lead",
        meta: "Full Time | Delhi",
        summary: "Lead content strategy and a team of storytellers.",
        description: {
          intro:
            "The Content Lead at Digitally Next sets the narrative direction for all brand communication. You build the content system, not just the content.",
          jobEssence:
            "You'll manage a team of writers, align content to business goals, oversee content calendars, and ensure every piece published has clarity, purpose, and impact.",
          keyRequirements: [
            "5+ years of content creation and strategy",
            "Team leadership and editorial oversight",
            "Strong understanding of SEO and AEO content journeys",
            "Campaign planning and cross-team coordination",
            "Exceptional writing and editing skills",
          ],
        },
      },
      {
        id: "creative-manager",
        title: "Creative Manager",
        meta: "Full Time | 4–5+ Years Exp | Delhi",
        summary: "Lead design, video, content, and social teams.",
        description: {
          intro:
            "Creativity scales only when it's managed well. This role is for someone who can lead, align, and elevate video, design, content, and social media teams to deliver consistent, high-impact brand communication.",
          jobEssence:
            "Manage end-to-end creative execution across video, graphic design, content, and social media — team coordination, quality control, campaign alignment, and platform-optimized delivery.",
          keyRequirements: [
            "Creative team management (Video, Graphic, Content & Social)",
            "Content and campaign planning",
            "Social media strategy and execution oversight",
            "Quality control and brand consistency",
            "Cross-functional coordination — must have agency experience",
            "Familiarity with AI-enabled creative tools",
          ],
        },
      },
    ],
  },
  {
    id: "performance",
    title: "Performance (Organic and Paid)",
    jobsLabel: "5 Jobs",
    tone: "red",
    roles: [
      {
        id: "seo-junior",
        title: "Junior SEO Executive",
        meta: "Full Time | 1–2 Years Exp | Delhi",
        summary: "On-page, off-page, and technical SEO fundamentals.",
        description: {
          intro:
            "It's not just keywords — it's the art of being discovered. Like hidden trails leading to breathtaking views, your expertise ensures brands are found where it matters most.",
          jobEssence:
            "Deep understanding of search engine optimization across on-page, off-page, and technical aspects. Analyze trends, optimize content, and improve visibility through data-driven insights.",
          keyRequirements: [
            "On-page and off-page SEO fundamentals",
            "Keyword research and competitor analysis",
            "Technical SEO and site audits",
            "Content optimization and link-building strategies",
            "Familiarity with Google Analytics, Search Console, and SEMrush",
          ],
        },
      },
      {
        id: "seo-specialist",
        title: "SEO Specialist",
        meta: "Full Time | Delhi",
        summary: "Drive measurable organic growth across accounts.",
        description: {
          intro:
            "An SEO Specialist at Digitally Next goes beyond rankings — you engineer discoverability from SEO to GEO to AEO, shaping how brands are found across search and AI surfaces.",
          jobEssence:
            "Own organic strategy across multiple client accounts — technical audits to content optimization, link building to performance reporting. Track what moves the needle.",
          keyRequirements: [
            "3+ years of hands-on SEO experience",
            "Advanced technical SEO and site architecture knowledge",
            "SEO → GEO → AEO transition understanding",
            "Strong analytics and reporting (GA4, Search Console, SEMrush)",
            "Content strategy alignment with organic growth goals",
          ],
        },
      },
      {
        id: "seo-lead",
        title: "SEO Lead",
        meta: "Full Time | Delhi",
        summary: "Lead SEO strategy and guide a team of specialists.",
        description: {
          intro:
            "The SEO Lead at Digitally Next sets the direction for how brands are discovered. You combine deep technical expertise with strategic thinking to drive compounding organic growth.",
          jobEssence:
            "Define and execute SEO strategy across the agency's client portfolio — leading a team, managing audits, shaping content strategy, and reporting performance to leadership.",
          keyRequirements: [
            "5+ years of SEO experience with team leadership",
            "End-to-end SEO strategy (technical, on-page, off-page)",
            "AI search and GEO optimization understanding",
            "Strong client communication and presentation skills",
            "Agency experience preferred",
          ],
        },
      },
      {
        id: "performance-marketer-mid",
        title: "Performance Marketer",
        meta: "Full Time | 2–3 Years Exp | Delhi",
        summary: "Run paid campaigns across Meta, Google, and LinkedIn.",
        description: {
          intro:
            "Strategy, plan, and process make a digital campaign more effective. Operational understanding alone doesn't move results anymore — and if you believe that too, we're looking for you.",
          jobEssence:
            "Craft and implement data-driven paid campaigns that optimize user engagement, leveraging insights to deliver measurable business growth and impactful results.",
          keyRequirements: [
            "Paid media setup — Meta, Google, LinkedIn, Quora, Bing",
            "Google Analytics and conversion tracking",
            "Organic marketing and ORM understanding",
            "Result-centric landing page knowledge",
            "Must have experience with D2C brands",
          ],
        },
      },
      {
        id: "performance-marketer-senior",
        title: "Senior Performance Marketer",
        meta: "Full Time | 4–7 Years Exp | Delhi",
        summary: "Lead performance strategy and scale high-spend accounts.",
        description: {
          intro:
            "A Senior Performance Marketer at Digitally Next runs the full funnel — from strategy to spend optimization to scaled outcomes. You bring data confidence and creative judgment.",
          jobEssence:
            "Own performance strategy for high-budget accounts, lead campaign architecture, mentor junior marketers, and collaborate with the creative team on performance-led content.",
          keyRequirements: [
            "4–7 years of paid media experience",
            "Advanced Meta Ads, Google Ads, and LinkedIn Ads",
            "Budget management and ROAS optimization at scale",
            "Performance reporting and client communication",
            "D2C and lead generation campaign experience",
          ],
        },
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
        title: "Junior Full Stack Developer",
        meta: "Full Time | 0–2 Years Exp | Delhi",
        summary: "Next.js, React, and strong fundamentals to build real products.",
        description: {
          intro:
            "Turning code into high-impact brand experiences. This role goes beyond building websites — it's about engineering fast, scalable, and conversion-focused platforms from day one.",
          jobEssence:
            "Build end-to-end web applications using modern frontend and backend technologies. Develop scalable architectures, optimize for performance and SEO, integrate APIs, and manage deployments.",
          keyRequirements: [
            "Strong expertise in Next.js and React.js",
            "TypeScript / JavaScript proficiency",
            "Frontend + Backend integration (Node.js and/or Python)",
            "Database handling (Supabase, NeonDB, AWS databases)",
            "ORM tools like Prisma / Drizzle",
            "Responsive UI development and Figma collaboration",
            "Deployment via Vercel / AWS, Git & GitHub with CI/CD",
            "Familiarity with AI-enabled tools",
          ],
        },
      },
      {
        id: "senior-fullstack",
        title: "Senior Full Stack Developer",
        meta: "Full Time | 2–4 Years Exp | Delhi",
        summary: "Own features end-to-end, scale systems, and mentor juniors.",
        description: {
          intro:
            "A Senior Full Stack Developer at Digitally Next architects solutions, not just features. You have strong ownership, think in systems, and ship production-grade code.",
          jobEssence:
            "Lead full-stack development on complex projects — designing scalable architectures, reviewing code, integrating third-party services, and ensuring performance across all layers.",
          keyRequirements: [
            "2–4 years of full-stack development experience",
            "Advanced Next.js, React.js, and TypeScript",
            "Strong backend skills (Node.js, NestJS, or Python)",
            "Database optimization and schema design (Prisma, PostgreSQL)",
            "CI/CD, Docker, and cloud deployment (AWS, Vercel)",
            "DNS, hosting, and domain management",
            "Code review and architecture decision-making",
          ],
        },
      },
      {
        id: "ai-integration",
        title: "AI Integration Engineer",
        meta: "Full Time | Delhi",
        summary: "Build AI-powered platforms with strong ownership.",
        description: {
          intro:
            "Development is no longer just code — it's intelligent architecture. As an AI Integration Engineer, you build platforms that are adaptive and AI-native by design.",
          jobEssence:
            "Build modern web applications with AI integrations at their core — implementing AI APIs, automating backend processes, optimizing performance using intelligent systems.",
          keyRequirements: [
            "Strong expertise in Next.js and React (preferred)",
            "AI API integration and automation workflows",
            "Backend and database understanding",
            "Performance optimization and scalable architecture",
            "Deployment and cloud environment familiarity",
            "Systems-thinking and innovation mindset",
          ],
        },
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
        meta: "Full Time | Delhi",
        summary: "Decision systems, analytics, and automation workflows.",
        description: {
          intro:
            "Intelligence is the new competitive advantage. At ADAC, we don't just use AI — we design decision systems that accelerate growth. You turn data into direction and insights into action.",
          jobEssence:
            "Leverage data, AI tools, and analytical frameworks to drive smarter business decisions — identifying automation opportunities, building AI-powered workflows, and translating complex insights into clear strategic recommendations.",
          keyRequirements: [
            "Strong analytical and data interpretation skills",
            "Understanding of AI tools, automation, and decision systems",
            "Business strategy alignment with AI insights",
            "Data visualization and reporting",
            "Process optimization and research-driven mindset",
          ],
        },
      },
      {
        id: "ai-content-specialist",
        title: "AI Content & Creative Specialist",
        meta: "Full Time | Delhi",
        summary: "AI-assisted content and visuals while keeping brand tone.",
        description: {
          intro:
            "Creativity is evolving — and AI is its new co-creator. This role sits at the intersection of imagination and intelligence. If you know how to use AI as a creative accelerator, you'll thrive here.",
          jobEssence:
            "Leverage AI tools to enhance content creation, visual storytelling, and creative workflows — generating AI-assisted copies, visuals, and campaign ideas while ensuring brand consistency.",
          keyRequirements: [
            "Proficiency with AI content and creative tools",
            "Prompt engineering and structured AI workflows",
            "Content strategy and brand tone understanding",
            "AI-assisted design and ideation",
            "Strong storytelling and creative experimentation mindset",
          ],
        },
      },
      {
        id: "ai-performance-specialist",
        title: "AI Performance & Media Specialist",
        meta: "Full Time | Delhi",
        summary: "AI-driven optimization for scale and efficiency.",
        description: {
          intro:
            "Performance marketing meets machine intelligence. Use AI to optimize media spends, automate decision-making, and unlock smarter scaling across digital platforms.",
          jobEssence:
            "Integrate AI tools into paid media and performance strategies — campaign automation, audience modeling, predictive insights, budget optimization, and data-driven scaling.",
          keyRequirements: [
            "Performance marketing expertise (paid media and analytics)",
            "AI-based campaign optimization tools",
            "Data interpretation and forecasting",
            "Automation workflows for ad platforms",
            "ROI and conversion-driven mindset",
          ],
        },
      },
      {
        id: "ai-first-web-dev",
        title: "AI-First Web Developer",
        meta: "Full Time | Delhi",
        summary: "Build AI-native platforms with ownership and precision.",
        description: {
          intro:
            "Development is no longer just code — it's intelligent architecture. As an AI-First Web Developer at ADAC, you build platforms that are adaptive and AI-native by design.",
          jobEssence:
            "Build modern web applications with AI integrations at their core — implementing AI APIs, automating backend processes, and developing scalable AI-powered digital platforms.",
          keyRequirements: [
            "Strong expertise in Next.js and React (preferred)",
            "AI API integration and automation workflows",
            "Backend and database understanding",
            "Performance optimization and scalable architecture",
            "Deployment and cloud environment familiarity",
            "Systems-thinking and innovation mindset",
          ],
        },
      },
    ],
  },
  {
    id: "human-resources",
    title: "Human Resources",
    jobsLabel: "2 Jobs",
    tone: "red",
    roles: [
      {
        id: "hr-executive",
        title: "HR Executive",
        meta: "Full Time | 0–2 Years Exp | Delhi",
        summary: "Recruitment, onboarding, operations, and engagement.",
        description: {
          intro:
            "Behind every high-performing team is a strong HR backbone. As an HR Executive at Digitally Next, you won't just manage processes — you'll help shape culture and create an environment where people do their best work.",
          jobEssence:
            "Manage core HR operations including recruitment, onboarding, performance management, employee engagement, employer branding, and compliance — ensuring smooth employee lifecycle management.",
          keyRequirements: [
            "End-to-end recruitment coordination",
            "Candidate sourcing and screening",
            "Onboarding and documentation management",
            "Performance management and HR compliance",
            "Employee engagement initiatives and employer branding",
            "Strong communication and interpersonal skills",
          ],
        },
      },
      {
        id: "hr-general",
        title: "General HR Application",
        meta: "Apply | Delhi",
        summary: "Open application for all HR roles at Digitally Next.",
        description: {
          intro:
            "Don't see your exact role listed? Submit a general HR application and tell us what you bring to the team.",
          jobEssence:
            "We're always looking for sharp HR professionals who add value across talent acquisition, operations, engagement, and culture building.",
          keyRequirements: [
            "Clear understanding of your HR specialty",
            "Strong communication skills",
            "People-first mindset",
            "Relevant experience in HR operations",
          ],
        },
      },
    ],
  },
  {
    id: "media",
    title: "Media - Social and Digital Presence",
    jobsLabel: "5 Jobs",
    tone: "teal",
    roles: [
      {
        id: "smo-specialist",
        title: "Social Media Optimization Specialist",
        meta: "Full Time | 1–2+ Years Exp | Delhi",
        summary: "Platform optimization and analytics-driven social growth.",
        description: {
          intro:
            "Visibility is power. Social media isn't just about posting — it's about shaping perception, driving engagement, and building brand authority.",
          jobEssence:
            "Optimize social media presence across platforms to maximize reach, engagement, and performance — platform-specific content optimization, trend analysis, audience behavior tracking, and data-backed strategies.",
          keyRequirements: [
            "Social Media Optimization (SMO) across platforms",
            "Platform algorithm understanding (LinkedIn, Meta, X, YouTube)",
            "Content and engagement strategy",
            "Analytics and performance tracking",
            "Hashtag, keyword, and caption optimization",
          ],
        },
      },
      {
        id: "smo-meta",
        title: "SMO – Meta Specialist",
        meta: "Full Time | Delhi",
        summary: "Own Meta presence — content, optimization, and growth.",
        description: {
          intro:
            "Meta is still the largest social platform for brand storytelling. As an SMO Meta Specialist, you engineer reach and engagement through content, community, and algorithm understanding.",
          jobEssence:
            "Manage and optimize brand presence on Facebook and Instagram — content strategy, community management, reel optimization, ad-organic sync, and performance reporting.",
          keyRequirements: [
            "Deep understanding of Instagram and Facebook algorithms",
            "Content strategy and visual storytelling for Meta",
            "Engagement rate and reach optimization",
            "Reel and story best practices",
            "Analytics via Meta Business Suite",
          ],
        },
      },
      {
        id: "smo-linkedin",
        title: "SMO – LinkedIn Specialist",
        meta: "Full Time | Delhi",
        summary: "Build LinkedIn brand authority and thought leadership.",
        description: {
          intro:
            "LinkedIn is where B2B credibility is built. As an SMO LinkedIn Specialist, you shape how brands and founders show up on the world's largest professional network.",
          jobEssence:
            "Manage LinkedIn content strategy, optimize profiles and pages, build engagement through thought leadership content, and drive organic reach for brand and personal profiles.",
          keyRequirements: [
            "Deep understanding of LinkedIn algorithm and content formats",
            "Thought leadership content writing",
            "LinkedIn analytics and performance tracking",
            "B2B social strategy expertise",
            "Newsletter and document post optimization",
          ],
        },
      },
      {
        id: "pr-communications",
        title: "PR & Communications Executive",
        meta: "Full Time | 1–2+ Years Exp | Delhi",
        summary: "Press releases, media coordination, and brand messaging.",
        description: {
          intro:
            "Perception is powerful. Brands don't just need visibility — they need credibility. As a PR & Communications Executive, you shape how the world sees, hears, and remembers us.",
          jobEssence:
            "Manage brand communication and media presence to strengthen reputation and positioning — press releases, media coordination, brand messaging, and communication strategies.",
          keyRequirements: [
            "Media relations and coordination",
            "Press release and PR content writing",
            "Brand messaging and communication strategy",
            "Crisis communication understanding",
            "Strong writing, articulation, and networking skills",
          ],
        },
      },
      {
        id: "influencer-marketing",
        title: "Influencer Marketing Specialist",
        meta: "Full Time | 2–3+ Years Exp | Delhi",
        summary: "Build creator partnerships that amplify reach and impact.",
        description: {
          intro:
            "Influence drives action. Today's digital conversations are shaped by creators, communities, and culture. You don't just collaborate — you build partnerships that drive measurable impact.",
          jobEssence:
            "Identify, manage, and execute influencer collaborations to drive brand visibility and engagement — creator research, campaign coordination, negotiation, performance tracking.",
          keyRequirements: [
            "Influencer research and shortlisting",
            "Campaign planning and execution",
            "Negotiation and partnership management",
            "Analytics and performance tracking",
            "Platform trend and algorithm understanding",
            "Strong coordination and communication skills",
          ],
        },
      },
    ],
  },
];
