 const { pool } = require('./connections.js');

const AllMangasSQL = `
SELECT m.mangaid
      ,m.title
      ,a.name as author
      ,ARRAY_AGG(g.genre) as genres
FROM manga m
LEFT JOIN author a
ON a.authorid = m.authorid
LEFT JOIN mangagenres mg
ON mg.mangaid = m.mangaid
LEFT JOIN genre g
ON g.genreid = mg.genreid
group by m.mangaid,m.title,a.name;
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

const DeleteMangaGenresSQL = `
DELETE FROM mangagenres
WHERE mangaid = $1;
`

const DeleteMangaSQL = `
DELETE FROM manga
WHERE mangaid = $1;
`

async function getAllMangas(){
    const mangas = await pool.query(AllMangasSQL);
    return mangas.rows;
 };

async function getManga(mangaid){
    const mangas = await pool.query(mangaSQL,[mangaid]);
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

async function CreateMangaGenre(mangaid,genres){
      await genres.forEach( g => {
            pool.query(CreateMangaGenreSQL,[mangaid,g]);
      });
 }

async function UpdateManga(mangaid,title,authorid,genres){
      await pool.query(UpdateMangaTitleSQL,[mangaid,title]);
      await pool.query(UpdateMangaAuthorSQL,[mangaid,authorid]);
      //to update the genres, first delete existing ones, then insert
      await pool.query(DeleteMangaGenresSQL,[mangaid])
      await CreateMangaGenre(mangaid,genres);
 }

async function DeleteManga(mangaid){
      await pool.query(DeleteMangaSQL,[mangaid])
 }

 module.exports ={
    getAllMangas
    ,getManga
    ,getAuthor
    ,getAllAuthors
    ,getAllGenres
    ,CreateManga
    ,CreateMangaGenre
    ,getMangaByTitle
    ,UpdateManga
    ,DeleteManga
 }
 

