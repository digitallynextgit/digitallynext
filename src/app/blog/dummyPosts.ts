export interface DummyPost {
  _id: string;
  title: string;
  slug: { current: string };
  heroImageUrl: string;
  mainImage?: { asset: { _ref: string }; alt?: string };
  excerpt: string;
  publishedAt: string;
  categories: { _id: string; title: string }[];
  author: { name: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
}

export const DUMMY_POSTS: DummyPost[] = [
  {
    _id: '',
    title: '',
    slug: { current: '' },
    heroImageUrl: '',
    excerpt: '',
    publishedAt: '',
    categories: [{ _id: '', title: '' }],
    author: { name: '' },
    body: [
      {
        _type: '',
        style: '',
        _key: '',
        children: [
          {
            _type: '',
            _key: '',
            text: '',
          },
        ],
      },
    ],
  },
];

export const DUMMY_CATEGORIES = [
  { _id: 'cat-strategy', title: 'Strategy' },
  { _id: 'cat-thought', title: 'Thought Leadership' },
  { _id: 'cat-perf', title: 'Performance' },
  { _id: 'cat-web', title: 'Web & Platforms' },
  { _id: 'cat-ai', title: 'AI & Technology' },
];
