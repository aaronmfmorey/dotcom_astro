// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
// CREDIT: https://caseyjamesperno.com/blog/astro-header-anchors/
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeTableScroll from './plugins/rehype-table-scroll.js';
import mdx from '@astrojs/mdx';
import {customImage} from "./plugins/custom-image.mjs";
import expressiveCode from 'astro-expressive-code';

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
      rehypeTableScroll,
    ],
    remarkPlugins: [
        customImage
    ]
  },

  vite: {
    resolve: {
        preserveSymlinks: true
    },
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap(),
    expressiveCode({
      themes: ['solarized-dark'],
      styleOverrides: {
        // You can also override styles
        borderRadius: '3px',
        codeFontSize: '0.75rem',
      },
    }),
    mdx()
  ]
});