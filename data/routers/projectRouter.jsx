const express = require("express");
const router = express.Router();

const projectDB = require("../helpers/projectModel");

console.log("projectRouter.jsx is running....");

const {
  getProjects,
  addProject
} = require("../controllers/projectController.jsx");

router
  .route("/")
  .get(getProjects)
  .post(validatePost, addProject);

function validatePost(req, res, next) {
  console.log("validatePost: ", req.body);
  if (!req.body) {
    res
      .status(400) //Bad Request
      .json({ message: "Missing post information" });
  } else if (!req.body.name || !req.body.description) {
    res
      .status(400) //Bad Request
      .json({ message: "Missing post name and/or description" });
  } else {
    next();
  }
}

module.exports = router;
