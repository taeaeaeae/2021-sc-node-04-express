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

const path = require("path");
const express = require("express");
const createError = require("http-errors");
const { pool } = require("../modules/mysql-init");
const pagerInit = require("../modules/pager-init");
const moment = require("moment");
const uploader = require("../middlewares/multer-mw");
const resizer = require("../middlewares/sharp-mw");
const { filePath, deleteFile } = require("../modules/util");

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
      // [[{}, {}, {}], 필드정보]
      const [lists] = await pool.execute(sql, [
        pager.startIdx.toString(),
        pager.listCnt.toString(),
      ]);
      for (let v of lists) {
        v.wdate = moment(v.createdAt).format("YYYY-MM-DD");
        sql = "SELECT saveName FROM uploadfiles WHERE board_id=? AND type=? LIMIT 0, 1";
        let [thumb] = await pool.execute(sql, [v.id, "I"]);
        if (thumb.length) {
          let { saveName: name } = thumb[0];
          // v.thumb = path.join("/uploads/", name.split("_")[0], "thumb", name);
          let { thumbPath } = filePath(name);
          v.thumb = thumbPath;
        }
      }
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

// download
router.get("/download/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let sql = "SELECT * FROM uploadfiles WHERE id=?";
    const [[list]] = await pool.execute(sql, [id]);
    let { absolutePath } = filePath(list.saveName);
    res.download(absolutePath, list.originName);
  } catch (err) {
    next(createError(err));
  }
});

// view, update
router.get("/:id", async (req, res, next) => {
  try {
    let id = req.params.id;
    let { page, type } = req.query;
    let sql = "SELECT * FROM board WHERE id=?";
    // [[데이터], 필드정보]
    const [[list]] = await pool.execute(sql, [id]);
    list.updatedAt = moment(list.updatedAt).format("YYYY-MM-DD HH:mm:ss");
    sql = "SELECT * FROM uploadfiles WHERE board_id=? ORDER BY type ASC";
    const [data] = await pool.execute(sql, [list.id]);
    const images = data.filter((v) => {
      if (v.type === "I") {
        let { virtualPath } = filePath(v.saveName);
        v.thumb = virtualPath;
        return true;
      } else return false;
    });
    const files = data.filter((v) => {
      return v.type === "F";
    });
    // res.json({ list, files });
    res.render("board/" + type || "view", { list, files, images, page });
  } catch (err) {
    next(createError(err));
  }
});

// DELETE
router.delete("/", async (req, res, next) => {
  try {
    let { id, page } = req.body;
    // 실제 파일 삭제
    let sql = "SELECT * FROM uploadfiles WHERE board_id=?";
    const [rs] = await pool.execute(sql, [id]);
    await deleteFile(rs);
    // 레코드 삭제
    sql = "DELETE FROM board WHERE id=?";
    await pool.execute(sql, [id]);
    res.redirect("/board?page"+page);
  } catch (err) {
    next(createError(err));
  }
});

module.exports = router;