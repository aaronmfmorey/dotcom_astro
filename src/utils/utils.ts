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