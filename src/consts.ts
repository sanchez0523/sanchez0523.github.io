export const SITE = {
  title: 'sj()',
  description: 'Building self-hosted tools in public — IoT, Go, and the craft of shipping.',
  author: 'Sanchez Jang',
  authorShort: 'sj',
  location: 'seoul',
  url: 'https://sanchez0523.github.io',
  tagline: 'build small. ship slow.',
  email: 'anjdi1004@gmail.com',
  github: 'https://github.com/sanchez0523',
  nexosRepo: 'https://github.com/sanchez0523/nexos',
} as const;

export const NAV = [
  { href: '/', label: 'home' },
  { href: '/posts', label: 'posts' },
  { href: '/now', label: 'now' },
  { href: '/projects', label: 'projects' },
] as const;

export const CATEGORIES = {
  'build-log': { label: 'build-log', description: '현장 기록' },
  'deep-dive': { label: 'deep-dive', description: '깊게 파기' },
  decision: { label: 'decision', description: '결정과 이유' },
} as const;

export type Category = keyof typeof CATEGORIES;