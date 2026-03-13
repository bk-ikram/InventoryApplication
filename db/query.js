 const { pool } = require('./connections.js');


const SearchMangasBaseSQL = `
SELECT m.mangaid
      ,m.title
      ,a.name as author
      ,m.authorid
      ,ARRAY_AGG(g.genre) as genres
FROM manga m
LEFT JOIN author a
ON a.authorid = m.authorid
LEFT JOIN mangagenres mg
ON mg.mangaid = m.mangaid
LEFT JOIN genre g
ON g.genreid = mg.genreid
`;


const mangaSQL = `
SELECT m.mangaid
      ,m.title
      ,m.authorid
      ,ARRAY_AGG(mg.genreid) as genres
FROM manga m
LEFT JOIN mangagenres mg
ON mg.mangaid = m.mangaid
WHERE m.mangaid = $1
group by m.mangaid,m.title,m.authorid;
`;

const mangaByTitleSQL = `
SELECT mangaid
      ,title
      ,authorid
FROM manga
WHERE title = $1;
`;

const authorSQL = `
SELECT authorid
      ,name
FROM author
WHERE authorid = $1;
`;

const getGenreSQL = `
SELECT genreid
      ,genre
FROM genre
WHERE genreid = $1;
`;

const AllAuthorsSQL = `
SELECT authorid
      ,name
FROM author;
`;

const AllGenresSQL = `
SELECT genreid
      ,genre
FROM genre;
`;


const CreateMangaSQL = `
INSERT INTO manga (title, authorID)
VALUES ($1,$2)
RETURNING mangaid;
`

const CreateGenreSQL = `
INSERT INTO genre (genre)
VALUES ($1)
RETURNING genreid;
`

const CreateAuthorSQL = `
INSERT INTO author(name)
VALUES ($1)
RETURNING authorid;
`

const CreateMangaGenreSQL = `
INSERT INTO mangagenres (mangaID, genreID)
VALUES ($1,$2);
`

const UpdateMangaTitleSQL = `
UPDATE manga
SET title = $2
WHERE mangaid = $1;
`

const UpdateMangaAuthorSQL = `
UPDATE manga
SET authorid = $2
WHERE mangaid = $1;
`

const UpdateGenreSQL = `
UPDATE genre
SET genre = $2
WHERE genreid = $1;
`

const UpdateAuthorSQL = `
UPDATE author
SET name = $2
WHERE authorid = $1;
`

const DeleteMangaGenresSQL = `
DELETE FROM mangagenres
WHERE mangaid = $1;
`

const DeleteMangaSQL = `
DELETE FROM manga
WHERE mangaid = $1;
`

const DeleteGenreSQL = `
DELETE FROM genre
WHERE genreid = $1;
`

const DeleteAuthorSQL = `
DELETE FROM author
WHERE authorid = $1;
`


async function getManga(mangaid){
    const mangas = await pool.query(mangaSQL,[mangaid]);
    return mangas.rows[0];
 };

 async function getGenre(genreid){
    const mangas = await pool.query(getGenreSQL,[genreid]);
    return mangas.rows[0];
 };

async function getMangaByTitle(title){
    const manga = await pool.query(mangaByTitleSQL,[title]);
    return manga.rows[0];
 };

 async function getAuthor(authorid){
    const author = await pool.query(authorSQL,[authorid]);
    return author.rows[0];
 };

 async function getAllAuthors(){
    const authors = await pool.query(AllAuthorsSQL);
    return authors.rows;
 };

 async function getAllGenres(){
    const genres = await pool.query(AllGenresSQL);
    return genres.rows;
 };

 async function CreateManga(title,authorid){
      const result = await pool.query(CreateMangaSQL,[title,authorid]);
      const mangaid = result.rows[0].mangaid;
      return mangaid;
 }

async function CreateGenre(genre){
      const result = await pool.query(CreateGenreSQL,[genre]);
      const genreid = result.rows[0].genreid;
      return genreid;
 }

async function CreateMangaGenre(mangaid,genres){
      await genres.forEach( g => {
            pool.query(CreateMangaGenreSQL,[mangaid,g]);
      });
 }

 async function CreateAuthor(name){
      const result = await pool.query(CreateAuthorSQL,[name]);
      const authorid = result.rows[0].authorid;
      return authorid;
 }


async function UpdateManga(mangaid,title,authorid,genres){
      await pool.query(UpdateMangaTitleSQL,[mangaid,title]);
      await pool.query(UpdateMangaAuthorSQL,[mangaid,authorid]);
      //to update the genres, first delete existing ones, then insert
      await pool.query(DeleteMangaGenresSQL,[mangaid])
      await CreateMangaGenre(mangaid,genres);
 }

 async function UpdateGenre(genreid,genre){
      await pool.query(UpdateGenreSQL,[genreid,genre]);
 }

  async function UpdateAuthor(authorid,author){
      await pool.query(UpdateAuthorSQL,[authorid,author]);
 }

async function DeleteManga(mangaid){
      await pool.query(DeleteMangaSQL,[mangaid])
 }

 async function DeleteGenre(genreid){
      await pool.query(DeleteGenreSQL,[genreid])
 }

  async function DeleteAuthor(authorid){
      await pool.query(DeleteAuthorSQL,[authorid])
 }


 async function SearchMangas(genreid, authorid) {

    const params = [];
    let where = '';
    let having = '';

    if (authorid) {
        params.push(authorid);
        where = `WHERE m.authorid = $${params.length}`;
    }

    if (genreid) {
        params.push(genreid);
        having = `HAVING $${params.length} = ANY(ARRAY_AGG(g.genreid))`;
    }

    const query = `${SearchMangasBaseSQL} ${where} GROUP BY m.mangaid, m.title, a.name, m.authorid ${having};`;
    const result = await pool.query(query, params);
    return result.rows;
}

 module.exports ={
     getManga
    ,getAuthor
    ,getGenre
    ,getAllAuthors
    ,getAllGenres
    ,CreateManga
    ,CreateGenre
    ,CreateAuthor
    ,CreateMangaGenre
    ,getMangaByTitle
    ,UpdateManga
    ,UpdateGenre
    ,UpdateAuthor
    ,DeleteManga
    ,DeleteGenre
    ,DeleteAuthor
    ,SearchMangas
 }
 

