// app.js

import express from "express";
import goodsRouter from "./routes/goods.js";
import newsRouter from "./routes/news.js";
import connect from "./schemas/index.js";
import { createRequire } from "module";

const app = express();
const PORT = 3000; // 서버를 열 때 사용할 포트

const require = createRequire(import.meta.url);
const bodyParser = require("body-parser");

connect(); // Mongodb를 연결하기 위한 커넥트 함수를 실행한다.

// body-parser
app.use(bodyParser.json()); // for parsing applicaton/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// localhost:3000/api → goodsRouter
// localhost:3000/api → newsRouter
// 2. 라우터를 등록합니다.
app.use("/api", [goodsRouter, newsRouter]);
// api 뒤에 문자열이 붙는다..
// 1. Express.js의 서버를 엽니다.
app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});

app.use("/api/goods", goodsRouter);
