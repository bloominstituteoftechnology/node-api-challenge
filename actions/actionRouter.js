const express = require("express");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.use("/:id", idExists);

function idExists(req, res, next) {
  const id = req.params.id;
  console.log("idd", id);

  Projects.get(id).then((project) => {
    console.log("project");
    if (project) {
      console.log(req.body);
      console.log("project", project);
      next();
    } else {
      res.status(400).json({ message: "invalid project id" });
    }
  });
}
module.exports = router;
