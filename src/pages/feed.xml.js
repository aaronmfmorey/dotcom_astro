import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
    let blog = await getCollection('blog');
    // TODO AMM - put date sort into a util function
    blog.sort((a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime());
    blog = blog.slice(0,19);
    return rss({
        // TODO AMM put this into a config?
        title: 'Aaron Morey Dot Com',
        description: 'Posts on AaronMorey.com', // TODO AMM move this to config and make it better
        site: context.site,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            link: `/blog/${post.id}/`,
        })),
        customData: `<language>en-us</language>`,
    });
}