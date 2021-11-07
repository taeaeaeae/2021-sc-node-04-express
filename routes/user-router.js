const express = require("express");
const router = express.Router();

router.get("/form", (req, res) => {
  res.send("<h1>USER UPDATE FROM</h1>");
});

router.post("/form", (req, res) => {
  res.send("<h1>USER UPDATE!</h1>");
});

module.exports = router;