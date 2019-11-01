const router = require("express").Router();
const db = require("../data/helpers/projectModel.js");
const dbAction = require("../data/helpers/actionModel.js");

router.get("/:id", validateProjectId, async (req, res) => {
  res.status(200).json(req.project);
});

router.put("/:id", validateProjectId, validateProject, async (req, res) => {
  try {
    const project = await db.update(req.params.id, {
      name: req.body.name,
      description: req.body.description
    });

    res.status(202).json(project);
  } catch {
    res.status(500).json({
      error:
        "There was an error while attempting to update the project with that ID"
    });
  }
});

router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    const deleted = await db.remove(req.params.id);

    if (deleted)
      res.status(202).json({ message: "Project successfully deleted" });
  } catch {
    res.status(500).json({
      error:
        "There was an error while attempting to delete the project with that ID"
    });
  }
});

router.post("/", validateProject, async (req, res) => {
  try {
    const project = await db.insert({
      name: req.body.name,
      description: req.body.description
    });

    res.status(201).json(project);
  } catch {
    res.status(500).json({
      error: "There was an error while attempting to create the project"
    });
  }
});

router.get("/:id/actions", validateProjectId, async (req, res) => {
  try {
    const actions = await db.getProjectActions(req.params.id);

    actions.length > 0
      ? res.status(200).json(actions)
      : res
          .status(200)
          .json({ message: "This projects doesn't have any actions" });
  } catch {
    res.status(500).json({
      error:
        "There was an error while attempting to fetch the actions for the project"
    });
  }
});

router.post(
  "/:id/actions",
  validateProjectId,
  validateAction,
  async (req, res) => {
    try {
      const action = await dbAction.insert({
        project_id: req.params.id,
        description: req.body.description,
        notes: req.body.notes
      });

      res.status(201).json(action);
    } catch {
      res.status(500).json({
        error:
          "There was an error while attempting to fetch the actions for the project"
      });
    }
  }
);

//custom middleware
async function validateProjectId(req, res, next) {
  try {
    const project = await db.get(req.params.id);
    req.project = project;

    project
      ? next()
      : res
          .status(404)
          .json({ message: "Project with that ID was not found." });
  } catch {
    res.status(500).json({
      error:
        "There was an error while attempting to fetch the project with that ID"
    });
  }
}

async function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json({
      message:
        "Please provide the required name and description for the project"
    });
  } else {
    next();
  }
}

async function validateAction(req, res, next) {
  if (!req.body.notes || !req.body.description) {
    res.status(400).json({
      message:
        "Please provide the required description and notes for the project"
    });
  } else {
    next();
  }
}

module.exports = router;