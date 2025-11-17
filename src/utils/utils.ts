import Database from 'better-sqlite3';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';

export async function renderMarkdown(markdownString:string ) {
    const processedContent = await remark().use(html).process(markdownString);
    return String(processedContent);
}

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
    // TODO AMM move this to env variable
    const dbPath = path.resolve('aaronmoreycom_content/content/data/goodreads.db');
    const db = new Database(dbPath, { readonly: true });

    const query = `
        select all_reads.*,
          ROW_NUMBER() OVER (PARTITION BY all_reads.book_id ORDER BY date_read ) as running_total
        from (
          select 
              g.book_id, 
              g.title, 
              g.author,
              g.original_publication_year, 
              g.isbn, 
              g.isbn13, 
              g.date_read,
              g.my_rating,
              g.my_review,
              gm.bookshop_slug,
              gm.no_bookshop
          from goodreads g
          left join goodreads_meta gm
            on g.book_id = gm.book_id
        
          UNION ALL
          
          select 
              rr.book_id, 
              g2.title, 
              g2.author,
              g2.original_publication_year,
              g2.isbn, 
              g2.isbn13, 
              rr.date_read,
              g2.my_rating,
              g2.my_review,
              gm2.bookshop_slug,
              gm2.no_bookshop
          from goodreads_reread as rr
          join goodreads as g2
            on g2.book_id = rr.book_id
          left join goodreads_meta gm2
            on g2.book_id = gm2.book_id
            and rr.book_id = g2.book_id
          ) as all_reads        
        order by all_reads.date_read desc;
    `;

    return db.prepare(query).all();
}