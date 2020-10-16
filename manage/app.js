const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./module/router");

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

app.use(router);
app.listen(5000, () => {
  console.log("成功启动", "http://localhost:5000");
});
