import { z, defineCollection } from 'astro:content';
import slugify from 'slugify';

/** Default fallback image for content entries */
const DEFAULT_FEATURED_IMAGE = '/images/default-featured.jpg';

/** Base schema for general content types */
const baseSchema = z.object({
  title: z.string().min(4),
  description: z.string().max(300).optional().default(''),
  summary: z.string().max(300).optional().default(''),
  pubdate: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(Date.parse(val)), {
      message: 'pubdate must be a valid ISO 8601 date string',
    }),
  slug: z.string().optional(),
  author: z.string().optional().default(''),
  tags: z.array(z.string()).optional().default([]),
  category: z.enum(['for space', 'from space', 'in space', 'e-commerce', 'SaaS', 'Healthcare']).optional(),
  url: z.string().url().optional().nullable(),
  notion_page_id: z.string().optional().default(''),
  exported_at: z.string().optional().default(''),
  featuredImage: z
    .string()
    .regex(/^(https?:\/\/|\/)/, { message: 'featuredImage must be a full URL or start with /' })
    .optional()
    .default(DEFAULT_FEATURED_IMAGE),
  seoTitle: z.string().max(70).optional().default(''),
  seoDescription: z.string().max(160).optional().default(''),
  featured: z.boolean().optional(),
  sustainableFocus: z
    .enum(['energy', 'emissions', 'materials', 'space-debris', 'education', 'policy'])
    .optional(),
  pledges: z.array(z.string()).optional().default([]),
  organisations: z.array(z.string()).optional().default([]),
  SDGs: z.array(z.number()).optional().default([]),
});

/** Case Studies schema (extends baseSchema) */
const caseStudySchema = baseSchema.extend({
  metrics: z.array(z.string()).optional().default([]),
});


/** Define all collections */
export const collections = {
  blog: defineCollection({ schema: baseSchema }),
  news: defineCollection({ schema: baseSchema }),
  resources: defineCollection({ schema: baseSchema }),
  "press-releases": defineCollection({ schema: baseSchema }),
  tools: defineCollection({ schema: baseSchema }),
  insights: defineCollection({ schema: baseSchema }),
  campaigns: defineCollection({ schema: baseSchema }),
  team: defineCollection({ schema: baseSchema }),
  training: defineCollection({ schema: baseSchema }),
  values: defineCollection({ schema: baseSchema }),
  organisations: defineCollection({ schema: baseSchema }),
};

/**
 * mkdir -p src/content/{...,service-areas}
 * Add _placeholder.md if needed to silence warnings.
 */