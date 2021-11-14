/* 
Semantic 
[GET]     /board                   - 전체게시글
[GET]     /board?page=1(page)      - 1P 게시글
[GET]     /board?type=create       - 글 신규 form
[GET]     /board/1(id)             - 글 상세
[GET]     /board/1?type=update     - 글 수정 form
[POST]    /board                   - 신규글 저장
[PUT]     /board                   - 수정글 저장
[DELETE]  /board/1                 - 글 삭제

-- 권장하지 않는 사항 --
/boards/lists
/board/create(x)
/board/update(x)
/board/delete(x)
*/

const express = require("express");
const createError = require("http-errors");
const { pool } = require("../modules/mysql-init.js");
const moment = require("moment");
const router = express.Router();

// list
router.get("/", async (req, res, next) => {
  try {
    const { page = 1, type } = req.query;
    if (type === "create") next();
    else {
      let sql = "SELECT * FROM board ORDER BY id DESC";
      const [lists] = await pool.execute(sql);
      lists.forEach((v) => (v.wdate = moment(v.createdAt).format("YYYY-MM-DD")));
      res.json(process.env);
      // res.render("board/list", {lists});
    }
  } catch (err) {
    next(createError(err));
  }
});

// create
router.get("/", async (req, res, next) => {
  try {
    res.render("board/form.ejs");
  } catch (err) {
    next(createError(err));
  }
});

// save
router.post("/", async (req, res, next) => {
  try {
    const { title, writer, content } = req.body;
    let sql = "INSERT INTO board SET title=?, writer=?, content=?";
    const [rs] = await pool.execute(sql, [title, writer, content]);
    res.json(rs);
  } catch (err) {
    next(createError(err));
  }
});

// list
router.get("/", async (req, res, next) => {
  try {
    res.render("board/list");
  } catch (err) {
    next(createError(err));
  }
});

// list
router.get("/", async (req, res, next) => {
  try {
    res.render("board/list");
  } catch (err) {
    next(createError(err));
  }
});

// list
router.get("/", async (req, res, next) => {
  try {
    res.render("board/list");
  } catch (err) {
    next(createError(err));
  }
});

module.exports = router;