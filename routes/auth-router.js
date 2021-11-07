const express =require("express")
const router = express.Router();

router.get("/login", (req, res) => {
    res.send("<h1>LOGIN FROM</h1>");
});
router.get("/Join", (req, res) => {
    res.send("<h1>JOIN FROM</h1>");
});

module.exports = router;