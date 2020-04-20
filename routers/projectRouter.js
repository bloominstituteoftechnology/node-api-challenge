const express = require("express");
const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");
const middleware = require("./middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const projectList = await projects.get();
    res.status(200).json(projectList);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", middleware.validateProjectId, (req, res, next) => {
  res.status(200).json(req.project);
});

router.post("/", middleware.validateProject, async (req, res, next) => {
  try {
    const newproject = await projects.insert(req.body);
    res.status(201).json(newproject);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", middleware.validateProjectId, async (req, res, next) => {
  try {
    const projectChange = await projects.update(req.id, req.body);
    res.status(200).json({
      message: "Project successfully updated ",
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", middleware.validateProjectId, async (req, res, next) => {
  try {
    const project = await projects.remove(req.id);
    res.status(200).json({
      message: "project deleted",
    });
  } catch (err) {
    next(err);
  }
});

// adding a new action below

router.post("/:id/actions", middleware.validateProjectId,middleware.validateAction,async (req,res,next)=>{
    try{
        const newAction = await actions.insert({...req.body,project_id:req.id});
        res.status(201).json(newAction);
    }catch(err){
        next(err);
    }
})

module.exports = router;
