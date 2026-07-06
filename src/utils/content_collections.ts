import {toTitleCase} from "@utils/utils.ts";

export const processSubheadLevels = function(posts:Array<object>) {
    posts.forEach(function(post:any) {
        const urlLevels = post.id.split('/')
        if (urlLevels.length > 1) {
            post.indexHeading = toTitleCase(urlLevels[0]);
        } else {
            post.indexHeading = null;
        }
    });
};

/**
 * Sort posts by:
 * 1) First, posts without a sub-category
 * 2) Posts by subcategory
 * 3) Date within sub-categories
 */
export const sortPostsBySubheadAndDate = function (posts:Array<object>): Array<object> {
    posts.sort(function(a:any, b:any):number {
        // TODO AMM create a schema for post object with indexHeading
        if (!a.indexHeading && b.indexHeading) {
            return -1;
        } else if (a.indexHeading && !b.indexHeading) {
            return 1;
        } else if (a.indexHeading != b.indexHeading) {
            return a.indexHeading > b.indexHeading ? 1 : -1;
        } else {
            return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
        }
    });
    return posts;
}

export const assignPostsToSubheadBucket = function(posts:Array<object>): object {
    let postsBySubject = new Map();
    for (let i = 0; i < posts.length; i++) {
        let p = posts[i];
        let subject = p.indexHeading;
        if (!postsBySubject.has(subject)) {
            postsBySubject.set(subject, []);
        }
        let subjectArray = postsBySubject.get(subject);
        subjectArray.push(p);
        postsBySubject.set(subject, subjectArray);
    }
    return postsBySubject;
};

export interface ContentCollectionProps {
    collection: string;
    pageTitle: string;
    introText: string;
    includeEntriesHeader: boolean;
}