const express = require("express");
const projects = require("./data/helpers/projectModel")
const actions = require("./data/helpers/actionModel")
const projectRouter = express.Router();

//GET ENDPOINTS

projectRouter.get("/projects/:id", (req, res, next) => {
    projects
      .get(req.params.id)
      .then(project => {
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        }
      })
      .catch(next)
  });

  projectRouter.get("/projects/:id/actions/:actionID", checkProjectID(), (req, res, next) => {
    projects.getProjectActions(req.params.id)
		.then((projects) => {
			if (projects) {
                actions.get(req.params.actionID)
                .then((action) => {
                    if (action) {
                        res.json(action)
                    } else {
                        res.status(404).json({
                            message: "action was not found",
                        })}
                })
			} else {
				res.status(404).json({
					message: "Project was not found",
				})
			}
		})
		.catch(next)
})

  //POST ENDPOINTS

  projectRouter.post("/projects", (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json({
        errorMessage: "Please provide name and description for the project."
      });
    }
  
    projects
      .insert(req.body)
      .then(project => {
        res.status(201).json(project);
      })
      .catch(next)
  });

  projectRouter.post("/projects/:id/actions", checkProjectID(), (req, res, next) => {
	if (!req.body.description || !req.body.notes) {
		return res.status(400).json({
			message: "Missing description or notes",
		})
	}

    actions
        .insert({...req.body, project_id: req.params.id})
		.then((action) => {
			res.status(201).json(action)
		})
        .catch(next)
}) 


  //PUT ENDPOINT

  projectRouter.put("/projects/:id", (req, res, next) => {
    if (!req.body.name || !req.body.description) {
      return res.status(400).json({
        errorMessage: "Please provide name and description for the project."
      });
    }
  
    projects
      .update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        }
      })
      .catch(next)
  });

  

  // DELETE ENDPOINTS

  projectRouter.delete("/projects/:id", (req, res, next) => {
    projects
      .remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({
            message: "The project has been nuked"
          });
        } else {
          res.status(404).json({
            message: "The project with the specified ID does not exist."
          });
        }
      })
      .catch(next)
  });

  //MIDDLEWARE

  function checkProjectID() {
	return (req, res, next) => {
		projects.get(req.params.id)
			.then((project) => {
				if (project) {
					req.project = project
					next()
				} else {
					res.status(404).json({
						message: "Project not found",
					})
				}
			})
			.catch(next)
	}
}

  module.exports = projectRouter;