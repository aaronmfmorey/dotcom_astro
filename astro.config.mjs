// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
// CREDIT: https://caseyjamesperno.com/blog/astro-header-anchors/
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeTableScroll from './plugins/rehype-table-scroll.j
import mdx from '@astrojs/mdx';

import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: "https://aaronmorey.com",
  trailingSlash: 'ignore',
  compressHTML: false,

  redirects: {
  },

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
      rehypeTableScroll
    ],
  },

  vite: {
    resolve: {
        preserveSymlinks: true
    },
    // @ts-ignore
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap(),
    expressiveCode({
      defaultProps: {
        frame: 'terminal',
      },
      themes: ['catppuccin-mocha'],
      styleOverrides: {
        // You can also override styles
        borderRadius: '3px',
        codeFontSize: '0.75rem'
      },
    }),
    mdx()
  ],

  image: {
      layout: 'full-width',
  }
});