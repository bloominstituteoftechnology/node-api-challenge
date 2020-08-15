const express = require("express");
const projects = require("../data/helpers/projectModel");
const { checkForId,checkProjectData,validateProjectId } = require("../middleware/projects");

const router = express.Router();

router.get("/projects/:id?", checkForId(),  (req, res) => {
    
    projects.get(req.id)
        .then((projects) => {
            res.status(200).json(projects)
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
})
router.post("/projects",checkProjectData(),(req, res) => {
    projects.insert(req.body)
        .then((project) => {
            res.status(201).json(project)
        })
        .catch((error) => {
            next(error);
        })
});

router.put("/projects/:id", checkProjectData(),validateProjectId(),(req, res, next) => {
    projects.update(req.params.id, req.body)
        .then((project) => {
            res.status(200).json(project);
        })
        .catch(next)
});
router.delete("/projects/:id",validateProjectId(),(req, res, next) => {
    projects.remove(req.params.id)
        .then((count) => {
            if (count > 0) {
                res.status(200).json({
                    message: "The project has been deleted",
                })
            } else {
                res.status(404).json({
                    message: "Project not found",
                })
            }
        })
        .catch(next)
});

module.exports = router;