// Create web server
// Start server by running "node comments.js" in terminal

const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/comments", (req, res) => {
  fs.readFile("comments.json", (err, data) => {
    if (err) throw err;
    let comments = JSON.parse(data);
    res.send(comments);
  });
});

app.post("/comments", (req, res) => {
  fs.readFile("comments.json", (err, data) => {
    if (err) throw err;
    let comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile("comments.json", JSON.stringify(comments), (err) => {
      if (err) throw err;
      res.send(comments);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});