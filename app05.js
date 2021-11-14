/******** Global require *******/
const express = require("express");
const app = express();

/********* Server Init *********/
require("./modules/server-init")(app, 3000);

/********* Views Init **********/
app.set("view engine", "ejs");
app.set("views", "./views-ejs");
app.locals.pretty = true;
app.locals.headTitle = "Express Twitter";

/********* Router Init *********/
const commentRouter = require("./routes/comment-router");

app.use("/", express.static("./public"));
app.use("/comment", commentRouter);