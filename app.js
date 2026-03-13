const express = require('express');
const app = express();
require('dotenv').config();
const path = require("node:path");
const appRouter = require("./routes/appRouter");
const mangasRouter = require("./routes/mangasRouter");
//const authorsRouter = require("./routes/authorsRouter");
const genresRouter = require("./routes/genresRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use(express.urlencoded({ extended: true }));


app.use("/", appRouter);
app.use("/mangas", mangasRouter);
//app.use("/authors", authorsRouter);
app.use("/genres", genresRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT,(error)=>{
    if(error)
        throw error;
    console.log(`App is listening at port ${PORT}`);
});