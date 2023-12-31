const express = require("express");
const app = express();
const cors = require('cors')
const cookieParser = require("cookie-parser");

const port = 8080;

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("ok")
})

app.get("/cookie", (req, res) => {
  console.log("req", req);

  console.log("token is", req.cookies.token);
  res.send(JSON.stringify(req.headers.authorization));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
