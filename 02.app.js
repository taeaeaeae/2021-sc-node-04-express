const express = require("express");
const app = express();
require("./modules/server-init")(app, 3500);

app.use("/", express.static("./public"));

app.get("/", (req, res) => {
  res.send("Root");
});

app.get("/login", (req, res) => {
  res.send("GET");
});

app.post("/login", (req, res) => {
  res.send("POST");
});

app.get("/posts", (req, res) => {
  if(req.query.id){
      res.send(req.query.id + "번포스트")
  } else {
      res.send("전체포스트");
  }
});

app.get("/blogs", (req, res) => {
  res.send("전체 블로그");
});

app.get("/blog/:id", (req, res) => {
  const id = req.params.id;
  res.send(id + "번 블로그");
});

app.use((req, res) => {
  res.status(404).send("<h1>File Not Found</h1>");
});


// app.get();
// app.post();
// app.put();
// app.delete();
// app.use();
