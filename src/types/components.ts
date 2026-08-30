export type ColorMode = 'light' | 'dark';

export interface DividerProps {
    dividerWidth: string,
    colorMode: ColorMode;
}

export interface GoodreadsBook {
    book_id: number,
    title: string,
    author: string,
    original_publication_year: number,
    isbn: string, // Can we put more validation on this?
    isbn13: string,
    date_read: string, // Format: '2026-08-29 00:00:00'
    my_rating: number,
    my_review: string,
    number_of_pages: number,
    id: number,
    bookshop_slug: string,
    no_bookshop: boolean,
    running_total: number
}

export type BookEntryYearlyTotals = Record<'count'|'pages', number>