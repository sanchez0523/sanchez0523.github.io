import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    serial: z.number().int().positive(),
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    category: z.enum(['build-log', 'deep-dive', 'decision']),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };