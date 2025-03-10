import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
        return rss({
                title: 'Aaron Morey Dot Com',
                description: 'My Website', // TODO AMM move this to config and make it better
                site: context.site,
                items: await pagesGlobToRssItems(import.meta.glob('./posts/**/*.md')),
                customData: `<language>en-us</language>`,
        });
}