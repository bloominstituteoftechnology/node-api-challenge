const projectController = require("../helpers/projectModel");
console.log("\nprojectController.jsx is running....\n");

// ================================
//            GET
// ================================
// @desc    GET all projects
// @route   GET to /api/project
exports.getProjects = (req, res, next) => {
  console.log("getProjects");
  projectController
    .get()
    .then(projects => {
      console.log("getProjects, projects:", projects);
      res
        .status(200) //success
        .json(projects);
    })
    .catch(e => {
      console.log(e);
      res
        .status(500) //server error
        .json({ error: "Error in getProjects" });
    });
};

// @desc    GET project with Id
// @route   GET to /api/project/:id
exports.getProject = (req, res, next) => {
  console.log("getProject: ", req.project);
  res
    .status(200) // success
    .json(req.project);
};

// ================================
//            POST
// ================================
// @desc    POST/CREATE new project
// @route   POST to /api/project
exports.addProject = (req, res, next) => {
  console.log("addProject: ", req.body);
  projectController
    .insert(req.body)
    .then(project => {
      console.log("addProject, project: ", project);
      res
        .status(200) //success
        .json(project);
    })
    .catch(e => {
      res
        .status(500) //server error
        .json({ error: "error in addProject" });
    });
};

// ================================
//            PUT
// ================================

// ================================
//            DELETE
// ================================
exports.deleteProject = (req, res, next) => {
  console.log("deleteProject: ", req.body, req.project);
  projectController
    .remove(req.project.id)
    .then(project => {
      console.log("deleteProject, .then: ", project);
      if (!!project) {
        res
          .status(200) //success
          .json({ message: `Project ID of ${req.project.id} was deleted` });
      } else {
        res
          .status(400) //project not found
          .json({ message: "Project with ID not found" });
      }
    })
    .catch(e => {
      console.log("deleteProject err: ", err);
      res
        .status(500) //server error
        .json({ errorMessage: "Error in deleteProject" });
    });
};
