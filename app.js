/******** Global require *******/
require('./modules/dotenv-init')();
const express = require("express");
//const logger = require("./middlewares/logger-mw");
const app = express();

/********* Server Init *********/
require("./modules/server-init")(app, process.env.PORT);

/******* Middleware Init *******/
//app.use(logger);

/********* Views Init **********/
app.set("view engine", "ejs");
app.set("views", "./views");
app.locals.pretty = true;
app.locals.headTitle = "Express Twitter";

/***** req.body Middleware *****/
app.use(express.json());
app.use(express.urlencoded());

/********* Router Init *********/
const boardRouter = require("./routes/board-router");

app.use("/", express.static("./public"));
app.use("/board", boardRouter);

/********** Error Init *********/
const notFoundRouter = require("./routes/404-router");
const errorRouter = require("./routes/500-router");
app.use(notFoundRouter);
app.use(errorRouter);