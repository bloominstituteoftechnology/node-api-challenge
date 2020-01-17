const express = require("express");

const projectDb = require("../data/helpers/projectModel.js")

const router = express.Router();

// router.get("/", (req, res) => {
//     res.send("projectsRouter working!")
// });

router.get("/", (req, res) => {
    projectDb.get()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The projects information could not be found"
        });
    });
});

module.exports = router;