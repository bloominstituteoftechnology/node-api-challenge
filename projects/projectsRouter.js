const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("projectsRouter working!")
});

module.exports = router;