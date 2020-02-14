const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "GET to '/actions' successful" });
});

module.exports = router;
