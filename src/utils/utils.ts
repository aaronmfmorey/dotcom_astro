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

export const humanReadableDate = function(value: string) {
    const ts = Date.parse(value);
    if (isNaN(ts)) {
        return value;
    } else {
        return (
            new Intl.DateTimeFormat(
                "en-US",
                {year: "numeric", month: "long", day: "numeric",}
            )
        ).format(ts);
    }
};

export const bookshopAffiliateUrl = function(isbn13: string): string {
     // TODO AMM Add tooltips?
    if (isbn13 && isbn13 !== "") {
        return `<span>
                    <a data-tooltip-target="bookshop-tooltip" target='_blank' class='bookshop-affiliate-link' href='https://bookshop.org/a/110804/${isbn13}'>
                        <i class="fa-solid fa-book"></i>
                    </a>
                </span>`;
    } else {
        return "";
    }
};