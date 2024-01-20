// /routes/goods.js

import express from "express";
import Goods from "../schemas/goods.js";

// Express.js의 라우터를 생성합니다.
const router = express.Router();

/** 상품 등록 **/
// localhost:3000/api/goods POST
// 여기에서 .. api/goods라고 했으면 .. api/api/goods가 되었을 것.
// app.js에서 어떻게 설정을 했느냐에 따라서 여기에서도 설정이 달라져야 한다.
router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  if (!goodsId) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "goodsId 속성이 없습니다." });
  }

  const goods = await Goods.find({ goodsId }).exec();
  if (goods.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 존재하는 데이터입니다." });
  }

  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });

  return res.status(201).json({ goods: createdGoods });
});

export default router;
