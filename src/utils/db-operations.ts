import path from "path";
import Database from "better-sqlite3";

export const runSqliteQuery = function(queryText: string) {
    const dbPath = path.resolve('aaronmoreycom_content/content/data/goodreads.db');
    const db = new Database(dbPath);

    // Query to get total pages per year
    const sqlData = db.prepare(queryText).all();
    db.close();
    return sqlData;
}

export const QUERIES = {
    BOOKS_AND_PAGES_CHART_DATA: `
        select
            strftime('%Y', date_read) as year,
            sum(number_of_pages) as total_pages,
            count(*) as books_read
        from (
                 select
                     g.date_read,
                     g.number_of_pages
                 from goodreads g
                 where g.date_read is not null
                   and g.number_of_pages is not null
    
                 UNION ALL
    
                 select
                     rr.date_read,
                     g2.number_of_pages
                 from goodreads_reread as rr
                          join goodreads as g2
                               on g2.book_id = rr.book_id
                 where rr.date_read is not null
                   and g2.number_of_pages is not null
             ) as all_reads
        group by year
        order by year
    `,
    BOOKS_AND_PAGES_SUMMARY: `
        select 
            count(*) as total_books_read,
            sum(number_of_pages ) as total_pages_read
        from goodreads;
    `,
    BOOKS_FOR_READING_LIST: `
        select
            all_reads.*,
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
              g.number_of_pages,
              gm.*
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
              g2.number_of_pages,
              gm2.*
          from goodreads_reread as rr
          join goodreads as g2
            on g2.book_id = rr.book_id
          left join goodreads_meta gm2
            on g2.book_id = gm2.book_id
            and rr.book_id = g2.book_id
          ) as all_reads        
        order by all_reads.date_read desc;
    `
};