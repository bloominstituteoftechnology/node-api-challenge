const projectController = require("../helpers/projectModel");
console.log("\nprojectController.jsx is running....\n");

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
