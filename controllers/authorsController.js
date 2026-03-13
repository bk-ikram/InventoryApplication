const db = require('../db/query');

exports.authorsGet = async (req, res) => {
  const authors = await db.getAllAuthors();
  res.render("authors/authors", {
    title: "All Authors",
    authors: authors
  });
};

exports.authorFormGet = async (req, res) => {
  const authorID = req.params.authorid;
  const author = authorID ? await db.getAuthor(authorID) : null;
  const title = authorID ? "Update Author" : "Add a new Author";
  res.render("authors/form", {
    title: title,
    author: author
  });
};

exports.authorCreatePost = async (req, res) => {
  const name = req.body.author;
  const authorid = await db.CreateAuthor(name);
  res.redirect("/authors");
};

exports.authorUpdatePost = async (req, res) => {
  const authorID = req.params.authorid;
  const name = req.body.author;
  await db.UpdateAuthor(authorID,name);
  res.redirect("/authors");
};

exports.authorDeletePost = async (req, res) => {
  const authorID = req.params.authorid;
  await db.DeleteAuthor(authorID);
  res.redirect("/authors");
};