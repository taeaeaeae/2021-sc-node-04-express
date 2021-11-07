/*
[GET] /post             -> 전체게시글
[GET] /post/1           -> 특정게시글
[GET] /post/1/coments   -> 특정 게시글 코멘트
[POST] /post            -> 특정 게시글 저장
*/

const express = require("express");
const router = express.Router();

router.get("/", (req, res)=> {
    res.send("모든게시글");
})

router.get("/:id", (req, res)=> {
    res.send(req.params.id + "번 글");
})

router.get("/:id/comments", (req, res)=> {
    res.send(req.params.id + "번 글의 코멘트들");
})

router.get("/:id/post", (req, res)=> {
    res.send("포스트저장");
})

module.exports = router;