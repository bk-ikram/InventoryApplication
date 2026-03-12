const { Router } = require("express");
const controller = require("../controllers/mangasController");
const handleValidation = require("../middleware/handleValidation");
const normalizeManga = require("../middleware/normalizeManga");
const { validateNewManga, validateExistingManga } = require("../middleware/validateManga");
const db = require('../db/query');
const mangasRouter = Router();

//to list all mangas
mangasRouter.get("/", controller.mangasGet);

//to get form to update/create a manga
mangasRouter.get("/:mangaid/update", controller.mangasFormGet);

//to get form to update/create a manga
mangasRouter.get("/form", controller.mangasFormGet);

//to create a manga
mangasRouter.post("/form"
                    ,normalizeManga
                    ,validateNewManga
                    ,handleValidation("../views/mangas/form",async() => ({ 
                        manga: null,
                        authors: await db.getAllAuthors(),
                        genres: await db.getAllGenres()
 
                    }))
                    ,controller.mangasCreatePost);

//to get form to update a manga
mangasRouter.post("/:mangaid/update"
                    ,normalizeManga
                    ,validateExistingManga
                    ,handleValidation("../views/mangas/form",async() => ({ 
                        manga: req.parameters.mangaid,
                        authors: await db.getAllAuthors(),
                        genres: await db.getAllGenres()
 
                    })), controller.mangasUpdatePost);

//to update/create a manga
//mangasRouter.post("/form", controller.mangasFormPost); 

//to delete a manga
//mangasRouter.post("/delete", controller.mangasDeletePost);

module.exports = mangasRouter; 