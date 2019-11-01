const express = require("express");
const db = require("../data/helpers/actionModel");
const router = express.Router();

router.get("/", (req, res) => {
  db.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(`Internal error:`, err);
      res
        .status(500)
        .json({ errorMsg: `Internal error when trying to get all projects.` });
    });
});

// router.get(`/:id`, (req, res) => {
//   db.get(req.params.id)
//     .then(project => {
//       project
//         ? res.status(200).json(project)
//         : res
//           .status(404)
//           .json({ message: `Project not found, please enter a valid ID` });
//     })
//     .catch(err => {
//       console.log(`Internal error`, err);
//       res.status(500).json({
//         errorMsg: `Internal error when trying to get project ${req.params.id}`
//       });
//     });
// });

// router.post(`/`, validateProject, (req, res) => {
//   db.insert(req.body)
//     .then(newProject => {
//       res.status(201).json(newProject);
//     })
//     .catch(err => {
//       console.log(`Internal error when adding new project`, err);
//       res
//         .status(500)
//         .json({ message: "Internal error when adding new project" });
//     });
// });

// router.delete(`/:id`, (req, res) => {
//   db.remove(req.params.id)
//     .then(count => {
//       count
//         ? res.status(200).json({ message: `Successfully deleted ${count}` })
//         : res
//           .status(404)
//           .json({ message: `Could not find a project with that ID.` });
//     })
//     .catch(err => {
//       console.log(
//         `Internal error when trying to remove project ${req.params.id}`,
//         err
//       );
//       res.status(500).json({
//         errorMessage: `Internal error when trying to remove project ${req.params.id}`
//       });
//     });
// });

// router.put(`/:id`, (req, res) => {
//   db.update(req.params.id, req.body)
//     .then(newProject => {
//       newProject
//         ? res.status(200).json(newProject)
//         : res.status(404).json({
//           message: `Project ${req.params.id} not found. Please enter a valid project ID.`
//         });
//     })
//     .catch(err => {
//       console.log(`Internal error when updating project ${req.params.id}`);
//       res.status(500).json({
//         message: `Internal error when updating project ${req.params.id}`
//       });
//     });
// });

// function validateProject(req, res, next) {
//   const { name, description } = req.body;
//   // no completed / actions because those shouldn't be in a newly created project
//   name && description
//     ? next()
//     : res.status(400).json({
//       message: "Missing an input field, please include name and description."
//     });
// }

module.exports = router;
