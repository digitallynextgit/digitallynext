export type CareersTone = 'red' | 'teal';

export type CareersModalStep = 'group' | 'subDepartment';
export type CareersMode = 'full-time' | 'internship';

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

export type CareersDepartmentGroup = {
  id: string;
  code: string;
  title: string;
  jobsLabel: string;
  tone: CareersTone;
  subDepartments: CareersDepartment[];
};

export type CareerRoleEntry = {
  group: CareersDepartmentGroup;
  department: CareersDepartment;
  role: CareersRole;
  mode: CareersMode;
  groupSlug: string;
  departmentSlug: string;
  roleSlug: string;
};

function slugifyCareerRole(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[‒-―]/g, '-')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

// ─── INTERNSHIP GROUPS ──────────────────────────────────────────────────────
// Wrapped as a single-group structure so the modal API is uniform.

export const CAREERS_INTERNSHIP_GROUPS: CareersDepartmentGroup[] = [
  {
    id: 'internships',
    code: 'Internships',
    title: 'Internships',
    jobsLabel: 'Explore Open Positions',
    tone: 'teal',
    subDepartments: [
      {
        id: 'internships',
        title: 'Internships',
        jobsLabel: 'Explore Open Positions',
        tone: 'teal',
        roles: [
          {
            id: 'intern-seo-aeo',
            title: 'SEO / AEO Intern',
            description: {
              intro:
                'Are you passionate about digital marketing, search engines and AI-driven search? Do you enjoy optimizing content and improving online visibility? Join us as an SEO / AEO Intern and gain hands-on experience in SEO, AEO, content strategy and organic growth.',
            },
          },
          {
            id: 'intern-digital-marketing',
            title: 'Digital Marketing Intern',
            description: {
              intro:
                'Are you someone who lives and breathes trends, creativity, and content? Do you enjoy blending strategy with aesthetics- whether it’s SEO, Graphics, Video editing or Social media? Join us as a Digital Marketing Intern and turn your ideas into impactful campaigns.',
            },
          },
          {
            id: 'intern-graphic-designer',
            title: 'Graphic Designer Intern',
            description: {
              intro:
                'Are you a visual storyteller with a passion for design? Do you see the world in colors, shapes, and patterns? Join us as a Graphic Designer Intern and let your creativity shine.',
            },
          },
          {
            id: 'intern-content-writer',
            title: 'Content Writing Intern',
            description: {
              intro:
                'Are you a wordsmith with a passion for storytelling? If you have a knack for turning ideas into compelling content, join us as a Content Writing Intern.',
            },
          },
          {
            id: 'intern-video-editor',
            title: 'Video Editing Intern',
            description: {
              intro:
                'Do you have a passion for storytelling through visuals? Are you a wizard with video editing software? If so, we have an exciting opportunity for you! Join us as a Video Editor Intern and help us create compelling visual content that captivates and inspires.',
            },
          },
          {
            id: 'intern-social-media-creator',
            title: 'Social Media Content Creator Intern',
            description: {
              intro:
                'Are you a storyteller at heart with a flair for creating captivating content? Do you live and breathe social media trends? If so, we have the perfect opportunity for you! Join us as a Social Media Content Creator Intern and help us tell our story to the world.',
            },
          },
          {
            id: 'intern-hr',
            title: 'HR Intern',
            description: {
              intro:
                'Are you passionate about people, culture and building great workplaces? Do you enjoy organizing, communicating and being the go-to person who keeps things running smoothly? If so, we have the perfect opportunity for you! Join us as an HR Intern and be a part of shaping an engaging and high-performing work environment.',
            },
          },
        ],
      },
    ],
  },
];

// ─── FULL-TIME GROUPS ───────────────────────────────────────────────────────
// Mirrors the official "Digitally Next - Organisational Structure" doc:
//   SMG  ─┬─ BSG (Business Support Group)
//         └─ MSG (Marketing Services Group)
//   ADAC ─┬─ PMG (Project Management Group)
//         └─ AI Enablement
//   AMG  (single sub-department: Key Account Managers)
//   MAP  ─┬─ WEM (Web Essentials Management)
//         └─ VIM (Visual Impact Management)
//   HR   (single sub-department: Human Resources)

export const CAREERS_DEPARTMENT_GROUPS: CareersDepartmentGroup[] = [
  // ─── SMG — Strategic Management Group ─────────────────────────────────
  {
    id: 'smg',
    code: 'SMG',
    title: 'Strategic Management Group',
    jobsLabel: 'Explore Sub-Departments',
    tone: 'teal',
    subDepartments: [
      {
        id: 'business-support-group',
        title: 'BSG — Business Support Group',
        jobsLabel: 'Explore Open Roles',
        tone: 'teal',
        roles: [
          {
            id: 'business-relations-lead',
            title: 'Business Relations Lead',
            description: {
              intro:
                'Growth today is global. Influence is built through relationships. We’re looking for a Strategic Relations – Lead who can open international corridors, build powerful alliances, and drive expansion across the US and Middle East markets. This isn’t business development. This is strategic expansion through trust, positioning, and high-value partnerships.',
              jobEssence:
                'Lead international growth by identifying and securing high-value clients and strategic partners across overseas markets. Build long-term alliances, own cross-border conversations, and position the organization as a trusted global partner. Drive revenue through relationship architecture, market intelligence, and structured expansion strategy.',
              keyRequirements: [
                '3–5 years of experience in international growth, partnerships, consulting, or strategic roles',
                'Strong exposure to Indian, US and Middle East markets',
                'Proven ability to build and close high-value international relationships',
                'Strong negotiation, communication, and stakeholder management skills',
                'Strategic mindset with clear revenue-growth orientation',
                'Cultural intelligence and ability to operate across time zones',
                'Understanding of digital/agency/consulting ecosystems preferred',
              ],
            },
          },
        ],
      },
      {
        id: 'marketing-services-group',
        title: 'MSG — Marketing Services Group',
        jobsLabel: 'Explore Open Roles',
        tone: 'red',
        roles: [
          {
            id: 'content-writers',
            title: 'Content Writers / Copywriters',
            description: {
              intro:
                'It’s Only Words ..and the words are all I have ..to take your heart away… Or Country Roads take me home …. Or Har rang kuchh kehta hai… We are looking for those who can feel the soul of seasons, the flora and fauna, the mountains, and the river…similarly if they feel the soul, the character of a brand to communicate and build the connect with its audience!',
              jobEssence:
                'Having a sound understanding of storytelling in terms of creative writing on digital and social mediums, PR outreach, business and commercial aspects. Ideal to be adept in both short and long form writing.',
              keyRequirements: [
                'Creative Writing for Social Media & Digital Platforms',
                'Commercial Writing',
                'SEO to AEO to GEO driven content journeys',
                'Performance based Campaign storytelling',
                'Media and brand outreach communication',
              ],
              currentOpenings: ['Junior content writer (1-2 Years Exp)', 'Senior content creator', 'Content Lead'],
            },
          },
          {
            id: 'digital-marketing-executive',
            title: 'Digital Marketing Executive',
            description: {
              intro:
                'Driving brands from visibility to impact. In today’s fast-moving digital landscape, marketing is more than posting content, it’s about building meaningful connections, generating engagement, and creating measurable business growth. If you’re creative, data-driven, and passionate about digital trends, this role is for you.',
              jobEssence:
                'The role focuses on planning, executing, and optimizing digital marketing campaigns across multiple online channels. This includes content strategy, social media management, paid advertising, performance tracking, audience engagement, and leveraging data-driven insights to enhance brand visibility and drive conversions.',
              keyRequirements: [
                'Strong understanding of Digital Marketing fundamentals',
                'Social Media Marketing & Community Management',
                'Content Planning & Campaign Execution',
                'SEO & SEM knowledge',
                'Google Ads, Meta Ads & Performance Marketing',
                'Email Marketing & Lead Generation',
                'Analytics tools (Google Analytics, Search Console, Meta Insights)',
                'Content writing & copywriting skills',
                'Marketing automation tools familiarity',
                'Influencer & partnership coordination',
                'Strong communication and creative thinking skills',
                'Campaign performance reporting & optimization',
                'Familiarity with AI-enabled marketing tools',
              ],
              currentOpenings: ['Digital Marketing Executive (1-2 Years Exp)'],
            },
          },
          {
            id: 'smo-specialist',
            title: 'SMO - Social Media Optimisation - LinkedIN | Meta | X | YouTube',
            description: {
              intro:
                'Visibility is power in today’s digital-first world. Social media isn’t just about posting content — it’s about shaping perception, driving engagement, and building brand authority. If you understand how to engineer reach, relevance, and impact across platforms, we’d love to have you on board.',
              jobEssence:
                'The role focuses on optimizing social media presence across platforms to maximize reach, engagement, and performance. This includes platform-specific content optimization, trend analysis, audience behavior tracking, and data-backed strategies to ensure the brand remains memorable, relevant, and influential.',
              keyRequirements: [
                'Social Media Optimization (SMO)',
                'Platform Algorithm Understanding',
                'Content & Engagement Strategy',
                'Analytics & Performance Tracking',
                'Hashtag, Keyword & Caption Optimization',
                'SEO for Social Media',
              ],
              currentOpenings: [
                'Social Media Optimization Specialist (1–2+ Years Exp)',
                'SMO - Meta Specialist',
                'SMO - LinkedIn Specialist',
                'SMO - YouTube Specialist',
              ],
            },
          },
          {
            id: 'pr-communications-executive',
            title: 'PR and Communications Executive',
            description: {
              intro:
                'Perception is powerful. In a world driven by narratives, brands don’t just need visibility — they need credibility. As a PR & Communications Executive, you shape how the world sees, hears, and remembers us. If you understand storytelling, media relationships, and strategic messaging, this role is for you.',
              jobEssence:
                'The role focuses on managing brand communication and media presence to strengthen reputation and positioning. This includes drafting press releases, coordinating with media houses, ensuring consistent brand messaging, and supporting external and internal communication strategies.',
              keyRequirements: [
                'Media relations & coordination',
                'Press release & PR content writing',
                'Brand messaging & communication strategy',
                'Crisis communication understanding',
                'Strong writing & articulation skills',
                'Relationship management & networking',
              ],
              currentOpenings: ['PR & COMMUNICATIONS EXECUTIVE (1–2+ Years Exp)'],
            },
          },
          {
            id: 'influencer-marketing',
            title: 'Influencer Marketing',
            description: {
              intro:
                'Influence drives action. Today’s digital conversations are shaped by creators, communities, and culture. As an Influencer Marketing Specialist, you don’t just collaborate – you build partnerships that amplify reach, relevance, and measurable impact.',
              jobEssence:
                'The role focuses on identifying, managing, and executing influencer collaborations to drive brand visibility and engagement. This includes creator research, campaign coordination, negotiation, performance tracking, and ensuring brand alignment across digital platforms.',
              keyRequirements: [
                'Influencer research & shortlisting',
                'Campaign planning & execution',
                'Negotiation & partnership management',
                'Analytics & performance tracking',
                'Platform trend & algorithm understanding',
                'Strong coordination & communication skills',
              ],
              currentOpenings: ['Influencer Marketing Specialist (2-3+ Years Exp)'],
            },
          },
          {
            id: 'performance-marketer',
            title: 'Performance Marketer',
            description: {
              intro:
                'Strategy, plan, and process make a digital campaign more effective and perform better. Only operational understanding or knowledge of tools won’t give any results anymore. If that’s what you also think, then we are looking for you.',
              jobEssence:
                'The role focuses on crafting and implementing data-driven campaigns that optimize user engagement, leveraging insights to deliver measurable business growth and impactful results.',
              keyRequirements: [
                'Paid media setups - Meta | Google | LinkedIn | Quora | Bing',
                'Google Analytics',
                'Organic marketing, including ORM',
                'Result centric landing page knowledge',
                'Must have experience of D2C brands',
              ],
              currentOpenings: ['Performance Marketer (2-3 Years Exp)', 'Performance Marketer (4-7 Years Exp)'],
            },
          },
          {
            id: 'seo-specialist',
            title: 'SEO - Search Engine Optimisation Specialist',
            description: {
              intro:
                'It’s not just keywords… it’s the art of being discovered. Like hidden trails leading to breathtaking views, or a compass guiding travelers home, your expertise ensures brands are found where it matters most. We’re looking for someone who understands the rhythm of search engines, the pulse of online audiences, and can weave strategy with creativity to amplify a brand’s digital heartbeat.',
              jobEssence:
                'Having a deep understanding of search engine optimization across on-page, off-page, and technical aspects. Skilled in analyzing trends, optimizing content, and improving website visibility. Ideal for someone who can blend data-driven insights with creative problem-solving to drive measurable growth.',
              keyRequirements: [
                'On-page and off-page SEO',
                'Keyword research and competitor analysis',
                'Technical SEO and site audits',
                'Content optimization and link-building strategies',
                'Journey from SEO>GEO>AEO',
                'Familiarity with tools like Google Analytics, Search Console, and SEMrush',
              ],
              currentOpenings: ['Junior SEO Executive (1-2 Years Exp)', 'SEO Specialist', 'SEO Lead'],
            },
          },
        ],
      },
    ],
  },

  // ─── ADAC — AI Decision and Acceleration Centre ───────────────────────
  {
    id: 'adac',
    code: 'ADAC',
    title: 'AI Decision and Acceleration Centre',
    jobsLabel: 'Explore Sub-Departments',
    tone: 'red',
    subDepartments: [
      {
        id: 'project-management-group',
        title: 'PMG — Project Management Group',
        jobsLabel: 'Explore Open Roles',
        tone: 'teal',
        roles: [
          {
            id: 'project-controller',
            title: 'Project Controller',
            description: {
              intro:
                'Great ideas fail without great execution. We’re looking for a system-driven Project Manager who builds structure, drives operational clarity, and integrates AI into execution across teams.',
              jobEssence:
                'Lead and streamline the entire Create–Publish–Promote lifecycle with structured execution and operational clarity. Align budgets with bandwidth, validate Time & Effort vs Cost metrics, drive AI-enabled process optimization, and ensure seamless coordination across teams to deliver projects on time, with quality and profitability.',
              keyRequirements: [
                '3–4 years of experience in Digital / Creative Agencies or Consulting',
                'Strong operational & database management skills',
                'Ability to manage parallel projects under structured timelines',
                'Expertise in Excel & PowerPoint',
                'Familiarity with GSC, Notion or similar PM/CRM tools',
                'Exposure to automation & AI-enabled workflows',
                'Strong analytical and reporting capabilities',
                'Clear communication and coordination mindset',
              ],
            },
          },
        ],
      },
      {
        id: 'ai-enablement',
        title: 'AI Enablement',
        jobsLabel: 'Explore Open Roles',
        tone: 'red',
        roles: [
          {
            id: 'ai-ml-engineers',
            title: 'AI/ML Engineers',
            description: {
              intro:
                'Development is no longer just code, it’s intelligent architecture. As an AI-First Web Developer, you build platforms that are not just responsive, but adaptive. You integrate automation, AI APIs, and smart systems into scalable digital infrastructure.',
              jobEssence:
                'The role focuses on building modern web applications with AI integrations at their core. This includes implementing AI APIs, automating backend processes, optimizing performance using intelligent systems, and developing scalable AI-powered digital platforms.',
              keyRequirements: [
                'Strong expertise in modern web frameworks (Next.js / React preferred)',
                'AI API integration & automation workflows',
                'Backend & database understanding',
                'Performance optimization & scalable architecture',
                'Deployment & cloud environment familiarity',
                'Systems-thinking & innovation mindset',
              ],
              currentOpenings: ['AI Integration Engineer'],
            },
          },
        ],
      },
    ],
  },

  // ─── AMG — Account Management Group ───────────────────────────────────
  {
    id: 'amg',
    code: 'AMG',
    title: 'Account Management Group',
    jobsLabel: 'Explore Open Roles',
    tone: 'teal',
    subDepartments: [
      {
        id: 'key-account-managers',
        title: 'Key Account Managers',
        jobsLabel: 'Explore Open Roles',
        tone: 'teal',
        roles: [
          {
            id: 'key-account-manager',
            title: 'Key Account Manager',
            description: {
              intro:
                'Strategic thinking, operational structure, and financial clarity are what our clients demand. We’re looking for Account Managers who can translate business goals into actionable digital plans, align internal teams seamlessly, and ensure every account grows profitably while maintaining long-term client relationships.',
              jobEssence:
                'Sound understanding of client lifecycle management, brand brief creation, inter-department coordination, structured execution planning, profitability tracking, reporting alignment with performance metrics, and identifying upsell or growth opportunities within existing accounts.',
              keyRequirements: [
                '2-3 years of experience in Consulting firms and/or Agency environment',
                'Strong communication and professional tonality',
                'Strategic and structured thinking ability',
                'Advanced Excel & PPT proficiency',
                'Financial understanding of margins and receivables',
                'Stakeholder and multi-project management skills',
                'Familiarity with Analytics & CRM tools (like GSC, Notion)',
                'Strong attention to deadlines and workflow discipline',
                'Confidence in handling client escalations',
              ],
            },
          },
        ],
      },
    ],
  },

  // ─── MAP — Marketing Asset Production ─────────────────────────────────
  {
    id: 'map',
    code: 'MAP',
    title: 'Marketing Asset Production',
    jobsLabel: 'Explore Sub-Departments',
    tone: 'red',
    subDepartments: [
      {
        id: 'web-essentials-management',
        title: 'WEM — Web Essentials Management',
        jobsLabel: 'Explore Open Roles',
        tone: 'red',
        roles: [
          {
            id: 'full-stack-developer',
            title: 'Full Stack Developer',
            description: {
              intro:
                'Turning code into high-impact brand experiences. In a world where digital performance defines perception, this role goes beyond building websites — it’s about engineering fast, scalable, and conversion-focused platforms. If you think in systems, care about performance, and build with ownership, you’ll fit right in.',
              jobEssence:
                'The role focuses on building end-to-end web applications using modern frontend and backend technologies. This includes developing scalable architectures, optimizing performance and SEO readiness, integrating APIs and databases, and managing deployments to ensure stability, speed, and long-term reliability.',
              keyRequirements: [
                'Strong expertise in Next.js & React.js',
                'TypeScript / JavaScript proficiency',
                'Frontend + Backend integration (Node.js and/or Python)',
                'Database handling (Supabase, NeonDB, AWS databases)',
                'ORM tools like Prisma / Drizzle',
                'Responsive UI development & Figma collaboration',
                'Deployment via Vercel / AWS',
                'Git & GitHub with CI/CD pipelines',
                'Knowledge of DNS, hosting & domain management',
                'Familiarity with AI enabled tools',
              ],
              currentOpenings: [
                'Junior Full Stack Developer (0-2 years Exp)',
                'Senior Full Stack Developer (2-4 years Exp)',
              ],
            },
          },
          {
            id: 'wordpress-developers',
            title: 'Wordpress Developers',
            description: {
              intro:
                'Crafting websites that don’t just look great, they perform, convert, and scale. In a digital-first world, a website is often the first impression of a brand. This role is about building seamless, user-friendly WordPress experiences that combine design, functionality, and performance to help businesses grow online.',
              jobEssence:
                'The role focuses on developing, customizing, and maintaining WordPress websites tailored to business goals. This includes theme and plugin customization, performance optimization, SEO readiness, website security, and ensuring a smooth user experience across devices while maintaining scalability and reliability.',
              keyRequirements: [
                'Strong expertise in WordPress development',
                'Proficiency in PHP, HTML, CSS & JavaScript',
                'Experience with Elementor, Gutenberg, and popular page builders',
                'Custom theme and plugin development/customization',
                'WooCommerce setup and customization',
                'Responsive website development',
                'Website speed optimization & performance tuning',
                'Basic SEO implementation and best practices',
                'Website migration, hosting & domain management',
                'Git/GitHub and version control knowledge',
                'Familiarity with Figma and design-to-website implementation',
                'Understanding of website security and maintenance',
                'Familiarity with AI-enabled tools',
              ],
              currentOpenings: ['WordPress Developer (1-2 Years Exp)'],
            },
          },
        ],
      },
      {
        id: 'visual-impact-management',
        title: 'VIM — Visual Impact Management',
        jobsLabel: 'Explore Open Roles',
        tone: 'teal',
        roles: [
          {
            id: 'creative-lead',
            title: 'Creative Lead',
            description: {
              intro:
                'Creativity scales only when it’s managed well. This role is for someone who can lead, align, and elevate video, design, content, and social media teams to deliver consistent, high-impact brand communication across platforms.',
              jobEssence:
                'The role focuses on managing end-to-end creative execution across video, graphic design, content, and social media. It involves team coordination, quality control, campaign alignment, and ensuring timely, platform-optimized delivery while maintaining brand consistency and performance.',
              keyRequirements: [
                'Creative Team Management (Video, Graphic, Content & Social)',
                'Content & Campaign Planning',
                'Social Media Strategy & Execution Oversight',
                'Quality Control & Brand Consistency',
                'Must have Agency Experience',
                'Familiarity with AI enabled tools',
              ],
              currentOpenings: ['Create Manager (4-5+ Years Exp)'],
            },
          },
          {
            id: 'video-editors',
            title: 'Video Editors / Motion Graphic Artists',
            description: {
              intro:
                'Every video you edit should be a movie, a story, a legendary portfolio having a capability to move mountains, arouse emotions among the audience. We are looking for someone who can create memories, and give the audience a reason to share it among their circle!',
              jobEssence:
                'Having a sound understanding of - Podcasts | Reels | Video shoot with multiple camera set-ups | YouTube | OTTs | Motion Graphics | Explanatory | Streaming/News Centric.',
              keyRequirements: [
                'Adobe After Effects',
                'Adobe Premiere Pro',
                'Any related video editing software',
                'Cinematography and Storytelling video editing',
                'Familiarity with AI enabled outputs',
              ],
              currentOpenings: ['Junior video editor (1-2 Years Exp)', 'Senior video editor', 'Video Production Lead'],
            },
          },
          {
            id: 'graphic-designers',
            title: 'Graphic Designers / UI & UX Designers',
            description: {
              intro:
                'Fine arts, visual finesse, and visual treats are what our clients demand. We are looking for modern-day artists who can be inspired by Michelangelo and know how to create captivating visual treats for the audience of 2019!',
              jobEssence:
                'Having a sound understanding Visual Content assets – Infographics | Memes | Social Media creative updates | Comic Strips | Mind Maps | Caricatures | Announcement creatives | landing page based on Storyboarding/Trends specific Scenarios.',
              keyRequirements: [
                'Visualization',
                'Adobe Photoshop',
                'Adobe Illustrator',
                'Any other related software',
                'Familiarity with AI enabled tools',
              ],
              currentOpenings: ['Junior Graphic Designer (1-2 Years Exp)', 'Senior Graphic Designer', 'Visual Lead'],
            },
          },
        ],
      },
    ],
  },

  // ─── HR — Human Resources ─────────────────────────────────────────────
  {
    id: 'hr',
    code: 'HR',
    title: 'Human Resources',
    jobsLabel: 'Explore Open Roles',
    tone: 'teal',
    subDepartments: [
      {
        id: 'human-resources',
        title: 'Human Resources',
        jobsLabel: 'Explore Open Roles',
        tone: 'red',
        roles: [
          {
            id: 'hr-executive',
            title: 'HR Executive',
            description: {
              intro:
                'Behind every high-performing team is a strong HR backbone that attracts, nurtures, and empowers talent. As an HR Executive, you won’t just manage processes - you’ll help shape culture, drive engagement and create an environment where people do their best work.',
              jobEssence:
                'The role focuses on managing core HR operations including recruitment, onboarding, performance management, employee engagement, employer branding and compliance and as a whole ensuring smooth employee lifecycle management.',
              keyRequirements: [
                'End-to-end recruitment coordination',
                'Candidate sourcing & screening',
                'Onboarding & documentation management',
                'Performance management',
                'HR operations & compliance understanding',
                'Employee engagement initiatives',
                'Employer Branding',
                'Strong communication & interpersonal skills',
              ],
              currentOpenings: ['HR EXECUTIVE (1-2 yrs. Exp)'],
            },
          },
        ],
      },
    ],
  },
];

// ─── Derived flat lists (kept for backward compatibility with routes/sitemap) ─

export const CAREERS_DEPARTMENTS: CareersDepartment[] = CAREERS_DEPARTMENT_GROUPS.flatMap(
  (group) => group.subDepartments
);

export const CAREERS_INTERNSHIP_DEPARTMENTS: CareersDepartment[] = CAREERS_INTERNSHIP_GROUPS.flatMap(
  (group) => group.subDepartments
);

// ─── Slug + lookup helpers ──────────────────────────────────────────────────

export function getCareerRoleSlug(role: CareersRole) {
  return slugifyCareerRole(role.title);
}

export function getCareerDepartmentSlug(department: CareersDepartment) {
  return slugifyCareerRole(department.title);
}

export function getCareerGroupSlug(group: CareersDepartmentGroup) {
  return slugifyCareerRole(group.code);
}

export function getGroupsForMode(mode: CareersMode): CareersDepartmentGroup[] {
  return mode === 'internship' ? CAREERS_INTERNSHIP_GROUPS : CAREERS_DEPARTMENT_GROUPS;
}

export function getCareerRoleEntries(): CareerRoleEntry[] {
  const entries: CareerRoleEntry[] = [];

  for (const group of CAREERS_DEPARTMENT_GROUPS) {
    for (const department of group.subDepartments) {
      for (const role of department.roles) {
        entries.push({
          group,
          department,
          role,
          mode: 'full-time',
          groupSlug: getCareerGroupSlug(group),
          departmentSlug: getCareerDepartmentSlug(department),
          roleSlug: getCareerRoleSlug(role),
        });
      }
    }
  }

  for (const group of CAREERS_INTERNSHIP_GROUPS) {
    for (const department of group.subDepartments) {
      for (const role of department.roles) {
        entries.push({
          group,
          department,
          role,
          mode: 'internship',
          groupSlug: getCareerGroupSlug(group),
          departmentSlug: getCareerDepartmentSlug(department),
          roleSlug: getCareerRoleSlug(role),
        });
      }
    }
  }

  return entries;
}

export function getCareerDepartmentEntries() {
  const entries: Array<{
    group: CareersDepartmentGroup;
    department: CareersDepartment;
    mode: CareersMode;
    groupSlug: string;
    departmentSlug: string;
  }> = [];

  for (const group of CAREERS_DEPARTMENT_GROUPS) {
    for (const department of group.subDepartments) {
      entries.push({
        group,
        department,
        mode: 'full-time',
        groupSlug: getCareerGroupSlug(group),
        departmentSlug: getCareerDepartmentSlug(department),
      });
    }
  }

  for (const group of CAREERS_INTERNSHIP_GROUPS) {
    for (const department of group.subDepartments) {
      entries.push({
        group,
        department,
        mode: 'internship',
        groupSlug: getCareerGroupSlug(group),
        departmentSlug: getCareerDepartmentSlug(department),
      });
    }
  }

  return entries;
}

export function getCareerDepartmentBySlug(departmentSlug: string) {
  return getCareerDepartmentEntries().find((entry) => entry.departmentSlug === departmentSlug) ?? null;
}

export function getCareerDepartmentById(mode: CareersMode, departmentId: string) {
  return (
    getCareerDepartmentEntries().find((entry) => entry.mode === mode && entry.department.id === departmentId) ?? null
  );
}

export function getCareerGroupById(mode: CareersMode, groupId: string) {
  const groups = getGroupsForMode(mode);
  return groups.find((g) => g.id === groupId) ?? null;
}

export function getCareerRoleBySlugs(departmentSlug: string, roleSlug: string) {
  return (
    getCareerRoleEntries().find((entry) => entry.departmentSlug === departmentSlug && entry.roleSlug === roleSlug) ??
    null
  );
}

export function getCareerRoleById(mode: CareersMode, roleId: string) {
  return getCareerRoleEntries().find((entry) => entry.mode === mode && entry.role.id === roleId) ?? null;
}

export function getCareerDepartmentHref(department: CareersDepartment) {
  return `/careers/${getCareerDepartmentSlug(department)}`;
}

export function getCareerRoleHref(entry: CareerRoleEntry) {
  return `/careers/${entry.departmentSlug}/${entry.roleSlug}`;
}
