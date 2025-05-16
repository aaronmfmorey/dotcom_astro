import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { createExcerpt } from '@utils/create-excerpt.ts';

export async function GET(context) {
    let blog = await getCollection('blog');
    let micros = await getCollection('micros');
    let rssContent = blog.concat(micros);
    // TODO AMM - put date sort into a util function
    rssContent.sort(function (a, b) {
        const aDate = a.data.pubDate ? new Date(a.data.pubDate) : new Date(a.data.date);
        const bDate = b.data.pubDate ? new Date(b.data.pubDate) : new Date(b.data.date);

        return bDate.getTime() - aDate.getTime()
    });
    rssContent = rssContent.slice(0,19);

    return rss({
        // TODO AMM put this into a config?
        title: 'Aaron Morey Dot Com',
        description: 'Posts on AaronMorey.com', // TODO AMM move this to config and make it better
        site: context.site,
        items: rssContent.map(function (post) {
           return ({
                title: post.data.title ?? "New Micropost",
                pubDate: post.data.pubDate ?? post.data.date,
                link: post.data.pubDate ? `/posts/${post.id}/` : `/micros/${post.id}`,
                description: createExcerpt(post.rendered?.html ?? post.body ?? "", "", false),
            })
        }),
        customData: `<language>en-us</language>`,
    });
}