const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { pool } = require("../modules/mysql-init");
const joinValidator = require("../middlewares/joinValidator");
const loginValidator = require("../middlewares/loginValidator");
const { alert } = require("../modules/util");
const { isUser, isGuest } = require("../middlewares/auth-mw");

// 로그인 창 보여주기
router.get("/login", isGuest, (req, res, next) => {
  res.render("auth/login");
});

// 로그인 처리
router.post("/login", isGuest, loginValidator, async (req, res, next) => {
  try {
    let { userid, userpw } = req.body;
    let { BCRYPT_SALT: salt, BCRYPT_ROUND: round } = process.env;
    let sql = "SELECT * FROM user WHERE userid=?";
    let [rs] = await pool.execute(sql, [userid]);
    if (rs.length && rs[0].userpw) {
      let compare = await bcrypt.compare(userpw + salt, rs[0].userpw);
      if (compare) {
        req.session.user = {
          id: rs[0].id,
          userid: rs[0].userid,
          username: rs[0].username,
          email: rs[0].email,
        };
        res.send(alert("로그인 되었습니다."));
      } else res.send(alert("아이디와 패스워드를 확인하세요", "/auth/login"));
    }
  } catch (err) {
    next(createError(err));
  }
});

// 로그아웃 처리
router.get("/logout", isUser, (req, res, next) => {
  req.session.destroy(() => {
    res.send(alert("로그아웃 되었습니다.", "/"));
  });
});

// 회원가입창 보여주기
router.get("/join", isGuest, (req, res, next) => {
  res.render("auth/join");
});

// 회원가입 처리
router.post("/join", isGuest, joinValidator, async (req, res, next) => {
  try {
    let { userid, userpw, username, email } = req.body;
    let sql = "INSERT INTO user SET userid=?, userpw=?, username=?, email=?";
    let values = [userid, userpw, username, email];
    let rs = await pool.execute(sql, values);
    res.redirect("/");
  } catch (err) {
    next(createError(err));
  }
});

// 회원수정창 보여주기
router.get("/join/:id", isUser, (req, res, next) => {
  res.send("<h1>JOIN FROM</h1>");
});

// 회원수정 처리
router.put("/join", isUser, (req, res, next) => {
  res.send("수정");
});

module.exports = router;