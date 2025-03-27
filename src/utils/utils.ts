export const slugify = (text :string) => {
    if (!text) {
        return text;
    } else {
        return text.toLowerCase().replaceAll(/\s/g, "-");
    }
};

export const formatDateLong = function(date: Date): String {
    const dateOptions: object = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", dateOptions);
}

export const getAllTagsForAuthorMatch = function(allPosts: Array<any>): Array<string> {
    let allTags = allPosts.map((post) => post.data.tags).flat();
    return [... new Set(allTags)].filter(tag => tag !== null)
        .map((tag :string) => tag.toLowerCase().replaceAll(" ", ""));
}