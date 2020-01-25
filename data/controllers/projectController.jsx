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

exports.getActions = (req, res, next) => {
  console.log("getActions: ", req.project);
  projectController
    .getProjectActions(req.project.id)
    .then(actions => {
      res
        .status(200) //success
        .json(req.project);
    })
    .catch(e => {
      console.log(e);
      res
        .status(500) //server error
        .json({
          message: `error retrieving actions given project ID: ${req.project.id}`
        });
    });
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
// @desc    update/changed data to project with :id
// @route   PUT to /api/project/:id
exports.updateProject = (req, res, next) => {
  console.log("updateProject: ", req.body, req.project);
  projectController
    .update(req.project.id, req.body)
    .then(updated => {
      console.log("updateProject, updated: ", updated);
      res
        .status(200) //success
        .json({
          message: `Project details chaged with ID: ${req.project.id}.`,
          changes: updated
        });
    })
    .catch(e => {
      console.log("updateProject error!");
      res
        .status(500) //server error
        .json({ message: "Error in updateProject" });
    });
};

// ================================
//            DELETE
// ================================
// @desc    DELETE project with :id
// @route   DELETE to /api/project/:id
exports.deleteProject = (req, res, next) => {
  console.log("deleteProject: ", req.body, req.project);
  projectController
    .remove(req.project.id)
    .then(project => {
      console.log("deleteProject, .then: ", project);
      res
        .status(200) //success
        .json({ message: `Project ID of ${req.project.id} was deleted` });
    })
    .catch(e => {
      console.log("deleteProject err: ", err);
      res
        .status(500) //server error
        .json({ errorMessage: "Error in deleteProject" });
    });
};
