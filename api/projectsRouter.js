const express = require("express");
const server = express();
const projectModel = require("../data/helpers/projectModel.js");
const router = express.Router();
server.use(express.json());

//create
//this works
router.post('/', validatePost, (req, res) => {
  const project = req.body;

  projectModel.insert(project).then(newProject => {
    res.status(201).json(newProject);
  })
})

//read
router.get("/", (req, res) => {
  // this works
    
  projectModel
    .get()
    .then(p => {
      res.status(200).json(p);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error" });
    });
});

//update
//this works
router.put('/:id', (req, res) => {
  projectModel.update(req.params.id, req.body).then(updateProject => {
    if (updateProject) {
      res.status(200).json(updateProject);
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: "Error" });
  });
})

//delete
//this works
router.delete("/:id", (req, res) => {
  projectModel.remove(req.params.id).then(count => {
    res.status(200).json(count);
  });
});

//retrieve list of actions for a project
//this works
router.get('/:id/actions', (req, res) => {
  projectModel.getProjectActions(req.params.id).then(project => {
    if (project) {
      res.status(200).json(project);
    }
  })
});

//validation
function validatePost(req, res, next) {

  const { description } = req.body;
  // console.log(req.body);
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  }
  if (!description) {
    res.status(400).json({ message: "missing required description field" });
  }
  next();
}

module.exports = router;
