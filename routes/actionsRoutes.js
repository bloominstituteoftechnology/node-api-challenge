const express = require("express");
const dbActions = require("../data/helpers/actionModel.js");
const router = express.Router();

// GET
router.get("/", async (req, res) => {
  try {
    const actions = await dbActions.get();
    res.status(200).json(actions);
  } catch {
    res.status(500).json({ error: "error" });
  }
});

// POST
router.post("/:id", async (req, res) => {
  const newPost = { ...req.body, project_id: req.params.id };
  try {
    const success = await dbActions.insert(newPost);
    res.status(201).json(success);
  } catch {
    res.status(500).json({ error: "invalid ID specified" });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    await dbActions.update(req.params.id, { ...req.body, id: req.params.id });
    const newResult = await dbActions.getById(req.params.id);
    res.status(200).json(newResult);
  } catch {
    res.status(500).json({ error: "500 Error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const result = await dbActions.remove(req.params.id);
    res
      .status(200)
      .json({ status: `User Id: ${result} has been successfully deleted` });
  } catch {
    res.status(500).json({ error: "500 Error" });
  }
});

module.exports = router;
