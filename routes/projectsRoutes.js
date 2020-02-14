const express = require("express");

const dbProjects = require("../data/helpers/projectModel");

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  try {
    const projects = await dbProjects.get();
    res.status(200).json(projects);
  } catch {
    res.status(500).json({ error: "error" });
  }
});

// POST
router.post("/", async (req, res) => {
  const newPost = { ...req.body };
  try {
    const success = await dbProjects.insert(newPost);
    res.status(201).json(success);
  } catch {
    res.status(500).json({ error: "Invalid data specified" });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    await dbProjects.update(req.params.id, { ...req.body, id: req.params.id });
    const newResult = await dbProjects.getById(req.params.id);
    res.status(200).json(newResult);
  } catch {
    res.status(500).json({ error: "500 Error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const result = await dbProjects.remove(req.params.id);
    res
      .status(200)
      .json({ status: `User Id: ${result} has been successfully deleted` });
  } catch {
    res.status(500).json({ error: "500 Error" });
  }
});

module.exports = router;
