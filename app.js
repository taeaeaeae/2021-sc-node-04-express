/******** Global require *******/
require("./modules/dotenv-init")();
const express = require("express");
// const logger = require("./middlewares/logger-mw");
const method = require("./middlewares/method-mw");
const session = require("./middlewares/session-mw");
const app = express();


/********* Server Init *********/
require("./modules/server-init")(app, process.env.PORT);

/******* Middleware Init *******/
// app.use(logger);

/********* Views Init **********/
app.set("view engine", "ejs");
app.set("views", "./views");
app.locals.pretty = true;
app.locals.headTitle = "Express Twitter";

/***** session Middleware *****/
app.use(session(app));


/***** req.body Middleware *****/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(method);


/********* Static Init *********/
app.use("/", express.static("./public"));
app.use("/uploads", express.static("./storages"));

/********* Router Init *********/
const apiRouter = require("./routes/api-router");
const boardRouter = require("./routes/board-router");
const authRouter = require("./routes/auth-router");

app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use("/board", boardRouter);

/********** Error Init *********/
const notFoundRouter = require("./routes/404-router");
const errorRouter = require("./routes/500-router");
app.use(notFoundRouter);
app.use(errorRouter);