const { Router } = require("express");
const controller = require("../controllers/authorsController");
const authorsRouter = Router();

//to list all authors
authorsRouter.get("/", controller.authorsGet);

//to get form to create an author
authorsRouter.get("/form", controller.authorFormGet);

//to create an author
authorsRouter.post("/form", controller.authorCreatePost);

//to get form to update an author
authorsRouter.get("/:authorid/update", controller.authorFormGet);

//to update an author
authorsRouter.post("/:authorid/update", controller.authorUpdatePost);


//to delete an author
authorsRouter.post("/:authorid/delete", controller.authorDeletePost);

module.exports = authorsRouter; 