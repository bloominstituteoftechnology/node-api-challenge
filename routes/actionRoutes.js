const express = require('express'); 
const actionDb = require ('../data/helpers/actionModel');
const router = express.Router();

router.use(express.json())


//-----------------------------------------//
//POST ACTION// (CREATE)
//-----------------------------------------//
router.post('/', (req, res) => {
    const body = req.body;

    actionDb.insert(body)
      .then(result => {
        res.status(201).json(result);
      })
      .catch(error => {
        res.status(500).json
        ({
            success: false, 
            errorMessage: "Could not add action", error
        });
      });
  });


//-----------------------------------------//
//GET ACTION// (READ)
//-----------------------------------------//
router.get('/', (req, res) => {
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

router.get('/actions/:id', (req,res) => {

    const id = req.params.id;

    actionDb.get(id)
    .then (actions => {
        if(actions) {
            res.status(200).json(actions);

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
        if(action){
            return res.status(200).json(action);

        } else {

            res.status(404).json
            ({ 
                success: false, 
                errorMessage: "This action does not exist" })
        }
    })
    .catch(error => {
        res.status(500).json
        ({ 
            success: false, 
            message: "Action could not be updated" , error
        })
    })
})


//-----------------------------------------//
//DELETE ACTION//
//-----------------------------------------//

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    actionDb.remove(id)
    .then(count => {
        if(count > 0) {
            return res.status(200).json
            ({ 
                success: true, 
                errorMessage: "Action removed!" 
            })
        } else {
            return res.status(404).json
            ({ 
                success: false, 
                errorMessage: "Action cannot be found." 
            })
        }
    })
    .catch( error => {
        console.log(error)
        res.status(500).json
        ({ 
            success: false, 
            errorMessage: "Action cannot be removed."
        })
    })
})

  

module.exports = router;
