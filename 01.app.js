const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
app.listen(port, () => console.log(`http://127.0.0.1:${port}`));

app.use("/", express.static("./public"));

app.get("/hello", (req, res) => {
  // const name = req.query.name;
  const { name } = req.query;
  res.status(200).send(`
  <!doctype html>
  <html lang="ko">
    <head>
      <meta charset="utf-8" />
      <title>Hello, ${name}</title>
    </head>
    <body>
      <h1>Hello, ${name}</h1>
    </body>
  </html>`);
});

app.get("/users", async (req, res) => {
  try {
    const name = req.query.name;
    const usersURL = "https://jsonplaceholder.typicode.com/users";
    const reqUrl = name ? usersURL + "?username=" + name : usersURL;
    const { data: users } = await axios.get(reqUrl);
    // res.json(users);
    let html = `
    <!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <title>Hello, ${name}</title>
      </head>
      <body>
        <table border="1">`;
    for (let v of users) {
      html += `
        <tr>
          <td>${v.id}</td>
          <td>${v.name}</td>
          <td>${v.username}</td>
          <td>${v.email}</td>
          <td>${v.phone}</td>
        </tr>`;
    }
    html += `
        </table>
      </body>
    </html>`;
    res.status(200).send(html);
  } catch (err) {
    console.log(err);
  }
})