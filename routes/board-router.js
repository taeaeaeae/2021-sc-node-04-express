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
const { pool } = require("../modules/mysql-init");
const pagerInit = require("../modules/pager-init");
const moment = require("moment");
const uploader = require("../middlewares/multer-mw");
const resizer = require("../middlewares/sharp-mw");

const router = express.Router();

// list
router.get("/", async (req, res, next) => {
  try {
    const { page = 1, type } = req.query;
    if (type === "create") next();
    else {
      let sql = "";
      sql = "SELECT COUNT(id) AS totalRecord FROM board";
      const [[{ totalRecord }]] = await pool.execute(sql);
      const pager = pagerInit(page, totalRecord);
      pager.loc = "/board";
      sql = "SELECT * FROM board ORDER BY id DESC LIMIT ?, ?";
      const [lists] = await pool.execute(sql, [
        pager.startIdx.toString(),
        pager.listCnt.toString(),
      ]);
      lists.forEach((v) => (v.wdate = moment(v.createdAt).format("YYYY-MM-DD")));
      res.render("board/list", { lists, pager });
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
router.post(
  "/",
  uploader.fields([{ name: "uploadImg" }, { name: "uploadFile" }]),
  resizer("uploadImg"),
  async (req, res, next) => {
    try {
      let sql = "";
      const { title, writer, content } = req.body;
      sql = "INSERT INTO board SET title=?, writer=?, content=?";
      const [rs] = await pool.execute(sql, [title, writer, content]);

      if (req.files.uploadImg) {
        for (let v of req.files.uploadImg) {
          sql =
            "INSERT INTO uploadfiles SET saveName=?, originName=?, mimeType=?, size=?, type=?, board_id=?";
          let { filename, originalname, size, mimetype } = v;
          await pool.execute(sql, [filename, originalname, mimetype, size, "I", rs.insertId]);
        }
      }

      if (req.files.uploadFile) {
        for (let v of req.files.uploadFile) {
          sql =
            "INSERT INTO uploadfiles SET saveName=?, originName=?, mimeType=?, size=?, type=?, board_id=?";
          let { filename, originalname, size, mimetype } = v;
          await pool.execute(sql, [filename, originalname, mimetype, size, "F", rs.insertId]);
        }
      }

      res.redirect("/board");
    } catch (err) {
      next(createError(err));
    }
  }
);

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