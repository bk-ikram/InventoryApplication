const { Router } = require("express");
const controller = require("../controllers/authorsController");
const authorsRouter = Router();

//to list all authors
authorsRouter.get("/", controller.authorsGet);

//to get form to update/create a manga
authorsRouter.get("/", controller.authorsFormGet);

//to update/create a manga
authorsRouter.get("/", controller.authorsFormPost);

//to delete a manga
authorsRouter.get("/", controller.authorsDeletePost);

module.exports = authorsRouter; 