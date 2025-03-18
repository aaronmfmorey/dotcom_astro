import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    // Load Markdown and MDX files in the `src/content/blog/` directory.
    loader: glob({ base: '../aaronmoreycom_content/content/posts/', pattern: '**/*.{md,mdx}' }), //  TODO AMM Extract aaronmoreycom_content path to a config file
    // Type-check frontmatter using a schema
    schema: z.object({
        title: z.string(),
        // description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        // heroImage: z.string().optional(),
    }),
});

export const collections = { blog };
