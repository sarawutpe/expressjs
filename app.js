const express = require("express");
const app = express();
const cors = require('cors')
const cookieParser = require("cookie-parser");

const port = 3000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("req", req);

  console.log("token is", req.cookies.token);
  res.send("Hello World! v2");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
