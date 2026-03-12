const { client } = require('./connections.js');

const SQL = `
    DELETE FROM mangagenres;
    DELETE FROM manga;
    DELETE FROM genre;
    DELETE FROM author;


    -- 1. Populate Genres with fixed IDs
    INSERT INTO genre (genreID, genre) OVERRIDING SYSTEM VALUE VALUES 
    (1, 'Adventure'), (2, 'Steampunk'), (3, 'Psychological'), (4, 'Thriller'), 
    (5, 'Action'), (6, 'Comedy'), (7, 'Dark Fantasy'), (8, 'Epic'), 
    (9, 'Sports'), (10, 'Slice of Life'), (11, 'Historical'), (12, 'Drama'), 
    (13, 'Supernatural'), (14, 'Romance'), (15, 'Sci-Fi'), (16, 'Mystery'), 
    (17, 'Cyberpunk'), (18, 'Horror');

    -- 2. Populate Authors with fixed IDs
    INSERT INTO author (authorID, name) OVERRIDING SYSTEM VALUE VALUES 
    (1, 'Hiromu Arakawa'), (2, 'Naoki Urasawa'), (3, 'Tatsuya Endo'), 
    (4, 'Kentaro Miura'), (5, 'Muneyuki Kaneshiro'), (6, 'Kiyohiko Azuma'), 
    (7, 'Makoto Yukimura'), (8, 'Inio Asano'), (9, 'Tatsuatsu Ryū'), 
    (10, 'Takehiko Inoue'), (11, 'Katsuhiro Otomo'), (12, 'Haruichi Furudate'), 
    (13, 'Yuki Urushibara'), (14, 'Tatsuki Fujimoto');

    -- 3. Populate Manga with FK authorID
    INSERT INTO manga (mangaID, title, authorID) OVERRIDING SYSTEM VALUE VALUES 
    (1, 'Fullmetal Alchemist', 1),
    (2, 'Monster', 2),
    (3, 'Spy x Family', 3),
    (4, 'Berserk', 4),
    (5, 'Blue Lock', 5),
    (6, 'Yotsuba&!', 6),
    (7, 'Vinland Saga', 7),
    (8, 'Oyasumi Punpun', 8),
    (9, 'Dandadan', 9),
    (10, 'Pluto', 2), -- Same author as Monster
    (11, 'Slam Dunk', 10),
    (12, 'Akira', 11),
    (13, 'Haikyu!!', 12),
    (14, 'Mushishi', 13),
    (15, 'Chainsaw Man', 14);

    -- 4. Populate mangaGenres (Junction Table) with FK mangaID and FK genreID
    INSERT INTO mangaGenres (mangaID, genreID) VALUES 
    (1, 1), (1, 2),   -- Fullmetal: Adventure, Steampunk
    (2, 3), (2, 4),   -- Monster: Psych, Thriller
    (3, 5), (3, 6),   -- Spy x Family: Action, Comedy
    (4, 7), (4, 8),   -- Berserk: Dark Fantasy, Epic
    (5, 9), (5, 4),   -- Blue Lock: Sports, Thriller
    (6, 10), (6, 6),  -- Yotsuba: Slice of Life, Comedy
    (7, 11), (7, 1),  -- Vinland: Hist, Adventure
    (8, 3), (8, 12),  -- Punpun: Psych, Drama
    (9, 13), (9, 14), -- Dandadan: Super, Romance
    (10, 15), (10, 16),-- Pluto: Sci-Fi, Mystery
    (11, 9), (11, 6),  -- Slam Dunk: Sports, Comedy
    (12, 17), (12, 15),-- Akira: Cyberpunk, Sci-Fi
    (13, 9), (13, 12), -- Haikyu: Sports, Drama
    (14, 13), (14, 1), -- Mushishi: Super, Adventure
    (15, 5), (15, 18); -- Chainsaw: Action, Horror


    SELECT setval('manga_mangaid_seq', (SELECT MAX(mangaid) FROM manga));
    SELECT setval('author_authorid_seq', (SELECT MAX(authorid) FROM author));
    SELECT setval('genre_genreid_seq', (SELECT MAX(genreid) FROM genre));
    SELECT setval('mangagenres_id_seq', (SELECT MAX(id) FROM mangagenres));
`

async function main(){
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('The database tables have been initialized.');

}

main();

