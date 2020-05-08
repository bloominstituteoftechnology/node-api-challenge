const express = require ('express');

const Projects = require ('../data/helpers/projectModel.js');
const Actions = require ('../data/helpers/actionModel.js');

const router = express.Router ();

//***********************************Projects***********************************//

//Create a new project */
//POST
//@Route api/users/projects
router.post ('/projects', validate_Projects, (req, res) => {
  Projects.insert (req.body)
    .then (newProjects => {
      res.status (201).json (newProjects);
    })
    .catch (err => {
      console.log (err);
      res
        .status (500)
        .json ({message: 'We ran into an issue saving your post'});
    });
});

//listing ALL projects
//GET
//@Route users/projects
router.get ('/projects', (req, res) => {
  Projects.get ()
    .then (projects => {
      res.status (200).json (projects);
    })
    .catch (err => {
      console.log (err);
      res.status (500).json ({message: 'Error fetching projects'});
    });
});

//listing a project by ID
//GET
//@Route users/projects/:id
router.get ('/projects/:id', validate_Projects_Id, (req, res) => {
  const id = req.params.id;
  Projects.get (id)
    .then (projects => {
      res.status (200).json (projects);
    })
    .catch (err => {
      console.log (err);
      res
        .status (500)
        .json ({message: 'There was an error finding that project'});
    });
});

//Updates project by ID
//PUT
//@Route users/projects/:id
router.put (
  '/projects/:id',
  validate_Projects_Id,
  validate_Projects,
  (req, res) => {
    const id = req.params.id;
    Projects.update (id, req.body)
      .then (updatedProjects => {
        res.status (201).json (updatedProjects);
      })
      .catch (err => {
        console.log (err);
        res.status (500).json ({message: 'Error updating this project'});
      });
  }
);

//Delete a project by ID
//DELETE
//@Route users/projects/:id
router.delete ('/projects/:id', validate_Projects_Id, (req, res) => {
  const id = req.params.id;
  Projects.remove (id)
    .then (projectToDelete => {
      console.log ('The project has been deleted');
      res.status (200).json (req.project);
    })
    .catch (err => {
      console.log (err);
      res.status (500).json ({message: 'Error deleting project'});
    });
});

//********************Actions*************************************************//

//Create a new ACTION
//PUT
//@Route users/projects/:id/actions
router.post (
  '/projects/:id/actions',
  validate_Projects_Id,
  validate_Actions,
  (req, res) => {
    Actions.insert (req.body)
      .then (newActions => {
        res.status (201).json (newActions);
      })
      .catch (err => {
        console.log (err);
        res.status (500).json ({message: 'Error saving your action'});
      });
  }
);

//Get a new ACTION by id
//GET
//@Route users/projects/:id/actions
router.get('/projects/:id/actions', validate_Projects_Id, (req,res) => {
    const id = req.params.id
    Projects.getProjectActions(id)
    .then(projActions => {
        res.status(200).json(projActions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error getting actions for project"})
    })
})



//****************************************************************************** */
/* Validate */
function validate_Projects_Id (req, res, next) {
  const id = req.params.id;
  Projects.get (id)
    .then (project => {
      if (!project) {
        res.status (400).json ({message: 'Invalid project id'});
      } else {
        req.project = project;
        next ();
      }
    })
    .catch (err => {
      console.log (err);
      res.status (500).json ({message: 'Error finding that project'});
    });
}

//validate project
function validate_Projects (req, res, next) {
  if (!req.body) {
    res.status (400).json ({message: 'error missing some post data'});
  } else if (!req.body.name || !req.body.description) {
    res.status (400).json ({message: 'Error missing the required field'});
  } else {
    next ();
  }
}

function validate_Actions (req, res, next) {
  if (!req.body) {
    res.status (400).json ({message: 'Error theis is missing Action data'});
  } else if (!req.body.notes || !req.body.description || !req.body.project_id) {
    res.status (400).json ({message: 'Error missing the required field'});
  } else {
    next ();
  }
}

function validate_Actions_Id (req, res, next) {
  const id = req.params.id;
  Actions.get (id)
    .then (action => {
      if (!action) {
        res.status (400).json ({message: 'Error invalid action id'});
      } else {
        req.action = action;
        next ();
      }
    })
    .catch (err => {
      console.log (err);
      res
        .status (500)
        .json ({message: 'There was an error finding that action'});
    });
}
module.exports = router;
