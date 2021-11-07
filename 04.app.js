/******** Global require *******/
const express = require("express");
const app = express();

/********* Server Init *********/
require("./modules/server-init")(app, 3000);

/********* Views Init **********/
app.set("view engine", "pug");
app.set("views", "./views-pug");
app.locals.pretty = true;
app.locals.headTitle = "Express Twitter";

/********* Router Init *********/
const postRouter = require("./routes/post-router");
const userRouter = require("./routes/user-router");

app.use("/", express.static("./public"));
app.use("/post", postRouter);
app.use("/user", userRouter);