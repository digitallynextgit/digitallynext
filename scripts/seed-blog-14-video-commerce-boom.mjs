/**
 * Seed script - Blog 14
 * "The Video-Commerce Boom"
 *
 * Usage:
 *   node scripts/seed-blog-14-video-commerce-boom.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// ── Load .env ──
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../.env');

try {
  const raw = readFileSync(envPath, 'utf-8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key && !process.env[key]) {
      process.env[key] = rest.join('=').replace(/^['"]|['"]$/g, '');
    }
  }
} catch {
  console.warn('⚠  Could not read .env - make sure env vars are set in your shell.');
}

// ── Sanity client ──
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const key = () => Math.random().toString(36).slice(2, 10);

async function getOrCreateCategory(title) {
  const existing = await client.fetch(
    `*[_type == "category" && title == $title][0]{ _id }`,
    { title }
  );
  if (existing) {
    console.log(`  ✓ Found category: ${title}`);
    return existing._id;
  }
  const created = await client.create({ _type: 'category', title });
  console.log(`  ✓ Created category: ${title}`);
  return created._id;
}

async function getOrCreateAuthor(name) {
  const existing = await client.fetch(
    `*[_type == "author" && name == $name][0]{ _id }`,
    { name }
  );
  if (existing) {
    console.log(`  ✓ Found author: ${name}`);
    return existing._id;
  }
  const created = await client.create({ _type: 'author', name });
  console.log(`  ✓ Created author: ${name}`);
  return created._id;
}

// Block builders
const p = (text) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: key(), marks: [], text }],
});

const h2 = (text) => ({
  _type: 'block',
  _key: key(),
  style: 'h2',
  markDefs: [],
  children: [{ _type: 'span', _key: key(), marks: [], text }],
});

// ── Portable Text body ──
const body = [
  // ── Lede ──
  h2('The Moment Shopping Stopped Requiring Intent'),
  p(
    "Traditional commerce was built on intent. The consumer identified a need, searched for a solution, compared options, and purchased. The entire architecture of digital retail, from search advertising to product listing pages to comparison sites, was designed around this intent-driven model."
  ),
  p(
    "Video-commerce has fundamentally disrupted that model. Not replaced it, but disrupted it in ways that are generating billions in incremental commerce that the intent-driven model was never capturing."
  ),
  p(
    "When a consumer opens TikTok with no shopping intent whatsoever, watches a sixty-second video of someone using a skincare product in their morning routine, and purchases that product within the same session, that is not an intent-driven transaction. That is discovery-led commerce enabled by the seamless integration of content and purchasing. The consumer did not know they wanted the product sixty seconds earlier. The product found them."
  ),
  p(
    "This is not a niche behavior pattern. It is becoming a dominant one, particularly among consumers under 40, and the commerce infrastructure being built around it is reshaping digital retail in ways that are still in their early stages."
  ),

  // ── Section 2 ──
  h2('The Data Behind the Boom'),
  p(
    "The global social commerce market is projected to reach 1.2 trillion dollars by the end of 2025, according to Accenture research, with video-driven discovery being the primary growth driver. TikTok Shop's gross merchandise value grew by over 300 percent year-over-year in key markets including the United States and United Kingdom in 2023 and 2024. YouTube Shopping has integrated product tagging across millions of creator videos, allowing viewers to purchase without leaving the platform. Instagram and Pinterest have both substantially deepened their native checkout capabilities."
  ),
  p(
    "These are not early-stage experiments being run by platforms hoping to find a business model. These are platform infrastructure investments at significant scale, made by organizations that have validated the commerce behavior through years of data and are now building permanent infrastructure around it."
  ),
  p(
    "The brand response has been uneven. Some brands, particularly in beauty, fashion, fitness, and consumer electronics, have moved aggressively and built video-commerce capabilities that are now generating measurable revenue contributions. Many others are still treating video primarily as a brand awareness channel, watching their competitors close sales in the same videos where they are only building impressions."
  ),

  // ── Section 3 ──
  h2('Why Video-Commerce Works: The Behavioral and Psychological Mechanics'),
  p('Understanding why video-commerce converts so effectively is important for building strategy, not just tactics.'),
  p(
    "Trust is built through demonstration in ways that static formats cannot match. Video answers the questions that product images and descriptions leave open. How does this foundation actually look on real skin in natural light? How does this piece of clothing move when someone is actually wearing it? How difficult is this product to set up and use in a real environment? These are the questions that create purchase hesitation, and video answers them in thirty seconds in ways that the most carefully written product description cannot."
  ),
  p(
    "Emotional engagement is higher in video than any other content format. Video activates multiple sensory channels simultaneously, combines music, movement, narration, visual storytelling, and human expression, and creates an emotional context for purchase decisions that static content cannot replicate. Because purchase decisions are heavily emotion-driven, even for products we rationalize as purely functional purchases, the medium that best activates emotion is the medium that converts best."
  ),
  p(
    "Creator credibility transfers social proof at scale in a way that is genuinely unique to this channel. When a creator with a genuine relationship with their audience recommends a product, the recommendation carries something close to the trust weight of a personal recommendation from a friend. The consumer's perception is not \"this is an advertisement.\" It is \"this person I follow and trust uses this product.\" That trust dynamic, delivered at the scale of an audience of hundreds of thousands or millions of followers, is an advertising format with no real equivalent in the history of marketing."
  ),
  p(
    "Friction reduction is the mechanical enabler that makes the emotional and trust dynamics convert efficiently. TikTok Shop, Instagram Checkout, YouTube Shopping, and Pinterest's native purchasing tools have engineered the gap between desire and purchase down to one or two taps. In the traditional model, a viewer who discovered a product in a video had to remember the product name, open a separate browser, find the brand's website, locate the specific product, add it to cart, and complete checkout. Each step in that process represented an opportunity for the purchase impulse to fade. Native checkout within the video experience captures the purchase at the moment of peak desire."
  ),

  // ── Section 4 ──
  h2('Building a Video-Commerce Strategy That Actually Converts'),
  p(
    "The strategic error most brands make when entering video-commerce is leading with the product. Native video audiences are highly attuned to content that is primarily a sales vehicle and scroll past it without engagement. The content has to earn attention on its own terms before commerce can follow."
  ),
  p(
    "Entertainment first, commerce second is the organizing principle. Content that teaches something useful, creates genuine entertainment value, tells an authentic story, or makes the viewer feel something, with commerce integrated naturally rather than forced, consistently outperforms content built around the product pitch. The product should feel like a natural recommendation from the content, not the reason the content exists."
  ),
  p(
    "Creator partnerships require more strategic investment than most brands are making. The tendency is to treat influencer marketing as a media buy, negotiate a deliverable, approve the content, push it live, and measure performance against the last campaign. The brands generating superior video-commerce returns are treating creators as long-term partners who develop genuine product familiarity and authentic advocacy that their audiences can detect and respond to. A creator who has been using a product for six months will generate meaningfully different content than one who received the product three days before posting."
  ),
  p(
    "Building a tiered creator ecosystem, with macro creators driving reach and brand awareness at the top and micro-creators with highly engaged niche audiences driving conversion at the bottom, reflects the actual dynamics of how video-commerce attribution works. Awareness is built by scale. Conversion is driven by trust. These require different creator profiles, different content briefs, and different performance metrics."
  ),
  p(
    "Sound-off optimization is a frequently overlooked technical requirement. A significant portion of video content is consumed without audio, particularly on social platforms where users are in public environments or are scrolling while doing something else. Captions, on-screen text, and visual storytelling that communicates effectively without sound are baseline requirements for video-commerce content. The creative should then make sound-on viewing meaningfully richer through music, narration, and audio design, but it must function without it."
  ),
  p(
    "Short-form and long-form formats serve different roles in the video-commerce funnel and should be planned as a coordinated system rather than separate formats competing for the same budget. Short-form video at 15 to 60 seconds, on TikTok, Instagram Reels, and YouTube Shorts, is the discovery and interest layer. It introduces the product in an engaging context, creates desire, and drives profile visits and search. Long-form content on YouTube, in livestreams, and through extended creator reviews provides the depth of information and the trust-building exposure time that is required to close considered purchases. Brands that invest in both layers and design them to work together see significantly higher overall video-commerce performance than those treating them as alternatives."
  ),

  // ── Section 5 ──
  h2('The Live Shopping Opportunity That Western Brands Are Still Underestimating'),
  p(
    "Live shopping combines real-time video with interactive audience participation and immediate purchase capability. In China, live commerce through platforms like Taobao Live and Douyin has grown to represent more than 20 percent of total e-commerce gross merchandise value. It is not a niche format in markets where it has achieved maturity. It is a primary commerce channel."
  ),
  p(
    "Western markets are in early to mid-stage adoption. TikTok LIVE Shopping, Instagram Live Shopping, and YouTube Live have all made significant platform investments in live commerce infrastructure. Consumer familiarity with the format is growing as more creators and brands run live shopping events regularly."
  ),
  p(
    "The competitive window in Western markets remains meaningful. Brands that build live shopping competency now, through owned live events on their own platforms, creator-hosted streams featuring their products, and platform-native live shopping events, are establishing channel expertise and audience relationships that will compound in value as the format scales. The time to build that competency is before the format is crowded, not after."
  ),
];

// ── FAQs ──
const faqsJson = JSON.stringify(
  [
    {
      question: 'What is video-commerce and how is it different from regular social commerce?',
      answer:
        'Video-commerce is the integration of product discovery and purchase capability directly within video content, on platforms like TikTok, Instagram, YouTube, and Pinterest, eliminating the need to navigate to a separate retail site. Social commerce is the broader category of commerce occurring within social platforms; video-commerce refers specifically to the video-native discovery and purchase experience.',
    },
    {
      question: 'Which product categories perform best in video-commerce?',
      answer:
        "Beauty, skincare, fashion, fitness, food and beverage, consumer electronics, and home goods consistently show the highest video-commerce conversion rates. These categories share a common characteristic: the product's value is demonstrated more effectively through video than it can be described in text or shown in static images.",
    },
    {
      question: 'How do I measure video-commerce performance accurately?',
      answer:
        'Track view-to-click rate, click-to-cart rate, cart-to-purchase completion rate, and cost per acquisition at the individual video and creator level. Engagement metrics, particularly saves and shares, are leading indicators of content that will drive commerce outcomes, as they signal genuine audience intent that correlates with purchase behavior downstream.',
    },
    {
      question: 'Is live shopping right for every brand?',
      answer:
        'Live shopping performs best for brands with visually engaging products, genuine brand stories to tell, and audiences that have demonstrated social platform engagement. Beauty, fashion, food, wellness, and consumer electronics are the consistently strongest categories. B2B brands and categories with low visual engagement require more creative strategic adaptation to make the format work effectively.',
    },
  ],
  null,
  2
);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 14: The Video-Commerce Boom...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['Strategy', 'Marketing', 'Digital Strategy'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/video-commerce-boom.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'video-commerce-boom.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Video-commerce boom - discovery-led shopping through short-form video and live streaming platforms',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/video-commerce-boom.jpg - skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'The Video-Commerce Boom',
    slug: { _type: 'slug', current: 'the-video-commerce-boom' },
    excerpt:
      'Video and commerce have merged into one seamless experience. Here is why video-commerce is the fastest-growing channel in digital retail and how brands can build a winning strategy right now.',
    publishedAt: '2026-06-19T10:00:00.000Z',
    featured: false,
    readTime: 13,
    body,
    faqsJson,
    metaTitle: 'The Video-Commerce Boom',
    metaDescription:
      'Video and commerce have merged into one seamless experience. Here is why video-commerce is the fastest-growing channel in digital retail and how brands can build a winning strategy right now.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: the-video-commerce-boom`);
  console.log(`    URL:  /blog/the-video-commerce-boom\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
