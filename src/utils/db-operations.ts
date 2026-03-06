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
    `
}