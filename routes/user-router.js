const express = require("express");
const router = express.Router();
const axios = require("axios");

const userURL = "https://jsonplaceholder.typicode.com/users";

router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const { data: _lists } = await axios.get(userURL);
    const pageCount = Math.ceil(_lists.length / 8);
    const lists = _lists.filter((v, i) => (page - 1) * 8 <= i && (page - 1) * 8 + 8 > i);
    res.render("user/list.pug", { lists, pageCount, pagerPath: "user" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;