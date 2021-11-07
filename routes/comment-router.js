const axios = require("axios");
const express = require("express");
const router = express.Router();
const commentURL = "https://jsonplaceholder.typicode.com/comments";

router.get("/", async (req, res, next) => {
  try {
    const page = Number(req.query.page || 1);
    const { data: _lists } = await axios.get(commentURL);
    const lists = _lists.filter((v, i) => i >= (page - 1) * 8 && i < (page - 1) * 8 + 8);
    res.render("comment/list.ejs", { lists });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;