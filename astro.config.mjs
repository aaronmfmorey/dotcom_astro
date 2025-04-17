// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
// CREDIT: https://caseyjamesperno.com/blog/astro-header-anchors/
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: "https://aaronmorey.com",
  trailingSlash: 'ignore',

  markdown: {
    rehypePlugins: [
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          content: {
            type: 'text',
            value: '§',
          },
          headingProperties: {
            className: ['anchor'],
          },
          properties: {
            className: ['anchor-link'],
          },
        },
      ],
    ],
  },

  vite: {
    resolve: {
        preserveSymlinks: true
    },

    plugins: [tailwindcss()]
  },

  integrations: [sitemap(), mdx()]
});