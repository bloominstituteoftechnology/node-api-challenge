const express = require("express");

const router = express.Router();

const actiondb = require("../data/helpers/actionModel");
const projectdb = require("../data/helpers/projectModel");

//Requests

router.get("/", (req, res) => {
  actiondb
    .get()
    .then((actions) => {
      res.status(200).json({ actions: actions });
    })
    .catch((error) => {
      res.status(500).json({ message: "could not retrieve user data" });
    });
});

router.get("/:id", validateId, (req, res) => {
  const id = req.params.id;
  actiondb
    .get(Number(id))
    .then((action) => {
      res.status(200).json({ action: action });
    })
    .catch((error) => {
      res.status(500).json({ message: "could not retrieve user data" });
    });
});

router.post("/:id", validateId, validateAction, (req, res) => {
  const id = req.params.id;
  const newAction = {
    project_id: id,
    description: req.body.description,
    notes: req.body.notes,
  };
  actiondb
    .insert(newAction)
    .then((response) => {
      res.status(200).json({ message: "Succesfully posted" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error retrieving data", error });
    });
});

router.delete("/:id", validateId, (req, res) => {
  const id = req.params.id;
  actiondb
    .remove(id)
    .then((response) => {
      res.status(200).json(`succesfully deleted action with id: ${id}`);
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not retrieve data" });
    });
});

router.put("/:id", validateId, validateActionSimple, (req, res) => {
  const id = req.params.id;
  const updatedAction = {
    description: req.body.description,
    notes: req.body.notes,
  };
  actiondb
    .update(id, updatedAction)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "The post information could not be modified" });
    });
});

// Middleware

function validateId(req, res, next) {
  actiondb.get(req.params.id).then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "invalid action id" });
    }
  });
}

function validateAction(req, res, next) {
  projectdb.get(req.params.id).then((project) => {
    if (project) {
      if (Object.keys(req.body).length === 0) {
        res.status(400).json({ message: "missing post data" });
      } else if (!req.body.description || !req.body.notes) {
        res.status(400).json({ message: "missing required text fields" }).end();
      } else {
        next();
      }
    } else {
      res.status(404).json({ message: "invalid project id" });
    }
  });
}

function validateActionSimple(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.description || !req.body.notes) {
    res.status(400).json({ message: "missing required text fields" }).end();
  } else {
    next();
  }
}

module.exports = router;
