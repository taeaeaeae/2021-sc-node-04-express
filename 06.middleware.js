/******** Global require *******/
const express = require("express");
const createError = require("http-errors");
const text = require('./middlewares/test-mw')
const text2 = require('./middlewares/test2-mw')
const text3 = require('./middlewares/test3-mw')
const app = express();

/********* Server Init *********/
require("./modules/server-init")(app, 3000);

/********* Views Init **********/
app.set("view engine", "ejs");
app.set("views", "./views");
app.locals.pretty = true;
app.locals.headTitle = "Express Twitter";

/********* MiddelWare Init *********/ //거쳐서 오는거
app.use(test("booldook"));

/********* Router Init *********/
app.use("/", express.static("./public"));
app.get("/board", (req, res, next) => {
    try {
        res.send(req.user.name + "HERE");
    } catch (err) {
      next(createError(500, '서버에러입니다.'));
    }
});

/********** Error Init *********/
const notFoundRouter = require("./routes/404-router");
const errorRouter = require("./routes/500-router");
app.use(notFoundRouter);
app.use(errorRouter);