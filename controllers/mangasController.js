const db = require('../db/query');
const resetData = require("../db/initDBData");

exports.mangasGet = async (req, res) => {
  const genreid = req.query.genreid;
  const authorid = req.query.authorid;
  const mangas = await db.SearchMangas(genreid,authorid);
  const title = authorid || genreid
                ? 'Manga Results'
                : 'All Mangas'
  res.render("mangas/mangas", {
    title: title,
    mangas: mangas
  });
};

exports.mangasFormGet = async (req, res) => {
  const mangaId = req.params.mangaid;
  const manga = mangaId ? await db.getManga(mangaId) : null;
  const title = mangaId ? "Update Manga Details" : "Add a new Manga";
  const authors = await db.getAllAuthors();
  const genres = await db.getAllGenres();
  res.render("mangas/form", {
    title: title,
    manga: manga,
    genres: genres,
    authors: authors
  });
};


exports.mangasCreatePost = async (req, res) => {

  const { title, author, genre} = req.body;
  const mangaid = await db.CreateManga(title,author);
  await db.CreateMangaGenre(mangaid,genre);
  res.redirect("/mangas");
};

exports.mangasUpdatePost = async (req, res) => {
  const { mangaid,title,author,genre } = req.body;
  await db.UpdateManga(mangaid,title,author,genre);
  res.redirect("/mangas");
};

exports.mangaDeletePost = async (req, res) => {
  const mangaid = req.params.mangaid;
  await db.DeleteManga(mangaid);
  res.redirect("/mangas");
};

exports.mangaResetPost = async (req, res) => {
  await resetData();
  res.redirect("/mangas");
};
