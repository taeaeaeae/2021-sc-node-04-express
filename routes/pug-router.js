const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("main");
});

router.get("/lists", (req, res) => {
    const lists = [
        { id: 5, title: "테스트 글5", data: "2021-11-07"},
        { id: 4, title: "테스트 글4", data: "2021-11-04"},
        { id: 3, title: "테스트 글3", data: "2021-11-03"},
        { id: 2, title: "테스트 글2", data: "2021-11-02"},
        { id: 1, title: "테스트 글1", data: "2021-11-01"}
    ]
    
    res.render("lists", { lists });
});


module.exports = router;