const express = require("express");

const projectModel = require("../data/helpers/projectModel.js");
const router = express.Router();

router.get("/", (req, res) => {
  projectModel.get().then(projects => {
    res.send(projects);
  }).catch(() => {
      res
        .status(500)
        .json({ error: "The projects information could not be retrieved." });
  }

  );
});



module.exports = router;
