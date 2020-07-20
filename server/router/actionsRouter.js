const express = require('express')
const Actions = require('../data/helpers/actionModel')

const router = express.Router()

// Actions
// Field	        Data Type	Metadata
// id	            number	    no need to provide it when creating posts, the database will automatically generate it.
// project_id	    number	    required, must be the id of an existing project.
// description      string	    up to 128 characters long, required.
// notes	        string	    no size limit, required. Used to record additional notes or requirements to complete the action.
// completed	    boolean	    used to indicate if the action has been completed, not required

const { validateProjectID, validateActionID, validateActionData } = require('../middleware/validateMiddleware')

//POST: Create
router.post('/:id', validateProjectID(), validateActionData(), ( req, res ) => {
    const { id } = req.params
    const { description, notes } = req.body

    Actions.insert( { id, description, notes })
        .then( posted => { res.status( 201 ).json( posted )})
        .catch( err => { res.status( 500 ).json({ errorMessage: 'There was an error adding the new action.' })})
})


//GET: Read
router.get('/', (req, res) => {

    Actions.get()
    .then( actions => {
        if(!actions) {
            res.status( 404 ).json( { errorMessage: "No actions were found." })
        } else {
            res.status( 200 ).json( actions )
        }
    })
    .catch( err => { res.status( 500 ).json( { errorMessage: "There was a error getting project actions." })})
})


//GET: Read
router.get('/:id', validateProjectID(), (req, res) => {
    const { project_id } = req.param

    Actions.get( project_id )
    .then( actions => {
        if(!actions) {
            res.status( 404 ).json( { errorMessage: `No actions for the project with ID: ${project_id} were found.` })
        } else {
            res.status( 200 ).json( actions )
        }
    })
    .catch( err => { res.status( 500 ).json( { errorMessage: "There was a error getting project actions." })})
})

//PUT: Update
router.put( '/:id', validateActionID(), ( req, res ) => {
    const { id } = req.params
    const { description, notes } = req.body

    Actions.update( id, { description, notes })
        .then( updated => { res.status( 200 ).json( updated )})
        .catch( err => { res.status( 500 ).json( { errorMessage: 'There was an error updating the action.' })})
})

//DELETE: Delete
router.delete( '/:id', validateActionID(), ( req, res ) => {
    const { id } = req.params

    Actions.remove( id )
        .then( deleted => { res.status( 204 ).end() })
        .catch( err => { res.status( 500 ).json( { errorMessage: 'There was an error deleting the action.' })})
})


module.exports = router