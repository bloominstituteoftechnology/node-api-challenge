const express = require("express");
const router = express.Router();

const projectDB = require("../helpers/projectModel");

console.log("projectRouter.jsx is running....");

const {
  getProjects,
  addProject,
  getProject,
  deleteProject
} = require("../controllers/projectController.jsx");

router
  .route("/")
  .get(getProjects)
  .post(validatePost, addProject);

router
  .route("/:id")
  .get(validateId, getProject)
  .delete(validateId, deleteProject);

//custom middleware
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

function validateId(req, res, next) {
  console.log("validateId: ", req.body, req.params.id);
  projectDB
    .get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        console.log("validateID fail!");
        res
          .status(400) //Bad request
          .json({ message: "Id not found" });
      }
    })
    .catch(e => {
      console.log("validateId, err: ", err);
      res
        .status(500) //server error
        .json({ message: "Error in validateId" });
    });
}

module.exports = router;
