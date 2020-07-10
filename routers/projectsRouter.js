const express = require("express");

const router = express.Router();

const projectdb = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  projectdb
    .get()
    .then((projects) => {
      res.status(200).json({ projects: projects });
    })
    .catch((error) => {
      res.status(500).json({ message: "could not retrieve user data" });
    });
});

router.get("/:id", validateId, (req, res) => {
  const id = req.params.id;
  projectdb
    .get(Number(id))
    .then((project) => {
      res.status(200).json({ project: project });
    })
    .catch((error) => {
      res.status(500).json({ message: "could not retrieve user data" });
    });
});

router.post("/", validateProject, (req, res) => {
  projectdb
    .insert(req.body)
    .then((response) => {
      res.status(200).json({ message: "Succesfully posted" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error retrieving data", error });
    });
});

router.delete("/:id", validateId, (req, res) => {
  const id = req.params.id;
  projectdb
    .remove(id)
    .then((response) => {
      res.status(200).json(`succesfully deleted project with id: ${id}`);
    })
    .catch((error) => {
      res.status(500).json({ message: "Could not retrieve data" });
    });
});

router.put("/:id", validateId, validateProject, (req, res) => {
  const id = req.params.id;
  const updatedProject = {
    name: req.body.name,
    description: req.body.description,
  };
  projectdb
    .update(id, updatedProject)
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
  projectdb.get(req.params.id).then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ message: "invalid project id" });
    }
  });
}

function validateProject(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "missing required text field" }).end();
  } else {
    next();
  }
}

module.exports = router;
