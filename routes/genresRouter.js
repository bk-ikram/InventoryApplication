const { Router } = require("express");
const controller = require("../controllers/genresController");
const genresRouter = Router();

//to list all genres
genresRouter.get("/", controller.genresGet);

//to get form to update/create a manga
genresRouter.get("/", controller.genresFormGet);

//to update/create a manga
genresRouter.get("/", controller.genresFormPost);

//to delete a manga
genresRouter.get("/", controller.genresDeletePost);

module.exports = genresRouter; 