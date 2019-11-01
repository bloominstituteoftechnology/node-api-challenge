const express = require("express");

const db = require("../dbConfig");

const router = express.Router();

router.use(express.json());

module.exports = router;