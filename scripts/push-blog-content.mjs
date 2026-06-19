/**
 * Push blog content from /content into Sanity.
 *
 * - Uploads the main image (from /content) and attaches it to each post.
 * - Builds Portable Text body, puts FAQs in `faqsJson` (matching existing posts).
 * - Idempotent: uses a deterministic _id (the slug) via createOrReplace, so
 *   re-running updates the same documents instead of creating duplicates.
 *
 * Run from the repo root:  node scripts/push-blog-content.mjs
 *
 * Requires in .env:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_STUDIO_API_TOKEN
 */
import { createClient } from 'next-sanity';
import { createReadStream, existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

// --- Load .env (Node >= 20.12 / 24) ---------------------------------------
try {
  process.loadEnvFile(path.resolve(process.cwd(), '.env'));
} catch {
  /* env may already be set in the shell */
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_STUDIO_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    'Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_STUDIO_API_TOKEN in .env'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const CONTENT_DIR = path.resolve(process.cwd(), 'content');
const AUTHOR_ID = '704c8009-6b36-4ca3-93d2-07256d52207c'; // digitallynext
const CAT_HR = 'BcZlIXMtUldsliYl5O4Nym'; // Career Talks - HR Corner

// --- Portable Text helpers -------------------------------------------------
const key = () => randomUUID().replace(/-/g, '').slice(0, 12);

/** content: string | Array<{ text, marks? }> */
function block(style, content) {
  const parts = typeof content === 'string' ? [{ text: content }] : content;
  return {
    _type: 'block',
    _key: key(),
    style,
    markDefs: [],
    children: parts.map((s) => ({
      _type: 'span',
      _key: key(),
      text: s.text,
      marks: s.marks || [],
    })),
  };
}

const p = (text) => block('normal', text);
const h2 = (text) => block('h2', text);
const h3 = (text) => block('h3', text);
/** A paragraph that opens with a bold label, e.g. "Label: rest of sentence." */
const lead = (label, rest) =>
  block('normal', [{ text: label, marks: ['strong'] }, { text: rest }]);

function bullet(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  };
}

// --- Article content -------------------------------------------------------
const ARTICLES = [
  {
    slug: 'hiring-culture-add-not-culture-fit',
    image: 'article4.webp', // Article 3 (culture add) - uses the puzzle/"culture add" image
    title:
      "We Stopped Hiring for Culture Fit and Started Hiring for Culture Add - Here's Why It Made Us a Better Team",
    excerpt:
      "We retired 'culture fit' as a hiring filter and replaced it with 'culture add'. Here's what changed, the criteria we hire on now, and the interview questions we actually ask at Digitally Next.",
    metaTitle: 'Culture Fit vs Culture Add: Why We Changed How We Hire',
    metaDescription:
      "We stopped hiring for culture fit and started hiring for culture add. Here's what changed, the criteria we hire on, and why it made our team better.",
    publishedAt: '2026-06-19T10:00:00.000Z',
    readTime: 6,
    categories: [CAT_HR],
    body: [
      p('A straight-talk perspective from Digitally Next'),

      h2('The Honest Confession First'),
      p('For a while, "culture fit" was one of our favourite hiring phrases.'),
      p(
        "We used it with good intentions. We wanted people who'd gel with the team, who'd vibe in standups, who wouldn't clash with how we worked. On paper, it sounded like we were protecting something worth protecting."
      ),
      p(
        "What we were actually doing - and it took us longer than we'd like to admit to see this - was hiring the same person, repeatedly, in slightly different packaging."
      ),
      p(
        'Same communication style. Same professional background. Same instinctive reactions to briefs. Same blind spots.'
      ),
      p(
        "And a team full of people who agree with each other isn't a strong team. It's a comfortable one. There's a difference."
      ),

      h2('What "Culture Fit" Was Really Screening For'),
      p(
        "Here's the uncomfortable truth about culture fit as a hiring filter: it's almost impossible to apply without bias creeping in."
      ),
      p(
        'When a hiring manager says "I\'m not sure they\'re the right fit," what they often mean - without realising it - is: they\'re not like us.'
      ),
      p(
        'Different energy in the room. Different way of framing ideas. Different background, different references, different instincts about what good work looks like.'
      ),
      p('None of those are red flags. In a creative agency, most of them are assets.'),
      p("Culture fit, applied uncritically, doesn't protect your culture. It calcifies it."),

      h2('What Culture Add Actually Means'),
      p("Culture add isn't the opposite of culture fit. It's a more honest version of the same question."),
      p(
        'Instead of asking "will this person slot into how we already work?" - you ask "what will this person bring that we don\'t already have?"'
      ),
      p("It's the difference between hiring to maintain and hiring to evolve."),
      p(
        'A culture add hire might challenge how you run a briefing. They might have a reference point your team has never heard of. They might push back on a creative direction in a way that initially feels uncomfortable and turns out to be exactly right.'
      ),
      p("They share your values. They just don't share your defaults. And that distinction is everything."),

      h2('What Changed When We Made the Shift'),
      p("We won't romanticise it - the shift wasn't seamless."),
      p(
        'Early on, some culture add hires created friction. Meetings got longer because more perspectives were in the room. Creative reviews got more contested. A few decisions that used to take twenty minutes started taking forty.'
      ),
      p('And then something shifted.'),
      p(
        "The work got sharper. Client presentations started landing differently because someone in the room had flagged a blind spot before the deck went out. Campaigns started reaching audiences we'd previously talked at rather than with. Internal debates that used to feel uncomfortable started feeling like the most valuable part of the process."
      ),
      p('The friction wasn\'t a problem to manage. It was the signal that something real was happening.'),

      h2('The Criteria We Actually Hire On Now'),
      p(
        "Dropping culture fit didn't mean dropping standards. It meant getting more precise about what our standards actually are."
      ),
      p('We now hire on:'),
      lead(
        'Shared values, not shared style: ',
        'Do they care about doing honest, effective work? Do they take accountability seriously? Do they treat people well? Those things are non-negotiable.'
      ),
      lead(
        'Intellectual honesty: ',
        'Can they disagree without making it personal? Can they change their mind when the evidence shifts? Can they say "I got that wrong" without it being a crisis?'
      ),
      lead(
        'Curiosity that shows up in the work: ',
        'Not just interest in marketing or advertising, but genuine curiosity about people, culture, behaviour. The kind that makes you better at this job without being told to improve.'
      ),
      lead(
        'Comfort with discomfort: ',
        'Culture add hires bring new energy. That requires a team willing to be challenged. We look for people who find that energising, not threatening - on both sides of the hire.'
      ),

      h2('What We Ask in Interviews Now'),
      p(
        'We retired questions like "describe your ideal team environment" because they just prompt people to perform the answer they think we want.'
      ),
      p('We replaced them with:'),
      bullet('"Tell us about a time you disagreed with a decision that went ahead anyway. What did you do with that?"'),
      bullet('"What\'s something you believe about this industry that most people in it would push back on?"'),
      bullet('"What have you changed your mind about in the last year, professionally?"'),
      p(
        "These aren't trick questions. They're designed to surface intellectual honesty, self-awareness, and genuine perspective - the things that make a culture add hire actually additive."
      ),

      h2("What This Means If You're Applying to Digitally Next"),
      p('We are not looking for someone who fits a mould.'),
      p(
        "We're looking for someone who has a point of view, owns it, and is still genuinely open to being wrong. Someone who will make us think differently about a brief, a client problem, or how we run a meeting."
      ),
      p(
        'If you\'ve been told you\'re "a lot" or "too opinionated" or "not the right vibe" somewhere else, we\'d genuinely like to hear from you.'
      ),
      p("The team we're building isn't a mirror. It's a mosaic."),
    ],
    faqs: [
      {
        question: 'What is the difference between culture fit and culture add in hiring?',
        answer:
          "Culture fit asks whether a candidate will slot into how a team already works - often defaulting to familiarity and similarity as proxies for compatibility. Culture add asks what a candidate brings that the team doesn't already have. The distinction matters because culture fit, applied without scrutiny, tends to homogenise teams over time, while culture add hiring builds teams with diverse perspectives, instincts, and references - which directly improves the quality of creative and strategic work.",
      },
      {
        question: 'Does hiring for culture add mean lowering hiring standards?',
        answer:
          "No, it means getting more precise about what your standards actually are. Culture add hiring separates non-negotiable values (accountability, intellectual honesty, quality of work, how people treat each other) from stylistic preferences (communication style, personality type, shared background). The bar doesn't drop; it gets more clearly defined. You stop filtering for sameness and start filtering for substance.",
      },
      {
        question: 'Why is culture fit hiring considered problematic in 2026?',
        answer:
          "Culture fit as a filter is increasingly recognised as a driver of unconscious bias in hiring. When interviewers assess 'fit,' they often unconsciously favour candidates who remind them of themselves or their existing team - in background, communication style, or cultural references. This quietly excludes capable candidates and leads to teams that are comfortable but not necessarily effective. Research consistently shows that cognitively and experientially diverse teams outperform homogeneous ones on complex, creative problems - exactly the kind agencies deal with daily.",
      },
      {
        question: 'How does Digitally Next define culture in its hiring process?',
        answer:
          "At Digitally Next, culture is defined by values, not aesthetics. We hire people who take honest work seriously, hold themselves accountable, stay genuinely curious, and can disagree without making it personal. Everything else - work style, personality, background, perspective - we actively want to vary. Our interview process is designed to surface intellectual honesty and real point of view, not to find candidates who perform the 'right' version of enthusiasm for the role.",
      },
    ],
  },

  {
    slug: 'exit-conversations-feedback-what-we-changed',
    image: 'article2.webp', // Article 4 (exit conversations) - uses the weekly-planning whiteboard image
    title: "Our Exit Conversations Gave Us Honest Feedback. Here's What We Actually Did About It.",
    excerpt:
      'Most agencies run exit interviews and file them away. We treated every exit conversation as a brief - here are the four things people told us, and exactly what we changed because of it.',
    metaTitle: 'What Our Exit Interviews Taught Us - And What We Changed',
    metaDescription:
      'We treated every exit conversation as honest feedback. Here are the themes departing team members raised - and the concrete changes we made at Digitally Next.',
    publishedAt: '2026-06-18T10:00:00.000Z',
    readTime: 5,
    categories: [CAT_HR],
    body: [
      p('A straight-talk perspective from Digitally Next'),

      h2('Most Companies Do Exit Interviews. Few Actually Listen.'),
      p("The exit interview is one of the most underused tools in any organisation's playbook."),
      p(
        "Not because companies don't conduct them - most do. But because the feedback rarely travels further than an HR spreadsheet that gets reviewed once a quarter, if at all."
      ),
      p(
        'Someone leaves. They finally say what they actually thought. And the organisation nods, files it, and moves on unchanged.'
      ),
      p("We didn't want to be that agency."),
      p(
        'So we made a decision: every exit conversation at Digitally Next would be treated not as a formality, but as a brief. An unfiltered, no-consequences brief from someone with nothing left to lose - and therefore every reason to be honest.'
      ),
      p("What we heard shaped what we built. Here's what that looks like now."),

      h2('What People Were Actually Telling Us'),
      p(
        "We're not sharing names or specific conversations - that wouldn't be fair. But the themes that came up consistently were clear enough that acting on them wasn't optional."
      ),
      lead(
        'Briefs needed more structure before work began. ',
        "Not because the team wasn't capable, but because unclear objectives and missing context were creating avoidable revision cycles. The ask was simple: get alignment before execution starts, not halfway through."
      ),
      lead(
        'Feedback needed to travel both ways. ',
        "Notes coming back without context meant people were executing changes they didn't fully understand. The ask was reasoning alongside the revision, so the work could actually improve, not just change."
      ),
      lead(
        'Recognition needed to be visible, not just felt. ',
        'Good work was being noticed privately. People wanted it acknowledged in the room, in front of the team - specific, genuine, and regular.'
      ),
      lead(
        'Workload predictability mattered more than workload volume. ',
        "Long weeks weren't the issue. Surprise long weeks were. The ask was visibility ahead of time - enough notice to plan, not just absorb."
      ),

      h2('What We Do Now'),
      h3('Everything lives on shared sheets and drives.'),
      p(
        "Workflows, timelines, task ownership, brief status - all of it is documented and accessible. No more chasing updates over WhatsApp or piecing together what's happening from three different threads. If it's not on the sheet, it doesn't exist. The team knows where to look, and more importantly, they know nothing will fall through a gap because someone forgot to forward an email."
      ),
      h3('No mid-week interventions.'),
      p(
        'This one changed the texture of our weeks significantly. Planning happens at the start of the week - workloads are mapped, deadlines are flagged, pressure points are visible before they become crises. Once the week is in motion, it runs. No surprise pivots dropped into Monday afternoons. No new briefs appearing on Wednesday evenings without warning. The week is protected once it\'s planned.'
      ),
      h3('Feedback now travels with context.'),
      p(
        'When work comes back with changes, the reasoning comes with it - what shifted, why the direction moved, what the client flagged. The person doing the work understands the full picture, not just the instruction. Revision quality goes up every time.'
      ),
      h3('Recognition is public, specific, and weekly.'),
      p(
        'Whenever someone does something praise-worthy, specific work by specific people gets called out in front of the full team. Not general encouragement - named, detailed acknowledgement of what someone actually pulled off. It costs nothing and has done more for team energy than almost anything else we\'ve changed.'
      ),

      h2("Why We're Sharing This"),
      p(
        'Because the instinct in most agencies is to manage perception - to present a version of the workplace that looks tidy from the outside.'
      ),
      p('We think that instinct is exactly what makes it hard to build something genuinely good.'),
      p(
        "If you're considering joining Digitally Next, we want you to know: we take hard feedback seriously, we act on it, and we'll take yours seriously too."
      ),
      p("The agency we're building isn't finished. But it's honest about where it is."),
    ],
    faqs: [
      {
        question: 'What is the purpose of an exit interview at a digital agency?',
        answer:
          'An exit interview is a structured conversation with a departing employee designed to surface honest, unfiltered feedback about their experience - the work, the culture, and the processes. Because the person leaving has no reason to soften their answers, exit conversations are one of the most valuable data points an agency can access. When taken seriously, they become a direct input into how workflows, management practices, and team culture are improved.',
      },
      {
        question: 'What are the most common workflow problems employees flag when leaving agencies?',
        answer:
          "The themes that surface most consistently aren't about salary or workload volume - they're about predictability and clarity. Unstructured briefs, one-directional feedback, mid-week surprise pivots, and invisible recognition are the friction points that appear most frequently. All of them are fixable, which is what makes them particularly costly when left unaddressed.",
      },
      {
        question: 'How does documented workflow actually improve agency team culture?',
        answer:
          "When tasks, timelines, and brief status live in shared, accessible documents - rather than scattered across messages and inboxes - the team gains two things: clarity about what's expected, and confidence that nothing will be missed. Documented workflows reduce the cognitive load of chasing updates and remove the ambiguity that quietly drives frustration on busy teams.",
      },
      {
        question: 'How does Digitally Next use exit feedback to improve how it operates?',
        answer:
          'Exit conversations at Digitally Next are treated as strategic input. Recurring themes are addressed with specific, structural changes - not vague cultural commitments. Today that looks like fully documented workflows on shared drives, protected weekly planning with no mid-week interventions, context-led feedback on all creative revisions, and a weekly public recognition ritual. We share this openly because transparency about how we operate builds more trust than a polished employer brand ever could.',
      },
    ],
  },
];

// --- Push ------------------------------------------------------------------
async function uploadImage(filename, alt) {
  const imgPath = path.join(CONTENT_DIR, filename);
  if (!existsSync(imgPath)) {
    console.warn(`  ! image not found: ${imgPath} - creating post without mainImage`);
    return null;
  }
  const asset = await client.assets.upload('image', createReadStream(imgPath), { filename });
  console.log(`  ✓ uploaded image ${filename} -> ${asset._id}`);
  return {
    _type: 'image',
    alt,
    asset: { _type: 'reference', _ref: asset._id },
  };
}

async function run() {
  console.log(`Pushing ${ARTICLES.length} posts to Sanity (${projectId}/${dataset})\n`);
  for (const a of ARTICLES) {
    console.log(`• ${a.title}`);
    const mainImage = await uploadImage(a.image, a.title);

    const doc = {
      _id: a.slug,
      _type: 'post',
      title: a.title,
      slug: { _type: 'slug', current: a.slug },
      author: { _type: 'reference', _ref: AUTHOR_ID },
      categories: a.categories.map((id) => ({ _type: 'reference', _ref: id, _key: key() })),
      publishedAt: a.publishedAt,
      excerpt: a.excerpt,
      readTime: a.readTime,
      featured: false,
      faqsJson: JSON.stringify(a.faqs, null, 2),
      metaTitle: a.metaTitle,
      metaDescription: a.metaDescription,
      body: a.body,
      ...(mainImage ? { mainImage } : {}),
    };

    const res = await client.createOrReplace(doc);
    console.log(`  ✓ saved post _id=${res._id} (/blog/${a.slug})\n`);
  }
  console.log('Done.');
}

run().catch((err) => {
  console.error('\nFailed:', err.message);
  process.exit(1);
});
