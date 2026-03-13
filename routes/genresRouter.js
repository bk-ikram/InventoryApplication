const { Router } = require("express");
const controller = require("../controllers/genresController");
const genresRouter = Router();

//to list all genres
genresRouter.get("/", controller.genresGet);


//to get form to create a genre
genresRouter.get("/form", controller.genreFormGet);

//to create a genre
//Need to add validation to avoid duplicate genres
genresRouter.post("/form", controller.genreCreatePost);

//to get form to update a genre
genresRouter.get("/:genreid/update", controller.genreFormGet);

//to update a genre
genresRouter.post("/:genreid/update", controller.genreUpdatePost);

//to delete a genre
genresRouter.post("/:genreid/delete", controller.genreDeletePost);

module.exports = genresRouter; 