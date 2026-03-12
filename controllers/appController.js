exports.appGet = (req, res) => {
  res.render("index", {
    title: "The Manga Library",
  });
};