const express = require("express");

const Actions = require("../helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "this information could not be found"
      });
    });
});

router.post("/:id", (req, res) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        errorMessage: "Project ID could not be found"
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Actions.remove(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "unable to delete"
      });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const updatedAction = req.body;
  Actions.update(id, updatedAction)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "The action could not be updated"
      });
    });
});

module.exports = router;
