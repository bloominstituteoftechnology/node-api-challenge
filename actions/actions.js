const express = require("express");

const actions = require("../data/helpers/actionModel");

const router = express.Router();

router.post("/api/actions", validateActions(), (req, res, next) => {
  actions
    .insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/api/actions", (req, res, next) => {
  actions
    .get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/api/actions/:id", validateActionsId(), (req, res) => {
  actions
    .get(req.params.id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      next(error);
    });
});

router.delete("/api/actions/:id", validateActionsId(), (req, res, next) => {
  actions
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: "The action has been deleted."
        });
      } else {
        res.status(404).json({
          message: "The action could not be found"
        });
      }
    })
    .catch(next);
});

router.put(
  "/api/actions/:id",
  validateActionsId(),
  validateActions(),
  (req, res, next) => {
    actions
      .update(req.params.id, req.body)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(next);
  }
);

//custom middleware

function validateActionsId() {
  return (req, res, next) => {
    actions
      .get(req.params.id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(400).json({
            message: "invalid action id"
          });
        }
      })
      .catch(next);
  };
}

function validateActions() {
  return (req, res, next) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
      return res.status(400).json({
        message: "Missing action"
      });
    }

    next();
  };
}

module.exports = router;
