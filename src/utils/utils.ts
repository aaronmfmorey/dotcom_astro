import Database from 'better-sqlite3';
import path from 'path';

export const slugify = (text :string) => {
    if (!text) {
        return text;
    } else {
        return text.toLowerCase().replaceAll(/\s/g, "");
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

export const toTitleCase = function(str:string) {
    return str.replace(
        /[^_]+/g,
        text => " " + text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    ).replace("_", "");
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

export const getFontAwesomePathAsKey = function(iconName: string) {
    let nameParts = iconName.split(' ');
    let subDirectory = "";
    switch (nameParts[0]) {
        case 'fa-solid':
            subDirectory = "solid";
            break;
        case 'fa-brands':
            subDirectory = "brands";
            break;
        default:
            subDirectory = "regular";
            break;
    }

    return `/Font-Awesome/svgs/${subDirectory}/${nameParts[1]}.svg`;
};

export const getBooksFromSqlite = function() {
    const dbPath = path.resolve('aaronmoreycom_content/content/data/goodreads.db');
    const db = new Database(dbPath, { readonly: true });

    const query = `
        SELECT *
        FROM goodreads
        LEFT JOIN goodreads_meta ON goodreads_meta.book_id = goodreads.book_id
        ORDER BY date_read DESC;
    `;

    return db.prepare(query).all();
}