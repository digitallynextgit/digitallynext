/**
 * One-shot: port the 7 hardcoded employee stories from
 * src/data/employeeStories.ts into Sanity as `employeeStory` documents.
 *
 * Uses the visual order the source file intended (the trailing "//1..//7"
 * comments — the numeric `order_id` values were shuffled 1,2,3,5,6,7,4).
 *
 * Idempotent: uses createOrReplace keyed by _id, so re-running updates
 * the same docs. Drag-to-reorder in Studio will re-rank as needed.
 */
import { createClient } from 'next-sanity';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

try {
  process.loadEnvFile(path.resolve(process.cwd(), '.env'));
} catch {
  /* env may already be set */
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_STUDIO_API_TOKEN;
if (!projectId || !dataset || !token) {
  console.error('Missing Sanity env vars in .env');
  process.exit(1);
}
const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false });

// Intended visual order (matches the //1..//7 trailing comments in the source).
// orderRank is a padded, lexicographically-sortable string. Big gaps between
// keys give the orderable plugin plenty of room to insert new ranks between
// them when someone drags in Studio.
const STORIES = [
  {
    _id: 'employeeStory.dn-1',
    title: 'Employee story 1',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7467910619585880064?collapsed=1',
    orderRank: '0|100000',
  },
  {
    _id: 'employeeStory.dn-2',
    title: 'Employee story 2',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7465413306984542209?collapsed=1',
    orderRank: '0|200000',
  },
  {
    _id: 'employeeStory.dn-3',
    title: 'Employee story 3',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7463113248968581120?collapsed=1',
    orderRank: '0|300000',
  },
  {
    _id: 'employeeStory.dn-4',
    title: 'Employee story 4',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7345339931210223616?collapsed=1',
    orderRank: '0|400000',
  },
  {
    _id: 'employeeStory.dn-5',
    title: 'Employee story 5',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7474362766976499713?collapsed=1',
    orderRank: '0|500000',
  },
  {
    _id: 'employeeStory.dn-6',
    title: 'Employee story 6',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7474014932448067584?collapsed=1',
    orderRank: '0|600000',
  },
  {
    _id: 'employeeStory.dn-7',
    title: 'Employee story 7',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7479565265886765056?collapsed=1',
    orderRank: '0|700000',
  },
];

async function run() {
  console.log(`Sanity: ${projectId}/${dataset}`);
  console.log(`Seeding ${STORIES.length} employee stories...\n`);
  for (const s of STORIES) {
    const doc = {
      _id: s._id,
      _type: 'employeeStory',
      title: s.title,
      embedUrl: s.embedUrl,
      published: true,
      orderRank: s.orderRank,
    };
    const res = await client.createOrReplace(doc);
    console.log(`  ✓ ${res._id} — ${s.title} (rank ${s.orderRank})`);
  }
  console.log('\nDone. Drag rows in Studio → Employee Stories to reorder.');
}

run().catch((err) => {
  console.error('\nFailed:', err.message);
  console.error(err.stack);
  process.exit(1);
});
