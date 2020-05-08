const express = require("express");

const router = express.Router();

const Projects = require("./projectModel");
const Actions = require("./actionModel");

router.post("/", validateUser, (req, res) => {});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  let newPost = req.body;
  //   newPost.project_id = req.params.id;
  console.log({ newPost });
  Projects.insert(newPost)
    .then((article) => {
      res.status(200).json(article);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/", (req, res) => {
  Projects.get()
    .then((person) => {
      res.status(200).json(person);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Invalid post ID",
        error: error.message,
      });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {
  Projects.remove(req.user.id)
    .then((deleteThis) => {
      console.log(deleteThis);
      Projects.get().then((personInfo) => {
        console.log(`Delete Success`);
        res.status(200).json(personInfo);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json("");
    })
    .then();
});

router.put("/:id", validateUserId, (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  Projects.get(req.params.id)
    .then((person) => {
      if (person === undefined) {
        res.status(400).json({ message: "invalid user id" });
      } else {
        req.user = person;
        // console.log("user?:", req.user);

        next();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "error occured" });
    });
}

function validateUser(req, res, next) {
  if (req.body.name === undefined || req.body === null) {
    res.status(400).json({ message: "missing user data" });
  } else if (req.body.name === "" || req.body.name === null) {
    res.status(404).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (
    req.body.name === undefined ||
    req.body.description === undefined ||
    req.body === null
  ) {
    res.status(400).json({ message: "missing user data" });
  } else if (
    req.body.name === "" ||
    req.body.description === "" ||
    req.body.name === null
  ) {
    res.status(404).json({ message: "missing required name field" });
  } else {
    next();
  }
}

module.exports = router;
