// Credit: https://www.paulie.dev/posts/2023/09/how-to-create-excerpts-with-astro/
export const createExcerpt = function(body :string, detailUrl :string) {
    const MAX_EXCERPT_LENGTH = 250;
    const readMoreTextIfNeeded = (body.length > MAX_EXCERPT_LENGTH) ? ` ... <a class="read-more" href='${detailUrl}'>[Read More]</a>` : "";
    return body
        .substring(0,MAX_EXCERPT_LENGTH)
        .split('\n')
        .flat()
        .join(' ')
        + readMoreTextIfNeeded;
};