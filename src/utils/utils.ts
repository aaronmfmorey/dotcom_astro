export const slugify = (text :string) => {
    if (!text) {
        return text;
    } else {
        return text.toLowerCase().replaceAll(/\s/g, "-");
    }
};