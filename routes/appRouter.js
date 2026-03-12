const { Router } = require("express");
const appController = require("../controllers/appController");
const appRouter = Router();

appRouter.get("/", appController.appGet);


module.exports = appRouter;