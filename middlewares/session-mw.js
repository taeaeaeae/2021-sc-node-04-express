const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { pool } = require("../modules/mysql-init");

const expressSession = session({
  secret: process.env.SESSION_SALT,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.SESSION_SECURE == true, httpOnly: true },
  store: new MySQLStore({ expiration: 1000 * 60 * 60 * 2 }, pool),
});

module.exports = (app) => {
  app.set("trust proxy", 1);
  return expressSession;
};