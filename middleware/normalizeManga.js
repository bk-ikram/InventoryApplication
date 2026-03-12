function normalizeManga(req, res, next){
    //normalize the genres data, ensuring it is in an array, that the entries are numbers
    // , (esp in case one or no options selected)
    req.body.genre = [req.body.genre].flat().filter(Boolean).map(Number).filter(n => !isNaN(n));
    //ensure that authorId is an integer
    req.body.author = parseInt(req.body.author);
    //attach mangaid from the params into the body
    req.body.mangaid = parseInt(req.params.mangaid);
    next(); //pass control to the next middleware
}

module.exports = normalizeManga;