const express = require("express");
const router = express.Router();
router.use(express.json());

const projectsDb = require("../data/helpers/projectModel");

//-----------------------------------------//
//POST PROJECT// (CREATE)
//-----------------------------------------//

router.post('/', (req, res) => {
    const body = req.body;

    projectsDb.insert(body)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(error => {
        res.status(500).json
        ({
            success: false, 
            errorMessage: "Could not add project", error
        });
      });
  });
  

//-----------------------------------------//
//GET PROJECT// (READ)
//-----------------------------------------//

router.get('/', (req, res) => {
    projectsDb.get()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(500).json
      ({
        success: false, 
        errorMessage: "Cound not pull projects from database", error
      });
    });
});

//-----------------------------------------//
//GET PROJECT BY ID// (READ)
//-----------------------------------------//A

router.get('/projects/:id', (req, res) => {
  const id = req.params.id;

  projectsDb.get(id)
    .then(project => {
      if (!id)
        res.status(404).json
        ({
            success: false, 
            errorMessage: "No project with that id"
        });
      else {
        res.status(200).json(project);
      }
    })
    .catch(error => {
      res.status(400).json
      ({
            success:false, 
            errormessage: "Sorry we coudln't find that info.", error
      });
    });
});

//-----------------------------------------//
//UPDATE PROJECT//
//-----------------------------------------//


router.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;

  projectsDb.update(id, body)
    .then(project => {
      if (!id) {
        res.status(404).json
        ({ 
            success:false, 
            errorMessage: "The project could not be updated"
         });

      } else if (!body.name || !body.description) {
        res.status(400).json
        ({
            success: false, 
            errorMessage: "Name and description required"
        });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(error => {
      res.status(500).json
      ({
            success: false, 
            errorMessage: "The project could not be updated", error
      });
    });
});

//-----------------------------------------//
//DELETE PROJECT//
//-----------------------------------------//

router.delete('/projects/:id', (req, res) => {
  const id = req.params.id;

  projectsDb.remove(id)
    .then(project => {
      if (!id) {
        res
          .status(404).json(project)
          ({ 
              success: false, 
              message: "There is no project with that ID" 
            });

      } else {

        res.status(200).json
        ({ 
            success: true, 
            message: "Project Deleted" 
        });
      }
    })
    .catch(error => {
      res.status(500).json
      ({ 
          success: false, 
          error: "This project could not be deleted", error
        });
    });
});

module.exports = router;