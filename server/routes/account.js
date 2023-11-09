const express = require("express");

const router = express.Router();

router.post("/myAccount/:userId", (req, res, next) => {
  const userId = req.params.userId;
  console.log(req.body);
  res.status(200).json({
    posts: [{ title: "DENEME" }],
  });
});

module.exports = router;
