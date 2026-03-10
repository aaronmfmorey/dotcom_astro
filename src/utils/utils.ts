import {remark} from 'remark';
import html from 'remark-html';
import {exec} from 'node:child_process';
import {promisify} from "node:util";

const execAsync = promisify(exec);

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

export const intToOrdinal = function(i: number): string {
    const rules = new Intl.PluralRules('en', { type: 'ordinal' });
    const suffixes = { one: 'st', two: 'nd', few: 'rd', other: 'th' };
    return i + suffixes[rules.select(i)];
};

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

export const getFileCount = async function(
    path: string,
    fileExtension: string
): Promise<number> {
    const numPostResult =
        await execAsync(`find ${path} -iname "${fileExtension}" | wc -l`);
    return parseInt(numPostResult.stdout.trim());
};

export const getFileWordCount = async function(
    path: string,
    fileExtension: string
): Promise<number> {
    let wordsResult = await execAsync(
        `find ${path} -type f -iname "${fileExtension}" -exec cat {} \\; | wc -w`);
    let trimmedCount =wordsResult.stdout.trim();
    return parseInt(trimmedCount);
};

export const getFileLineCount = async function(
    path: string,
    fileExtension: string
): Promise<number> {
    let wordsResult = await execAsync(
        `find ${path} -type f -iname "${fileExtension}" -exec cat {} \\; | wc -l`);
    let trimmedCount = wordsResult.stdout.trim();
    return parseInt(trimmedCount);
}