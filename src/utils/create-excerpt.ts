// Credit: https://www.paulie.dev/posts/2023/09/how-to-create-excerpts-with-astro/
export const createExcerpt = function(body :string, detailUrl :string, includeReadMore :boolean = true) {
    const MAX_EXCERPT_LENGTH = 250;
    const readMoreTextIfNeeded = (body.length > MAX_EXCERPT_LENGTH) && includeReadMore ? `<br /><a class="read-more" href='${detailUrl}'>[Read More]</a>` : "";
    let text = body
        .replace("</p>", "%%LINEBREAK%%")
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '') // Remove styles
        .replace(/<[^>]+>/g, '') // Remove all HTML tags
        .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
        .replace(/&[a-z]+;/gi, ' ') // Replace other HTML entities with space
        .replace("%%LINEBREAK%%", "<br/><br/>")
        .trim()
        .replace(/\s+/g, ' '); // Normalize whitespace

    if (text.length <= MAX_EXCERPT_LENGTH) {
        return text;
    }

    const truncated = text.substring(0, MAX_EXCERPT_LENGTH);
    const lastSpace = truncated.lastIndexOf(' ');
    const cutPoint = lastSpace > 0 ? lastSpace : MAX_EXCERPT_LENGTH;

    return text.substring(0, cutPoint) + "..." + readMoreTextIfNeeded;
};