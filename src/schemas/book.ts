import { z } from 'zod';

// Zod schema for runtime validation
export const bookSchema = z.object({
    book_id: z.string(),
    title: z.string(),
    author: z.string(),
    original_publication_year: z.number().int().positive(),
    isbn: z.string(),
    isbn13: z.string(),
    date_read: z.string().date().optional(),
    my_rating: z.number().min(1).max(5).optional(),
    my_review: z.string().optional(),
    bookshop_slug: z.string(),
    no_bookshop: z.boolean().optional(),
});