// Credit: https://www.paulie.dev/posts/2023/09/how-to-create-excerpts-with-astro/
export const createExcerpt = (body :string) => {
  return body
    .substring(0,250)
    .split('\n')
    .map((str :string) => {
      return str.replace(/<\/?[^>]+(>|$)/g, '').split('\n');
    })
    .flat()
    .join(' ');
};