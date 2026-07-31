/**
 * Push the 5 blog posts from "DN BLOGS 30_07_2026.docx" into Sanity.
 *
 * All five are created with `visible: false`, so they stay off the site
 * (listing, homepage insights, sitemap, category pages, direct URL) until
 * someone flips the toggle in the Studio.
 *
 * Idempotent: deterministic _id (the slug) via createOrReplace, so re-running
 * updates the same documents instead of creating duplicates. Warns before
 * replacing a slug that already exists.
 *
 * Run from the repo root:
 *   node scripts/push-dn-blogs-jul-30-2026.mjs --dry-run   (prints, writes nothing)
 *   node scripts/push-dn-blogs-jul-30-2026.mjs             (writes to Sanity)
 *
 * Requires in .env:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 */
import { createClient } from 'next-sanity';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

try {
  process.loadEnvFile(path.resolve(process.cwd(), '.env'));
} catch {
  /* env may already be set in the shell */
}

const DRY_RUN = process.argv.includes('--dry-run');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_STUDIO_API_TOKEN;

if (!projectId || !dataset || (!token && !DRY_RUN)) {
  console.error('Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

const AUTHOR_ID = '704c8009-6b36-4ca3-93d2-07256d52207c'; // digitallynext

const CAT = {
  aiInMarketing: 'WY20wT53hxKtTStZNBRm8S',
  analytics: 'ZcJhm7Cr2zfVlbDl98pE81',
  digitalStrategy: 'WY20wT53hxKtTStZNBQqBQ',
  marketing: 'vVaFl7ADmGgQzf5cZ3y1yv',
  seo: 'ZcJhm7Cr2zfVlbDl98ogWE',
};

// --- Portable Text helpers (same shape as push-blog-content.mjs) ------------
const key = () => randomUUID().replace(/-/g, '').slice(0, 12);

function block(style, content) {
  const parts = typeof content === 'string' ? [{ text: content }] : content;
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: parts.map((s) => ({ _type: 'span', _key: key(), text: s.text, marks: s.marks || [] })),
  };
}

const p = (text) => block('normal', text);
const h2 = (text) => block('h2', text);
const lead = (label, rest) => block('normal', [{ text: label, marks: ['strong'] }, { text: rest }]);

function listItem(content) {
  const parts = typeof content === 'string' ? [{ text: content }] : content;
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: parts.map((s) => ({ _type: 'span', _key: key(), text: s.text, marks: s.marks || [] })),
  };
}

const bullet = (text) => listItem(text);
/** Bullet that opens with a bold label, e.g. "Label: rest of the point." */
const bulletLead = (label, rest) => listItem([{ text: label, marks: ['strong'] }, { text: rest }]);

// --- Articles --------------------------------------------------------------
const ARTICLES = [
  {
    slug: 'ai-website-optimization-how-smart-websites-increase-conversions',
    title: 'AI Website Optimization: How Smart Websites Are Increasing Conversions in 2026',
    metaTitle: 'AI Website Optimization: Smarter Sites, More Conversions',
    metaDescription:
      'AI website optimization uses machine learning to improve speed, personalization, and UX in real time. See how smart sites lift conversions in 2026.',
    excerpt:
      'AI website optimization is the use of machine learning and automation to improve website speed, personalization, and user experience in real time.',
    publishedAt: '2026-07-30T10:00:00.000Z',
    categories: [CAT.aiInMarketing, CAT.seo],
    body: [
      lead(
        'Quick Answer: ',
        `AI website optimization is the use of machine learning and automation to improve website speed, personalization, and user experience in real time. It helps businesses increase conversions by analyzing visitor behavior and adjusting content, layout, and design automatically. In 2026, AI website optimization tools have become a core part of every serious digital marketing strategy.`
      ),

      h2('What Is AI Website Optimization?'),
      p(
        `AI website optimization uses artificial intelligence to continuously test, learn from, and improve how a website performs. Unlike traditional CRO methods that rely on manual A/B testing, AI-powered website optimization tools analyze thousands of data points in real time and make adjustments instantly, without waiting for a human to review a dashboard.`
      ),
      p(`This includes:`),
      bullet(`Adjusting layouts based on visitor intent`),
      bullet(`Personalizing content per user segment`),
      bullet(`Predicting which elements will drive conversions`),
      bullet(`Automating AI landing page optimization at scale`),
      bullet(`Identifying underperforming pages before they hurt rankings`),
      bullet(`Suggesting copy and design changes through AI website recommendations`),
      p(
        `Together, these capabilities form the foundation of what most marketers now simply call AI web optimization.`
      ),

      h2('Why AI Website Optimization Matters in 2026'),
      p(
        `Search engines and AI answer engines now reward websites that deliver fast, relevant, and highly personalized experiences. AI website performance directly affects:`
      ),
      bullet(`Search visibility and answer engine rankings`),
      bullet(`Bounce rate and session duration`),
      bullet(`Core Web Vitals scores`),
      bullet(`Overall AI website conversion optimization`),
      bullet(`Trust signals used by generative search engines`),
      bullet(`How often a page gets cited in AI generated answers`),
      p(
        `Businesses that ignore AI UX optimization risk falling behind competitors already using AI website recommendations to guide design decisions. In 2026, ranking well is no longer just about keywords. It is about how efficiently your site serves user intent, something AI is uniquely built to measure and improve. This is exactly why AI website optimization has become a foundational pillar for any brand hoping to appear in AI generated search summaries.`
      ),

      h2('How AI Improves Website Performance'),
      p(`Here is how AI-powered website optimization works in practice:`),
      bulletLead('Behavioral Analytics: ', `AI tracks clicks, scrolls, and hesitation points using AI heatmaps.`),
      bulletLead(
        'Predictive Personalization: ',
        `Machine learning predicts what content a visitor wants to see, supporting AI website personalization at scale.`
      ),
      bulletLead('Automated Testing: ', `AI runs multivariate tests without manual setup.`),
      bulletLead(
        'Speed Optimization: ',
        `AI flags and fixes website speed optimization issues automatically.`
      ),
      bulletLead(
        'Smart Recommendations: ',
        `The system suggests real time AI website recommendations for layout or copy changes.`
      ),
      bulletLead(
        'Content Prioritization: ',
        `AI reorders page elements based on what converts best for each visitor type.`
      ),
      bulletLead(
        'Error Detection: ',
        `AI scans for broken links, slow loading images, and other technical issues that hurt AI website performance.`
      ),
      bulletLead(
        'Continuous AI Website Audit: ',
        `The system flags declining pages before traffic drops significantly.`
      ),

      h2('Key Benefits of AI Website Optimization'),
      bullet(`Higher conversion rate optimization without added manual effort`),
      bullet(`Improved Core Web Vitals and technical SEO health`),
      bullet(`Continuous AI website audit capabilities`),
      bullet(`Better alignment with AI website design best practices`),
      bullet(`Reduced reliance on guesswork for UX optimization decisions`),
      bullet(`Faster page load times across mobile and desktop`),
      bullet(`More accurate data for future website engagement strategies`),
      bullet(`Stronger foundation for long term AI website optimization strategy`),

      h2('Best AI Website Optimization Tools'),
      p(`Some of the most trusted platforms driving AI website optimization tools today include:`),
      bullet(`Google Analytics 4`),
      bullet(`Hotjar`),
      bullet(`Microsoft Clarity`),
      bullet(`Optimizely`),
      bullet(`VWO`),
      bullet(`HubSpot`),
      bullet(`Unbounce`),
      bullet(`Website builders like WordPress, Webflow, and Shopify with built in AI features`),
      p(
        `These platforms combine behavioral analytics with automation to support a complete AI website optimization strategy, whether the goal is lead generation, ecommerce sales, or content engagement. Many of them also support AI powered landing pages that adapt automatically to different traffic sources.`
      ),

      h2('A Simple AI Website Optimization Strategy for Businesses'),
      bullet(`Audit your current website engagement using behavioral analytics`),
      bullet(`Identify friction points using AI heatmaps`),
      bullet(`Implement AI powered landing pages for top traffic sources`),
      bullet(`Test AI website personalization on returning visitors`),
      bullet(`Monitor Core Web Vitals monthly as part of ongoing website speed optimization`),
      bullet(`Refine based on smart AI CRO recommendations`),
      bullet(`Benchmark performance against competitors using a recurring AI website audit`),
      bullet(`Document findings so AI website optimization for businesses becomes repeatable`),
      p(
        `This approach works for ecommerce sites, SaaS platforms, and service based businesses alike, since the underlying principle remains the same. Let data, not assumptions, guide every AI website optimization decision.`
      ),

      h2('Common Mistakes Businesses Make With AI Website Optimization'),
      bullet(`Relying only on AI without human review of brand voice and design`),
      bullet(`Ignoring mobile specific AI UX optimization`),
      bullet(`Failing to update personalization rules as customer behavior shifts`),
      bullet(`Overlooking Core Web Vitals in favor of visual design alone`),
      bullet(`Not integrating AI website performance data with sales and marketing teams`),
      bullet(`Treating AI website optimization tools as a one time setup instead of an ongoing process`),

      h2('Can AI Optimize a Website Automatically?'),
      p(
        `Yes. Many modern AI website optimization tools now offer autonomous AI CRO features that adjust page elements, personalize experiences, and run tests without manual input. However, human oversight is still recommended to ensure brand consistency and quality control, especially for regulated industries where messaging accuracy matters.`
      ),

      h2('Final Thoughts'),
      p(
        `AI website optimization is no longer optional for businesses that want visibility in AI driven search results. By combining AI website performance monitoring, AI website design best practices, personalization, and automation, brands can build smart websites that convert better and rank higher in 2026 and beyond. A consistent AI website optimization strategy, guided by real behavioral data and a recurring AI website audit, is quickly becoming the standard for any business serious about digital growth.`
      ),
    ],
    faqs: [
      {
        question: 'What is AI website optimization?',
        answer:
          'It is the use of AI to automatically improve website speed, UX optimization, and conversions based on real time visitor data.',
      },
      {
        question: 'How does AI improve website conversions?',
        answer:
          'By personalizing content, predicting user intent, and automating AI website conversion optimization testing to reduce friction in the customer journey.',
      },
      {
        question: 'Can AI optimize a website automatically?',
        answer:
          'Yes, many AI website optimization tools now offer real time, autonomous optimization with minimal human input.',
      },
      {
        question: 'What are the best AI website optimization tools?',
        answer: 'Popular choices include Google Analytics 4, Hotjar, Microsoft Clarity, Optimizely, and VWO.',
      },
      {
        question: 'How do smart websites increase conversions?',
        answer:
          'By combining AI website personalization, AI UX optimization, and behavioral analytics to remove barriers to conversion.',
      },
      {
        question: 'Is AI website optimization suitable for small businesses?',
        answer:
          'Yes, many affordable AI website optimization tools now offer scaled down features built for smaller teams and budgets, making AI website optimization for businesses of every size realistic.',
      },
    ],
  },

  {
    slug: 'ai-personalization-1-to-1-customer-experiences-at-scale',
    title: 'AI Personalization: How Brands Are Delivering 1:1 Customer Experiences at Scale',
    metaTitle: 'AI Personalization: 1:1 Customer Experiences at Scale',
    metaDescription:
      'AI personalization tailors content, offers, and experiences to each customer. Learn the strategy, tools, and metrics behind 1:1 marketing at scale.',
    excerpt:
      'AI personalization is the use of artificial intelligence to deliver individualized content, offers, and experiences based on customer behavior and data.',
    publishedAt: '2026-07-30T11:00:00.000Z',
    categories: [CAT.aiInMarketing, CAT.digitalStrategy],
    body: [
      lead(
        'Quick Answer: ',
        `AI personalization is the use of artificial intelligence to deliver individualized content, offers, and experiences to customers based on their behavior, preferences, and data. It allows brands to scale one to one marketing across millions of users while keeping every interaction relevant.`
      ),

      h2('What Is AI Personalization?'),
      p(
        `AI personalization uses machine learning to analyze customer data and automatically tailor experiences across websites, email, and apps. This includes AI powered personalization for product recommendations, content, and messaging, all adjusted in real time based on individual behavior rather than broad assumptions.`
      ),
      p(`Instead of showing the same experience to everyone, brands use:`),
      bullet(`AI customer personalization models`),
      bullet(`Predictive personalization engines`),
      bullet(`Real time behavioral targeting`),
      bullet(`Dynamic pricing and offer personalization`),
      bullet(`Personalized search results within their own platforms`),
      bullet(`AI driven personalization across email, apps, and websites`),

      h2('How AI Personalizes Customer Experiences'),
      p(`AI personalization works through several core mechanisms:`),
      bulletLead('Data Collection: ', `Gathering first party data from browsing behavior, purchases, and interactions.`),
      bulletLead('Customer Segmentation: ', `Using AI customer segmentation to group users by intent and behavior.`),
      bulletLead(
        'Recommendation Engines: ',
        `Suggesting AI product recommendations based on past activity through a dedicated recommendation engine.`
      ),
      bulletLead(
        'Dynamic Content: ',
        `Adjusting website or email content in real time to match AI customer experience expectations.`
      ),
      bulletLead(
        'Omnichannel Delivery: ',
        `Ensuring personalized customer journey consistency across every channel through omnichannel personalization.`
      ),
      bulletLead('Predictive Modeling: ', `Anticipating future needs before the customer expresses them.`),

      h2('Benefits of AI Personalization'),
      bullet(`Stronger AI customer engagement and loyalty`),
      bullet(`Higher conversion rates through relevant messaging`),
      bullet(`Reduced customer churn`),
      bullet(`Scalable AI driven personalization without added headcount`),
      bullet(`Improved CRM personalization accuracy`),
      bullet(`Better use of marketing budget through targeted spend`),
      bullet(`Increased average order value through relevant upsells`),
      bullet(`More consistent personalized marketing across every touchpoint`),

      h2('AI Personalization Examples'),
      bullet(`Ecommerce platforms showing AI product recommendations based on browsing history`),
      bullet(`Streaming services using AI recommendations to suggest content`),
      bullet(`Retail brands sending personalized offers via AI marketing personalization tools`),
      bullet(`SaaS platforms customizing onboarding using AI customer experience data`),
      bullet(`Travel brands personalizing destination suggestions based on past bookings`),
      bullet(`Financial platforms tailoring offers using predictive personalization and customer behavior analytics`),
      p(
        `These AI personalization examples show how AI powered customer experiences now touch nearly every industry.`
      ),

      h2('Hyper Personalization With AI'),
      p(`Hyper personalization takes AI personalization further by combining:`),
      bullet(`Real time behavioral data`),
      bullet(`Predictive analytics`),
      bullet(`Location and device signals`),
      bullet(`Purchase history`),
      bullet(`Social and contextual signals`),
      p(
        `This creates a personalized marketing experience that feels unique to every customer, not just segmented groups, which is increasingly what customers expect from every brand interaction. Hyper personalization with AI is quickly becoming a baseline expectation rather than a bonus feature.`
      ),

      h2('Leading AI Personalization Tools'),
      bullet(`Salesforce`),
      bullet(`Adobe Experience Cloud`),
      bullet(`HubSpot`),
      bullet(`Dynamic Yield`),
      bullet(`Bloomreach`),
      bullet(`Klaviyo`),
      bullet(`Segment`),
      bullet(`Shopify`),
      bullet(`Amazon Personalize`),
      p(
        `These platforms power everything from email personalization to full AI customer experience management, and most integrate directly with existing CRM personalization systems and ecommerce platforms.`
      ),

      h2('AI Personalization Strategy for Brands'),
      bullet(`Centralize first party data across all channels`),
      bullet(`Build AI customer segmentation models based on real behavior`),
      bullet(`Deploy a recommendation engine for key touchpoints`),
      bullet(`Personalize across omnichannel personalization channels consistently`),
      bullet(`Continuously optimize using behavioral targeting insights`),
      bullet(`Test personalization rules against control groups regularly`),
      bullet(`Align CRM personalization with customer loyalty programs`),
      p(
        `A clear AI personalization strategy ensures that investments in AI customer personalization actually translate into measurable growth.`
      ),

      h2('Common Mistakes in AI Personalization'),
      bullet(`Over personalizing to the point of feeling invasive`),
      bullet(`Using outdated data that no longer reflects customer behavior`),
      bullet(`Failing to personalize consistently across every channel`),
      bullet(`Ignoring privacy regulations while collecting first party data`),
      bullet(`Treating personalization as a one time project instead of an ongoing process`),
      bullet(`Neglecting customer behavior analytics when refining segmentation`),

      h2('AI Personalization Across Different Industries'),
      p(
        `AI personalization does not look the same in every sector. The underlying AI customer personalization models are similar, but the application shifts based on customer expectations.`
      ),
      bulletLead(
        'Ecommerce: ',
        `Focuses heavily on AI product recommendations, dynamic pricing, and cart abandonment personalization.`
      ),
      bulletLead(
        'SaaS: ',
        `Relies on AI customer experience data to personalize onboarding flows and in-app messaging.`
      ),
      bulletLead(
        'Retail: ',
        `Uses personalized marketing through loyalty apps, location signals, and AI marketing personalization campaigns.`
      ),
      bulletLead(
        'Travel and Hospitality: ',
        `Applies predictive personalization to suggest destinations, upgrades, and travel dates based on past behavior.`
      ),
      bulletLead(
        'Financial Services: ',
        `Uses customer behavior analytics to personalize product offers while staying within strict compliance requirements.`
      ),
      p(
        `Understanding these differences helps brands apply AI personalization strategy in a way that fits their specific customer base rather than copying a generic playbook.`
      ),

      h2('How to Measure the Success of AI Personalization'),
      p(
        `Brands investing in AI driven personalization should track outcomes just as closely as they track implementation. Useful metrics include:`
      ),
      bullet(`Engagement rate on personalized content versus generic content`),
      bullet(`Conversion rate lift from AI product recommendations`),
      bullet(`Customer retention tied to personalized customer journey improvements`),
      bullet(`Average order value influenced by recommendation engine suggestions`),
      bullet(`Reduction in churn linked to stronger AI customer engagement`),
      p(
        `Tracking these metrics ensures that AI personalization efforts tie back to real business outcomes, not just technical implementation.`
      ),

      h2('Final Thoughts'),
      p(
        `AI personalization has moved from a competitive advantage to a customer expectation. Brands that invest in a strong personalized customer journey and AI driven personalization tools will consistently outperform those relying on generic, one size fits all marketing. As customer behavior analytics and recommendation engines continue to improve, AI personalization will only become more precise, more scalable, and more essential to long term growth.`
      ),
    ],
    faqs: [
      {
        question: 'What is AI personalization?',
        answer: 'It is the use of AI to deliver customized content and experiences to individual customers at scale.',
      },
      {
        question: 'How does AI personalize customer experiences?',
        answer:
          'Through data collection, customer segmentation, and predictive personalization engines that tailor content in real time.',
      },
      {
        question: 'What are the benefits of AI personalization?',
        answer: 'Higher engagement, better customer loyalty, and improved conversion rates across channels.',
      },
      {
        question: 'How do brands use AI for personalization?',
        answer:
          'By using a recommendation engine, dynamic content, and behavioral targeting across websites, apps, and email.',
      },
      {
        question: 'What is hyper personalization?',
        answer:
          'It is an advanced form of AI personalization that combines multiple real time data signals for highly specific AI powered customer experiences.',
      },
      {
        question: 'Is AI personalization expensive to implement?',
        answer:
          'Costs vary widely, and many platforms offer scalable pricing so even small businesses can start with basic AI marketing personalization features.',
      },
      {
        question: 'How does AI personalization affect customer loyalty?',
        answer:
          'By consistently delivering relevant AI powered customer experiences, brands build trust over time, which strengthens customer loyalty and reduces the likelihood of customers switching to competitors.',
      },
    ],
  },

  {
    slug: 'how-ai-is-transforming-marketing-automation',
    title: 'How AI Is Transforming Marketing Automation: Smarter Campaigns, Better Results',
    metaTitle: 'How AI Is Transforming Marketing Automation',
    metaDescription:
      'AI marketing automation adds predictive scoring, smart segmentation, and dynamic content to your workflows. See the tools, strategy, and common pitfalls.',
    excerpt:
      'AI marketing automation combines artificial intelligence with automated workflows to run smarter campaigns, reducing manual work while improving targeting and timing.',
    publishedAt: '2026-07-30T12:00:00.000Z',
    categories: [CAT.aiInMarketing, CAT.marketing],
    body: [
      lead(
        'Quick Answer: ',
        `AI marketing automation combines artificial intelligence with automated workflows to run smarter, more efficient marketing campaigns. It reduces manual work while improving targeting, timing, and personalization across channels, giving marketing teams more time to focus on strategy instead of repetitive tasks.`
      ),

      h2('What Is AI Marketing Automation?'),
      p(
        `AI marketing automation refers to platforms and workflows that use machine learning to optimize campaign automation, lead nurturing, and customer communication without constant manual input. It builds on traditional marketing automation by adding a layer of intelligence that adapts in real time.`
      ),
      p(`Core components include:`),
      bullet(`AI workflow automation`),
      bullet(`AI email automation`),
      bullet(`AI campaign automation`),
      bullet(`Predictive lead scoring`),
      bullet(`Automated content generation for campaigns`),
      bullet(`AI powered marketing across email, SMS, and chat`),

      h2('How AI Improves Marketing Automation'),
      p(`AI enhances traditional automation by adding intelligence to every stage of the funnel:`),
      bulletLead(
        'Smarter Segmentation: ',
        `AI analyzes behavior to refine audience targeting beyond basic demographics.`
      ),
      bulletLead(
        'Predictive Send Times: ',
        `AI scheduling determines the best time to reach each customer individually.`
      ),
      bulletLead('Dynamic Content: ', `Campaigns adjust automatically based on engagement signals.`),
      bulletLead('Lead Scoring: ', `AI prioritizes high intent leads for AI lead nurturing sequences.`),
      bulletLead('Chatbot Automation: ', `AI powered chat handles customer queries instantly, day or night.`),
      bulletLead('Performance Monitoring: ', `AI flags underperforming campaigns before budgets are wasted.`),
      bulletLead(
        'Content Personalization: ',
        `Intelligent marketing automation adjusts messaging per segment automatically.`
      ),

      h2('Benefits of AI Marketing Automation'),
      bullet(`Increased marketing efficiency across every campaign`),
      bullet(`Better lead nurturing and conversion rates`),
      bullet(`Reduced manual campaign management`),
      bullet(`Improved customer lifecycle automation`),
      bullet(`Stronger CRM automation accuracy`),
      bullet(`Faster campaign turnaround times`),
      bullet(`More consistent messaging across sales and marketing teams`),
      bullet(`Lower cost per acquisition through smarter targeting`),

      h2('Best AI Marketing Automation Tools'),
      p(`Popular platforms offering intelligent marketing automation include:`),
      bullet(`HubSpot`),
      bullet(`ActiveCampaign`),
      bullet(`Mailchimp`),
      bullet(`Zapier`),
      bullet(`Make`),
      bullet(`Salesforce`),
      bullet(`Marketo`),
      bullet(`Brevo`),
      bullet(`Klaviyo`),
      bullet(`Microsoft Copilot`),
      p(
        `These tools support everything from AI email marketing automation to full AI powered CRM automation, and many now include native generative AI features for writing subject lines, campaign copy, and workflow logic.`
      ),

      h2('AI Marketing Automation Strategy'),
      bullet(`Map your current customer lifecycle automation from first touch to renewal`),
      bullet(`Identify manual tasks suitable for AI automation`),
      bullet(`Implement AI lead nurturing workflows for different funnel stages`),
      bullet(`Add chatbot automation for instant customer response`),
      bullet(`Use omnichannel automation to unify messaging across email, social, and SMS`),
      bullet(`Continuously refine using campaign optimization data`),
      bullet(`Set clear KPIs to measure the impact of AI marketing automation over time`),

      h2('Common Mistakes With AI Marketing Automation'),
      bullet(`Automating without a clear customer journey map in place`),
      bullet(`Over relying on automation for high value customer relationships`),
      bullet(`Failing to update workflows as products or offers change`),
      bullet(`Ignoring integration between automation tools and CRM systems`),
      bullet(`Not testing chatbot automation responses regularly`),
      bullet(`Treating AI automation as a replacement for strategy rather than a tool that executes it`),

      h2('AI Marketing Automation for Different Business Sizes'),
      p(`AI marketing automation is not limited to large enterprises. Smaller businesses increasingly rely on it as well.`),
      bulletLead(
        'Small Businesses: ',
        `Use AI email automation and basic workflow automation to compete with larger competitors.`
      ),
      bulletLead(
        'Mid-Sized Companies: ',
        `Combine CRM automation with AI lead nurturing to scale outreach without expanding headcount.`
      ),
      bulletLead(
        'Enterprises: ',
        `Deploy full intelligent marketing automation stacks that connect sales, support, and marketing data across omnichannel automation systems.`
      ),
      p(
        `This scalability is part of why AI marketing automation adoption continues to grow across every industry and company size.`
      ),

      h2('How to Measure the Success of AI Marketing Automation'),
      p(
        `Implementing AI marketing automation is only half the equation. Measuring its impact ensures the investment is actually improving marketing efficiency. Key indicators to track include:`
      ),
      bullet(`Time saved on manual workflow automation tasks`),
      bullet(`Conversion rate improvements from AI lead nurturing sequences`),
      bullet(`Response time improvements from chatbot automation`),
      bullet(`Reduction in cost per lead through smarter campaign automation`),
      bullet(`Retention rates tied to customer lifecycle automation`),
      bullet(`Overall campaign optimization gains compared to pre-automation benchmarks`),
      p(
        `Reviewing these metrics regularly helps marketing teams justify continued investment in AI marketing automation tools and identify where additional automation could unlock further efficiency.`
      ),

      h2('Integrating AI Marketing Automation With Other Systems'),
      p(
        `AI marketing automation performs best when it is not operating in isolation. Connecting it with other systems amplifies results.`
      ),
      bulletLead(
        'CRM Integration: ',
        `Syncing CRM automation data ensures sales and marketing see the same customer view.`
      ),
      bulletLead(
        'Analytics Integration: ',
        `Pairing automation with campaign optimization data improves targeting accuracy.`
      ),
      bulletLead(
        'Customer Support Integration: ',
        `Connecting chatbot automation with support tickets creates a more seamless customer experience.`
      ),
      bulletLead(
        'Ecommerce Integration: ',
        `Linking automation platforms with product catalogs enables more relevant AI email automation.`
      ),
      p(`This level of integration is what separates basic automation from truly intelligent marketing automation.`),

      h2('Can AI Replace Marketing Automation Platforms?'),
      p(
        `No. AI enhances marketing automation platforms rather than replacing them. It works within existing systems to improve decision making, targeting, and efficiency, not to eliminate the platforms themselves. Human strategy still determines the goals AI is optimizing toward, and marketers remain responsible for brand voice and campaign direction.`
      ),

      h2('Final Thoughts'),
      p(
        `AI marketing automation is redefining how brands run campaigns, nurture leads, and engage customers. By combining AI workflow automation with proven CRM automation tools, businesses can scale smarter campaigns while improving overall marketing efficiency. As predictive lead scoring, dynamic content, and chatbot automation continue to mature, the gap between manual marketing teams and AI powered marketing teams will only continue to widen, making early adoption a meaningful long term advantage.`
      ),
    ],
    faqs: [
      {
        question: 'What is AI marketing automation?',
        answer:
          'It is the use of AI within automated marketing workflows to improve targeting, timing, and personalization.',
      },
      {
        question: 'How does AI improve marketing automation?',
        answer:
          'By adding predictive lead scoring, smarter segmentation, and dynamic content adjustments to existing workflows.',
      },
      {
        question: 'Which AI tools automate marketing?',
        answer: 'Leading tools include HubSpot, ActiveCampaign, Mailchimp, Salesforce, and Marketo.',
      },
      {
        question: 'Can AI replace marketing automation platforms?',
        answer:
          'No, AI works within these platforms to enhance their capabilities rather than replace them entirely.',
      },
      {
        question: 'What are the benefits of AI marketing automation?',
        answer:
          'Improved marketing efficiency, better lead nurturing, and higher campaign performance with less manual effort.',
      },
      {
        question: 'Does AI marketing automation work for small businesses?',
        answer:
          'Yes, many platforms offer entry level plans with AI automation features suitable for small teams and limited budgets.',
      },
      {
        question: 'How long does it take to see results from AI marketing automation?',
        answer:
          'Most businesses start seeing measurable gains in marketing efficiency and lead nurturing performance within the first one to three months, depending on data quality and workflow complexity.',
      },
    ],
  },

  {
    slug: 'ai-marketing-analytics-measuring-performance-beyond-clicks',
    title: 'The Rise of AI Marketing Analytics: How to Measure Campaign Performance Beyond Clicks',
    metaTitle: 'AI Marketing Analytics: Measure Beyond Clicks',
    metaDescription:
      'AI marketing analytics predicts outcomes and models attribution across the full funnel. Learn the metrics, tools, and framework to measure real ROI.',
    excerpt:
      'AI marketing analytics uses artificial intelligence to analyze campaign data, predict outcomes, and provide deeper insights than traditional click based metrics.',
    publishedAt: '2026-07-30T13:00:00.000Z',
    categories: [CAT.analytics, CAT.aiInMarketing],
    body: [
      lead(
        'Quick Answer: ',
        `AI marketing analytics uses artificial intelligence to analyze campaign data, predict outcomes, and provide deeper insights than traditional click based metrics. It helps marketers understand true performance across the entire customer journey rather than relying on surface level engagement numbers.`
      ),

      h2('What Is AI Marketing Analytics?'),
      p(
        `AI marketing analytics applies machine learning to marketing data in order to uncover patterns, predict results, and generate actionable insights. This goes beyond basic click tracking to include:`
      ),
      bullet(`AI campaign analytics`),
      bullet(`Predictive marketing analytics`),
      bullet(`AI attribution modeling`),
      bullet(`Real time AI dashboards`),
      bullet(`Sentiment analysis across customer feedback`),
      bullet(`AI powered business intelligence for marketing teams`),

      h2('How AI Improves Campaign Reporting'),
      p(
        `Traditional analytics often stop at surface level metrics like impressions and clicks. AI marketing analytics improves reporting by:`
      ),
      bulletLead('Predictive Analytics: ', `Forecasting future campaign performance based on historical trends.`),
      bulletLead(
        'Attribution Modeling: ',
        `Identifying which touchpoints actually drive conversions across the funnel.`
      ),
      bulletLead(
        'Automated Insights: ',
        `Surfacing AI insights without marketers manually digging through spreadsheets.`
      ),
      bulletLead('Real Time Dashboards: ', `Providing live AI dashboards for faster, more confident decisions.`),
      bulletLead('Anomaly Detection: ', `Flagging unusual performance shifts instantly, before they become costly.`),
      bulletLead('Cross Channel Analysis: ', `Connecting data across paid, organic, and email channels into one view.`),

      h2('Key Metrics Marketers Should Track in 2026'),
      bullet(`Campaign ROI across every channel`),
      bullet(`Customer insights and lifetime value`),
      bullet(`Conversion tracking across devices and channels`),
      bullet(`Marketing KPIs tied directly to business outcomes`),
      bullet(`Attribution across the full funnel, not just the last click`),
      bullet(`Engagement quality, not just volume`),
      bullet(`Retention and repeat purchase rate`),

      h2('Benefits of AI Marketing Analytics'),
      bullet(`More accurate AI campaign performance tracking`),
      bullet(`Better data visualization for stakeholders and leadership`),
      bullet(`Improved business intelligence for strategic planning`),
      bullet(`Reduced reporting time through automation`),
      bullet(`Clearer connection between marketing activity and revenue`),
      bullet(`Faster identification of underperforming campaigns`),
      bullet(`Improved forecasting accuracy for budget planning`),

      h2('Best AI Marketing Analytics Tools'),
      bullet(`Google Analytics 4`),
      bullet(`Looker Studio`),
      bullet(`Tableau`),
      bullet(`Microsoft Power BI`),
      bullet(`HubSpot`),
      bullet(`Mixpanel`),
      bullet(`Amplitude`),
      bullet(`Semrush`),
      bullet(`Google Tag Manager`),
      p(
        `These platforms combine AI reporting with predictive analytics for marketing teams that need more than surface level numbers, and many integrate directly with CRM and marketing automation platforms for a complete performance picture.`
      ),

      h2('Can AI Predict Marketing Performance?'),
      p(
        `Yes. Predictive marketing analytics uses historical data patterns to forecast future outcomes such as conversion likelihood, churn risk, and campaign ROI. This allows marketers to adjust strategy before performance drops rather than reacting after the budget has already been spent.`
      ),

      h2('A Simple AI Marketing Analytics Framework'),
      bullet(`Centralize data using AI dashboards across all channels`),
      bullet(`Apply attribution models across every customer touchpoint`),
      bullet(`Set clear marketing KPIs tied directly to revenue`),
      bullet(`Use predictive analytics to forecast upcoming trends`),
      bullet(`Automate reporting for faster decision making`),
      bullet(`Review anomaly alerts weekly to catch issues early`),
      bullet(`Share AI insights across teams so decisions stay aligned`),

      h2('Common Mistakes in AI Marketing Analytics'),
      bullet(`Tracking vanity metrics instead of revenue linked marketing KPIs`),
      bullet(`Using outdated attribution models that ignore cross channel behavior`),
      bullet(`Failing to act on predictive analytics insights once they surface`),
      bullet(`Overloading dashboards with too many disconnected metrics`),
      bullet(`Not aligning analytics goals with overall business strategy`),
      bullet(`Ignoring customer insights that fall outside standard reporting templates`),

      h2('AI Marketing Analytics Across Different Channels'),
      p(`Different marketing channels benefit from AI marketing analytics in different ways.`),
      bulletLead(
        'Paid Media: ',
        `Predictive analytics forecasts which campaigns will deliver the strongest campaign ROI before scaling spend.`
      ),
      bulletLead(
        'Email Marketing: ',
        `AI campaign analytics identifies which segments respond best to specific messaging.`
      ),
      bulletLead(
        'Content and SEO: ',
        `AI insights reveal which pages contribute most to conversion tracking, even without direct clicks.`
      ),
      bulletLead(
        'Social Media: ',
        `Sentiment analysis paired with AI dashboards shows brand perception alongside engagement numbers.`
      ),
      p(
        `Understanding these nuances helps marketers apply AI marketing analytics tools where they will have the greatest measurable impact.`
      ),

      h2('How to Get Started With AI Marketing Analytics'),
      p(
        `Adopting AI marketing analytics does not need to happen all at once. A phased approach helps teams build confidence in the data before scaling further.`
      ),
      bulletLead(
        'Step 1: ',
        `Connect existing tools like Google Analytics 4 and Google Tag Manager to establish a clean data foundation.`
      ),
      bulletLead('Step 2: ', `Layer in a visualization tool such as Looker Studio or Tableau for clearer AI dashboards.`),
      bulletLead(
        'Step 3: ',
        `Introduce predictive analytics for one or two high value campaigns before rolling it out further.`
      ),
      bulletLead(
        'Step 4: ',
        `Build attribution models that reflect your actual customer journey, not a generic template.`
      ),
      bulletLead('Step 5: ', `Train the marketing team to act on AI insights rather than just viewing them passively.`),
      p(
        `This step by step approach helps businesses of any size build a sustainable AI marketing analytics practice without becoming overwhelmed by tools or data volume.`
      ),

      h2('Why Business Intelligence and Marketing Analytics Are Merging'),
      p(
        `Historically, business intelligence and marketing analytics operated as separate disciplines. AI is closing that gap by connecting campaign level data with broader company performance metrics. This means marketing dashboards increasingly reflect real revenue impact, not just engagement, giving leadership teams a unified view of how marketing activity contributes to overall business intelligence and growth.`
      ),

      h2('Final Thoughts'),
      p(
        `AI marketing analytics gives brands the ability to measure performance beyond simple clicks. With predictive analytics, attribution modeling, and AI dashboards, marketers can make faster, smarter, and more profitable decisions. As AI campaign analytics tools continue to improve, the businesses that invest early in strong data visualization and business intelligence practices will consistently out-execute competitors still relying on basic, click only reporting.`
      ),
    ],
    faqs: [
      {
        question: 'What is AI marketing analytics?',
        answer:
          'It is the use of AI to analyze marketing data, predict outcomes, and generate deeper performance insights.',
      },
      {
        question: 'How does AI improve campaign reporting?',
        answer: 'Through predictive analytics, automated attribution modeling, and real time AI dashboards.',
      },
      {
        question: 'What metrics should marketers track in 2026?',
        answer: 'Campaign ROI, customer insights, conversion tracking, and full funnel attribution.',
      },
      {
        question: 'What are AI powered analytics tools?',
        answer: 'Popular tools include Google Analytics 4, Tableau, Microsoft Power BI, and Mixpanel.',
      },
      {
        question: 'Can AI predict marketing performance?',
        answer: 'Yes, using predictive analytics based on historical and behavioral data patterns.',
      },
      {
        question: 'How often should AI marketing analytics be reviewed?',
        answer:
          'Most teams benefit from weekly dashboard reviews and monthly deep dive reporting sessions to catch both short term and long term trends.',
      },
      {
        question: 'Do small businesses need AI marketing analytics?',
        answer:
          'Yes, even small teams benefit from predictive analytics and automated reporting, since it reduces manual work and helps prioritize limited marketing budgets more effectively.',
      },
    ],
  },

  {
    slug: 'how-ai-is-transforming-customer-journey-mapping',
    title: 'How AI Is Transforming Customer Journey Mapping: From First Click to Loyal Customer',
    metaTitle: 'AI Customer Journey Mapping: First Click to Loyalty',
    metaDescription:
      'AI customer journey mapping tracks every touchpoint and predicts drop-off before it happens. See the stages, tools, and strategy that improve retention.',
    excerpt:
      'AI customer journey mapping uses artificial intelligence to track, analyze, and optimize every touchpoint a customer experiences with a brand.',
    publishedAt: '2026-07-30T14:00:00.000Z',
    categories: [CAT.aiInMarketing, CAT.digitalStrategy],
    body: [
      lead(
        'Quick Answer: ',
        `AI customer journey mapping uses artificial intelligence to track, analyze, and optimize every touchpoint a customer experiences with a brand. It helps businesses understand behavior at each stage, from first click to long term loyalty, and adjust strategy in real time.`
      ),

      h2('What Is AI Customer Journey Mapping?'),
      p(
        `AI customer journey mapping combines behavioral analytics with machine learning to visualize how customers interact with a brand across channels. This includes:`
      ),
      bullet(`AI journey analytics`),
      bullet(`AI customer touchpoints tracking`),
      bullet(`AI journey orchestration`),
      bullet(`Predictive customer lifecycle mapping`),
      bullet(`Cross device journey tracking`),
      bullet(`AI powered CX insights across every stage`),

      h2('How AI Improves the Customer Journey'),
      p(`AI enhances traditional journey mapping through:`),
      bulletLead('Touchpoint Analysis: ', `Identifying every AI customer touchpoint across devices and channels.`),
      bulletLead('Behavioral Analytics: ', `Understanding intent at each stage of the conversion funnel.`),
      bulletLead(
        'Journey Orchestration: ',
        `Automating next best actions in real time through AI journey orchestration.`
      ),
      bulletLead('Predictive Insights: ', `Forecasting where customers may drop off before it happens.`),
      bulletLead('Omnichannel Mapping: ', `Connecting the omnichannel customer journey into one unified view.`),
      bulletLead('Sentiment Tracking: ', `Measuring customer emotion at key touchpoints to guide messaging.`),

      h2('Stages of an AI Powered Customer Journey'),
      bulletLead('Awareness: ', `AI identifies early customer insights through top of funnel behavior.`),
      bulletLead('Consideration: ', `AI journey analytics track engagement across content and channels.`),
      bulletLead('Conversion: ', `AI customer journey tools guide personalized offers at the right moment.`),
      bulletLead('Retention: ', `AI customer engagement strategies improve customer retention over time.`),
      bulletLead('Loyalty: ', `AI journey optimization strengthens customer loyalty through consistent experiences.`),
      bulletLead('Advocacy: ', `AI identifies customers likely to refer others or leave positive reviews.`),

      h2('Why Customer Journey Mapping Matters'),
      bullet(`Reveals gaps in the conversion funnel that are otherwise invisible`),
      bullet(`Improves touchpoint optimization across every channel`),
      bullet(`Strengthens customer lifecycle strategies from first click onward`),
      bullet(`Enhances AI powered CX consistency across teams`),
      bullet(`Supports better customer retention planning`),
      bullet(`Helps align marketing, sales, and support teams around one shared journey view`),

      h2('Best Tools for AI Customer Journey Mapping'),
      bullet(`Salesforce`),
      bullet(`Adobe Experience Platform`),
      bullet(`HubSpot`),
      bullet(`Segment`),
      bullet(`Mixpanel`),
      bullet(`Amplitude`),
      bullet(`Google Analytics 4`),
      bullet(`Microsoft Dynamics 365`),
      bullet(`Qualtrics`),
      p(
        `These platforms help brands build a complete AI customer journey mapping strategy from first interaction to long term loyalty, often integrating directly with personalization and marketing automation tools already in use.`
      ),

      h2('AI Customer Journey Mapping Strategy'),
      bullet(`Identify all customer touchpoints across every channel`),
      bullet(`Apply behavioral analytics to understand intent at each stage`),
      bullet(`Use AI journey orchestration for automated, timely responses`),
      bullet(`Map the omnichannel customer journey into one unified dashboard`),
      bullet(`Continuously refine using journey optimization insights`),
      bullet(`Share journey data across teams to align messaging and priorities`),
      bullet(`Revisit the journey map whenever new products or channels launch`),

      h2('Common Mistakes in Customer Journey Mapping'),
      bullet(`Mapping the journey once and never updating it again`),
      bullet(`Ignoring offline or in person touchpoints entirely`),
      bullet(`Failing to connect journey data with sales and support teams`),
      bullet(`Treating every customer segment the same way`),
      bullet(`Overlooking post purchase stages like retention and advocacy`),
      bullet(`Relying on assumptions instead of real behavioral analytics`),

      h2('AI Customer Journey Mapping by Business Type'),
      p(`Different business models benefit from AI customer journey mapping in slightly different ways.`),
      bulletLead(
        'Ecommerce: ',
        `Focuses on mapping AI customer touchpoints from product discovery to repeat purchase.`
      ),
      bulletLead('SaaS: ', `Uses AI journey analytics to track the path from free trial to paid conversion and renewal.`),
      bulletLead(
        'B2B Services: ',
        `Applies AI journey orchestration across longer sales cycles involving multiple decision makers.`
      ),
      bulletLead('Retail: ', `Connects the omnichannel customer journey between in store visits and online browsing.`),
      p(
        `Recognizing these differences allows businesses to apply AI customer journey mapping tools in a way that reflects their real customer behavior rather than a generic funnel.`
      ),

      h2('How to Measure the Success of AI Customer Journey Mapping'),
      bullet(`Reduction in drop off rates at key conversion funnel stages`),
      bullet(`Improvement in customer retention tied to journey optimization`),
      bullet(`Increase in AI customer engagement across touchpoints`),
      bullet(`Faster identification of friction points through AI journey analytics`),
      bullet(`Higher advocacy and referral rates linked to loyalty stage improvements`),

      h2('Connecting AI Customer Journey Mapping With Other Marketing Systems'),
      p(
        `AI customer journey mapping delivers the most value when it is connected to the rest of the marketing stack rather than treated as a standalone report.`
      ),
      bulletLead(
        'Personalization Tools: ',
        `Journey data can trigger personalized offers at the exact moment a customer shows buying intent.`
      ),
      bulletLead(
        'Marketing Automation: ',
        `AI journey orchestration can feed directly into automated email or chatbot workflows.`
      ),
      bulletLead(
        'Analytics Platforms: ',
        `Combining journey mapping with AI marketing analytics gives a fuller picture of both behavior and revenue impact.`
      ),
      bulletLead(
        'Customer Support: ',
        `Sharing journey insights with support teams helps resolve issues before they affect retention.`
      ),
      p(
        `This level of integration turns AI customer journey mapping from a passive visualization tool into an active driver of customer experience improvements across the entire business.`
      ),

      h2('The Future of AI Customer Journey Mapping'),
      p(
        `As AI journey orchestration tools continue to mature, journey mapping is shifting from a static, quarterly exercise into a living, real time system. Brands are increasingly able to see a customer's entire history across every touchpoint in one place, then act on it automatically. This shift is closely tied to broader trends in personalization and marketing automation, since all three disciplines rely on the same underlying customer data and behavioral analytics.`
      ),

      h2('Final Thoughts'),
      p(
        `AI customer journey mapping gives brands a complete view of the customer experience, from the first click to long term loyalty. By combining AI journey analytics, journey orchestration, and touchpoint optimization, businesses can build stronger relationships at every stage of the funnel. As predictive customer lifecycle mapping becomes more accurate, brands that invest in this discipline will consistently spot opportunities and risks long before competitors relying on static, outdated journey maps.`
      ),
    ],
    faqs: [
      {
        question: 'What is AI customer journey mapping?',
        answer: 'It is the use of AI to track and optimize every touchpoint a customer experiences with a brand.',
      },
      {
        question: 'How does AI improve the customer journey?',
        answer:
          'By analyzing behavior, predicting drop off points, and orchestrating personalized next steps in real time.',
      },
      {
        question: 'What are the stages of an AI powered customer journey?',
        answer: 'Awareness, consideration, conversion, retention, loyalty, and advocacy.',
      },
      {
        question: 'Which tools help with customer journey mapping?',
        answer: 'Salesforce, Adobe Experience Platform, HubSpot, and Qualtrics are widely used for this purpose.',
      },
      {
        question: 'Why is customer journey mapping important?',
        answer:
          'It helps brands identify friction points and build stronger, more personalized customer experiences.',
      },
      {
        question: 'How often should customer journey maps be updated?',
        answer:
          'Most brands should review and update journey maps quarterly, or whenever a major product, channel, or pricing change occurs.',
      },
    ],
  },
];

// --- Guards ----------------------------------------------------------------
/** Fail loudly rather than silently shipping a dash the brief banned. */
function assertNoDashes() {
  const banned = /[—–]/; // em dash, en dash
  for (const a of ARTICLES) {
    const haystack = [
      a.title,
      a.metaTitle,
      a.metaDescription,
      a.excerpt,
      ...a.body.flatMap((b) => (b.children || []).map((c) => c.text)),
      ...a.faqs.flatMap((f) => [f.question, f.answer]),
    ];
    for (const s of haystack) {
      if (banned.test(s)) throw new Error(`Dash found in "${a.slug}": ${s.slice(0, 90)}`);
    }
  }
}

function assertUniqueSlugs() {
  const seen = new Set();
  for (const a of ARTICLES) {
    if (seen.has(a.slug)) throw new Error(`Duplicate slug in this batch: ${a.slug}`);
    seen.add(a.slug);
  }
}

function readTimeOf(article) {
  const words = article.body
    .flatMap((b) => (b.children || []).map((c) => c.text))
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// --- Push ------------------------------------------------------------------
async function run() {
  assertNoDashes();
  assertUniqueSlugs();
  console.log(`${DRY_RUN ? '[DRY RUN] ' : ''}Pushing ${ARTICLES.length} posts to ${projectId}/${dataset}\n`);

  let replaced = 0;
  for (const a of ARTICLES) {
    const existing = DRY_RUN ? null : await client.fetch(`*[_type=="post" && slug.current==$s][0]{_id}`, { s: a.slug });

    const doc = {
      _id: a.slug,
      _type: 'post',
      title: a.title,
      slug: { _type: 'slug', current: a.slug },
      author: { _type: 'reference', _ref: AUTHOR_ID },
      categories: a.categories.map((id) => ({ _type: 'reference', _ref: id, _key: key() })),
      publishedAt: a.publishedAt,
      excerpt: a.excerpt,
      readTime: readTimeOf(a),
      featured: false,
      visible: false, // stays off the site until someone flips it in the Studio
      faqsJson: JSON.stringify(a.faqs, null, 2),
      metaTitle: a.metaTitle,
      metaDescription: a.metaDescription,
      body: a.body,
    };

    console.log(`• ${a.title}`);
    console.log(`  slug=${a.slug}`);
    console.log(
      `  visible=false  readTime=${doc.readTime}  blocks=${a.body.length}  faqs=${a.faqs.length}  ` +
        `metaTitle=${a.metaTitle.length}ch  metaDesc=${a.metaDescription.length}ch`
    );

    if (DRY_RUN) {
      console.log('  (dry run, nothing written)\n');
      continue;
    }

    if (existing) {
      console.log(`  ! slug already exists (${existing._id}), replacing it`);
      replaced++;
    }
    const res = await client.createOrReplace(doc);
    console.log(`  saved _id=${res._id} -> /blog/${a.slug} (hidden)\n`);
  }

  if (!DRY_RUN) console.log(`Done. ${ARTICLES.length - replaced} created, ${replaced} replaced.`);
  else console.log('Dry run complete. Re-run without --dry-run to write.');
}

run().catch((err) => {
  console.error('\nFailed:', err.message);
  process.exit(1);
});
