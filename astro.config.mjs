// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: "https://aaronmorey.com",
    trailingSlash: 'ignore',
    vite: {
        resolve: {
            preserveSymlinks: true
        }
    }
});
