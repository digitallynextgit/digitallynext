/**
 * Seed script - Blog 5
 * "The AI Marketing Trap: Why Brands That Automate Everything Lose What Made Them Worth Following"
 *
 * Usage:
 *   node scripts/seed-blog-5-ai-marketing-trap.mjs
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

// ── Portable Text body ──
const body = [
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "AI can do a lot for your marketing. It can write faster, optimise better, and distribute further than any human team. What it cannot do is care. And the brands that have handed over everything are quietly discovering that their audiences have stopped caring too." }],
  },

  // ── Section 1: Quick Answer ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Quick Answer' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Automating execution is smart. Automating your brand's point of view is where things go wrong. The brands losing ground right now are not the ones using AI too little. They are the ones using it to replace the human judgment, creative risk, and genuine perspective that made people follow them in the first place. The fix is not less AI. It is knowing exactly where AI stops and your brand begins." }],
  },

  // ── Section 2: What the Trap Looks Like ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'What the Trap Actually Looks Like' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "It starts reasonably. You use AI to write first drafts. Then to generate social captions. Then to build email sequences. Then to handle ad copy variations. Then someone asks: why are we still briefing writers at all?" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Six months later, your content output has tripled. Your engagement has dropped 40%. Your comments section, once full of real conversations, now has people asking if a bot runs your account." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "They are not wrong." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The trap is not automation itself. The trap is mistaking volume for presence." }],
  },

  // ── Section 3: What AI Cannot Replicate ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'What AI Cannot Replicate' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "AI is very good at pattern recognition. It has seen enough marketing content to produce something that looks, sounds, and reads like a competent brand. That is also the problem." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "It produces the average of everything it has been trained on. And the average of all brand content is:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Safe' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Predictable' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Inoffensive' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Forgettable' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The brands people actually follow are none of those things. They have a point of view. They take sides. They write things that could only have come from one specific place, one specific perspective, one specific human understanding of what their audience is going through." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "AI cannot have a bad day and write something honest about it. It cannot notice something strange happening in the culture and have a genuine reaction to it. It cannot decide that everyone else is saying the wrong thing and choose to say something different." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "That originality is not a feature. It is the product." }],
  },

  // ── Section 4: Where Automation Is Right ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Where Automation Is Actually the Right Call' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "This is not an argument against using AI in marketing. It is an argument against using it in the wrong places." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Automate the things that should never have required human creativity in the first place:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'A/B testing subject lines for send-time optimisation' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Resizing and reformatting creative assets across platforms' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Scheduling and publishing approved content' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Generating first drafts that a human then rewrites with real perspective' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Pulling performance data and surfacing what needs attention' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "These are execution tasks. They have always been execution tasks. Handing them to AI frees your team to do the things that actually build brand equity." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The mistake is when brands start automating the judgment layer. The \"what should we say and why\" layer. The \"does this feel like us\" layer. The \"is this the right moment to say this\" layer." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "That layer is not a bottleneck. It is the job." }],
  },

  // ── Section 5: Brands Getting This Right ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Brands Getting This Right' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The brands with the strongest AI-assisted marketing in 2026 share one trait: a human editorial layer that AI output cannot bypass." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Every piece of content, regardless of who or what created the first draft, passes through a person whose job is to ask: does this sound like something a real human at this company would actually say? Is there a perspective here, or just information? Would someone share this because it moved them, or because it was useful for 30 seconds?" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "That review step is not a quality gate. It is where the brand actually gets made." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Some of these teams use AI for 70 to 80% of their production volume. But the 20 to 30% that gets real human creative investment is what their audience quotes, shares, and remembers. The AI content keeps the lights on. The human content builds the brand." }],
  },

  // ── Section 6: Question Worth Asking ──
  {
    _type: 'block', _key: key(), style: 'h2', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'The Question Worth Asking Your Team' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Pull up your last 30 days of published content. Read through it as if you were encountering your brand for the first time." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "Ask yourself:" }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Does this content have a point of view, or does it just have information?' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Could a competitor swap their logo onto this and lose nothing?' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Is there anything here that only this brand could have said?' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: 'Would a person who loves this brand feel recognised by this content?' }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "If the answers are uncomfortable, that is useful. It means the automation has crept into places it was not supposed to go." }],
  },
  {
    _type: 'block', _key: key(), style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: key(), marks: [], text: "The goal is not to use less AI. The goal is to use it on the right half of the work." }],
  },
];

// ── FAQs ──
const faqsJson = JSON.stringify([
  {
    question: "Is AI bad for brand marketing?",
    answer: "No. AI is genuinely useful for the execution layer of marketing: drafts, distribution, testing, formatting, scheduling. The problem is when it replaces the judgment layer, where brand voice, creative risk, and genuine perspective live. Used correctly, AI gives your human team more time to do the work that actually builds brand loyalty.",
  },
  {
    question: "How do I know if my brand has over-automated its content?",
    answer: "Check your engagement trend over the last six months alongside your content volume. If output has gone up and meaningful engagement has gone down, the brand voice has likely been diluted. Read through your last 30 posts as a first-time audience member. If nothing feels surprising, specific, or distinctly yours, the automation has gone too far.",
  },
  {
    question: "What parts of marketing should never be fully automated?",
    answer: "Brand voice decisions, creative direction, cultural commentary, campaign strategy, and any content that requires an opinion. Also anything where getting it wrong would damage trust rather than just perform poorly. AI can draft. It should not decide what your brand believes or how it responds to things happening in the world.",
  },
  {
    question: "How do the best teams balance AI output with human creative work?",
    answer: "Most high-performing teams use AI for 60 to 80% of production volume, particularly for content that maintains presence and consistency, and reserve deep human creative effort for the 20 to 30% that is meant to move people. The human editorial layer does not just proofread. It asks whether the content sounds like a real point of view or just competent filler.",
  },
  {
    question: "Can AI learn our brand voice over time?",
    answer: "It can approximate it. With enough examples, good prompting, and consistent fine-tuning, AI can produce content that sounds close to your brand's tone. What it cannot do is develop new opinions, respond genuinely to cultural moments, or take creative risks that were not already in the training data. The brand voice AI learns from is always the one humans built first.",
  },
], null, 2);

// ── Main ──
async function main() {
  console.log('🚀  Starting seed for Blog 5: AI Marketing Trap...\n');

  const authorId = await getOrCreateAuthor('Editorial Team');

  const categoryIds = await Promise.all(
    ['AI in Marketing', 'Branding', 'Strategy'].map(getOrCreateCategory)
  );

  let mainImage = undefined;
  const imagePath = resolve(__dirname, '../public/blog/ai-marketing-trap.jpg');
  if (existsSync(imagePath)) {
    const imageBuffer = readFileSync(imagePath);
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: 'ai-marketing-trap.jpg',
      contentType: 'image/jpeg',
    });
    mainImage = {
      _type: 'image',
      asset: { _type: 'reference', _ref: asset._id },
      alt: 'Marketing team reviewing AI-generated content versus human-crafted brand work',
    };
    console.log('  ✓ Uploaded main image');
  } else {
    console.log('  ⚠  Image not found at public/blog/ai-marketing-trap.jpg - skipping image');
  }

  const doc = {
    _type: 'post',
    title: 'The AI Marketing Trap: Why Brands That Automate Everything Lose What Made Them Worth Following',
    slug: { _type: 'slug', current: 'ai-marketing-trap-brands-automate-everything-brand-voice' },
    excerpt: "AI can do a lot for your marketing. It can write faster, optimise better, and distribute further than any human team. What it cannot do is care. And the brands that have handed over everything are quietly discovering that their audiences have stopped caring too.",
    publishedAt: '2026-05-07T11:00:00.000Z',
    featured: false,
    readTime: 7,
    body,
    faqsJson,
    metaTitle: 'The AI Marketing Trap: Why Brands That Automate Everything Lose What Made Them Worth Following',
    metaDescription: 'AI can write your captions, run your ads, and schedule your emails. It cannot replace the thing that made people care about your brand in the first place. Here is where the line is.',
    author: { _type: 'reference', _ref: authorId },
    categories: categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
    ...(mainImage ? { mainImage } : {}),
  };

  const result = await client.create(doc);
  console.log('\n✅  Blog post created successfully!');
  console.log(`    _id:  ${result._id}`);
  console.log(`    slug: ai-marketing-trap-brands-automate-everything-brand-voice`);
  console.log(`    URL:  /blog/ai-marketing-trap-brands-automate-everything-brand-voice\n`);
}

main().catch((err) => {
  console.error('❌  Failed:', err.message);
  process.exit(1);
});
