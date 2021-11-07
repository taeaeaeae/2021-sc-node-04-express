/************ Global reqire ******/
const express =require("express");
const app = express();

/***************Server Init ********/
require("./modules/server-init")(app, 3000);

/*************** Views Init ***********/
app.set("view engine", "pug");
app.set("views","./views-pug");

/*********** Router Init **********/
const postRouter = require("./routes/post-router");

app.use("/", express.static("./public"));
app.use("/post", postRouter);