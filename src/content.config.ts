import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: 'aaronmoreycom_content/content/posts/', pattern: '**/*.{md,mdx}' }), //  TODO AMM Extract aaronmoreycom_content path to a config file
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        tags: z.array(z.string()).nullable()
    }),
});

const etc = defineCollection({
    loader: glob({ base: 'aaronmoreycom_content/content/pages/etc/', pattern: '*.{md,mdx}' }), //  TODO AMM Extract aaronmoreycom_content path to a config file
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        // updatedDate: z.coerce.date().optional(),
        // tags: z.array(z.string()).nullable()
    }),
});

export const collections = { blog, etc };
