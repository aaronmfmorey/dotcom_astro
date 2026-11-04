import { glob, file } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import {z} from 'zod';
const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: 'aaronmoreycom_content/content/posts/', pattern: '**/*.{md,mdx}' }), //  TODO AMM Extract aaronmoreycom_content path to a config file
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).nullable(),
        description: z.string().optional(),
    }),
});

const etc = defineCollection({
    loader: glob({ base: 'aaronmoreycom_content/content/pages/etc/', pattern: '**/*.{md,mdx}' }), //  TODO AMM Extract aaronmoreycom_content path to a config file
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        showWordCount: z.boolean().optional(),
    }),
});

const code = defineCollection({
    loader: glob({ base: 'aaronmoreycom_content/content/pages/code/', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        showWordCount: z.boolean().optional(),
    }),
});

const micros = defineCollection({
    loader: glob({ base: 'aaronmoreycom_content/content/micros/', pattern: '**/*.{md,mdx}' }),
    schema: z.object({
        id: z.number(),
        pubDate: z.coerce.date()
    })
});

export const collections = { blog, etc, micros, code };
