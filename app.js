const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");

const port = 3000;
app.use(cors())
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log(req.headers);

  console.log("token is", req.cookies.token);
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
