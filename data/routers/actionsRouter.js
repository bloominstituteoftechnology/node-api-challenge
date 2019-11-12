const router = require("express").Router();
const actionModel = require("../helpers/actionModel");
const projectModel = require("../helpers/projectModel");

const Error_Message = "Server Error: could not retrieve data"

//Get all actions
router.get("/", (req, res) => {
    actionModel
        .get()
        .then(action => res.status(200).json(action))
        .catch(err =>
        res.status(500).json(Error_Message)
        );
    }
);

//Get action by ID
router.get("/:id", validateActionID, (req, res) => {
  res.status(200).json(req.action);
});

//Add an action to a project
router.post("/", validateProjectId, validateAction, (req, res) => {
    actionModel
        .insert(req.body)
        .then(action => res.status(201).json(action))
        .catch(err => res.status(500).json(Error_Message));
});

//Update an action
router.put("/:id", validateActionID, validateAction, (req, res) => {
  const id = req.params.id;
  const body = req.body;

  actionModel
    .update(id, body)
    .then(action =>
      action
        ? res.status(200).json({ message: `Action ${id} has been updated` })
        : res.status(404).json({ error: `Action ${id} not found` })
    )
    .catch(err =>
      res.status(500).json(Error_Message)
    );
});

//Delete an action
router.delete("/:id", validateActionID, (req, res) => {
  const id = req.params.id;
  actionModel
    .remove(id)
    .then(action => {
      action
        ? res.status(202).json({ message: `Action ${id} has been removed` })
        : res.status(404).json({ error: `Action ${id} not found` });
    })
    .catch(err =>
      res.status(500).json({ error: "Server had trouble filling request" })
    );
});

//function validation
function validateActionID(req, res, next) {
  const id = req.params.id;

  actionModel
    .get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ error: `Action ${id} not found` });
      }
    })
    .catch(err =>
      res.status(500).json(Error_Message)
    );
}

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;

  if (!project_id || !description || !notes) {
    res.status(400).json({
      error: "Missing required field: project_id, description, or notes"
    });
  } else {
    next();
  }
}

function validateProjectId(req, res, next) {
  const id = req.body.project_id;

  projectModel
    .get(id)
    .then(project => {
      project
        ? next()
        : res.status(404).json({ message: `Project ${id} not found` });
    })
    .catch(() =>
      res.status(500).json(Error_Message)
    );
}

module.exports = router;