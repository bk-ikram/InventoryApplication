const db = require('../db/query');

exports.genresGet = async (req, res) => {
  const genres = await db.getAllGenres();
  res.render("genres/genres", {
    title: "All Genres",
    genres: genres
  });
};

exports.genreFormGet = async (req, res) => {
  const genreID = req.params.genreid;
  const genre = genreID ? await db.getGenre(genreID) : null;
  const title = genreID ? "Update Genre" : "Add a new Genre";
  res.render("genres/form", {
    title: title,
    genre: genre
  });
};

exports.genreCreatePost = async (req, res) => {

  const genre = req.body.genre;
  await db.CreateGenre(genre);
  res.redirect("/genres");
};

exports.genreUpdatePost = async (req, res) => {
  const genreID = req.params.genreid;
  const genre = req.body.genre;
  await db.UpdateGenre(genreID,genre);
  res.redirect("/genres");
};

exports.genreDeletePost = async (req, res) => {
  const genreID = req.params.genreid;
  await db.DeleteGenre(genreID);
  res.redirect("/genres");
};