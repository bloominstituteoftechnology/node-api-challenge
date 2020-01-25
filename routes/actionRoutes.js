const express = require('express'); 
const actionDb = require ('../data/helpers/actionModel.js');
const router = express.Router();


//-----------------------------------------//
//POST ACTION// (CREATE)
//-----------------------------------------//
router.post("/:id", (req, res) => {
    const body = req.body;

    actionDb.insert(body)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(error => {
        res.status(404).json
        ({
            success: false, 
            errorMessage: "Could not post action", error
        });
      });
  });

//-----------------------------------------//
//GET ACTION// (READ)
//-----------------------------------------//
router.get("/", (req, res) => {
    actionDb.get()
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        res.status(500).json
        ({
            success: false, 
            errorMessage: "Unable to pull actions from database", error
        });
      });
  });

//-----------------------------------------//
//GET ACTION BY ID// (READ)
//-----------------------------------------//

router.get('./:id', (req,res) => {
    const id = req.params.id;

    actionDb.get(id)
    .then (action => {
        if(id) {
            res.status(200).json(action);

        } else {

            res.status(404).json 
            ({
                success: false, 
                errorMessage: "No action with this ID"
            })
        }
    })
    .catch (error => {
        res.status(500).json
        ({
            success: false,
            errorMessage: "Action not found", error
        });
    });
});

//-----------------------------------------//
//UPDATE ACTION//
//-----------------------------------------//

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    actionDb.update(id, body)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(error => {
        res.status(500).json
        ({
            success: false, 
            errorMessage: "The action could not be updated", error
        });
      });
  });

//-----------------------------------------//
//DELETE ACTION//
//-----------------------------------------//

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    actionDb.remove(id)
      .then(action => {
        res.status(200).json(action);
      })
      .catch(error => {
        res.status(500).json
        ({
            success: false,
            errorMessage: "unable to delete", error
        });
      });
  });
  



module.exports = router;
