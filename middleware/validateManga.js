const { body, validationResult, matchedData } = require("express-validator");
const { getAuthor, getAllGenres, getMangaByTitle, getManga } = require("../db/query");


const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 50 characters.";

const existingMangaTitleValidation = body("mangaid")
                                      .custom(async(mangaid) => {
                                        const mangaDetails = await getManga(mangaid);
                                        if (mangaDetails == {}) throw new Error ("Attempting to update Manga that does not exist.")
                                      });


const newMangaTitleValidation = body("title").trim()
                                  .isLength({ min: 1, max: 50 }).withMessage(`Manga title ${lengthErr}`)
                                  .custom(async(title) => {
                                      const mangaDetails = await getMangaByTitle(title);
                                      if (mangaDetails?.mangaid) throw new Error("This title already exists.");
                                  });

const validateManga = [
  
  body("author")
    .notEmpty()
    .withMessage("Author required. If not available, add new entry in Authors.")
    .custom(async(authorid) => {
        const author = await getAuthor(authorid);
        if( !author ) throw new Error("Selected Author does not exist")
    }),
  body("genre")
    .isArray({min:1}).withMessage('Select at least 1 genre. If not available, add new entry in Genres.')
    .custom(async(genres) => {
        const validGenreDetails = await getAllGenres();
        const validGenres = validGenreDetails.map( g => g.genreid);
        const invalid = genres.filter( g => !validGenres.includes(parseInt(g)));
        if (invalid.length > 0) throw new Error("At least 1 selected genre is invalid.");
    })

];

const validateNewManga = [...validateManga,newMangaTitleValidation];
const validateExistingManga = [...validateManga,existingMangaTitleValidation];


module.exports = {
  validateNewManga
  ,validateExistingManga
};