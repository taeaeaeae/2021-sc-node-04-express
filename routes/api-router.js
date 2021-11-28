const express = require("express");
const router = express.Router();
const { pool } = require("../modules/mysql-init");
const { filePath, deleteFile } = require("../modules/util");

router.get("/remove-file/:id", async (req, res, next) => {
  try {
    // 삭제처리
    let id = req.params.id;
    let sql = "SELECT saveName FROM uploadfiles WHERE id=?";
    const [[{ saveName }]] = await pool.execute(sql, [id]);
    deleteFile(saveName);
    sql = "DELETE FROM uploadfiles WHERE id=?";
    await pool.execute(sql, [id]);
    res.status(200).json({ success: true, id: req.params.id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;