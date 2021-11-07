const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("<h1>ALL CART</h1>");
});

router.get("/:id", (req, res) => {
  res.send("<h1>" + req.params.id + "번 상품</h1>");
});
module.exports = router;