const express = require('express')
const Projects = require('../data/helpers/projectModel')

const router = express.Router()

// Projects
// Field	        Data Type	Metadata
// id	            number	    no need to provide it when creating projects, the database will generate it
// name	            string	    required.
// description	    string	    required.
// completed	    boolean	    used to indicate if the project has been completed, not required

const { validateProjectID, validateProjectData } = require('../middleware/validateMiddleware')

//POST: Create
router.post('/', validateProjectData(), ( req, res ) => {
    const { name, description } = req.body

    Projects.insert( { name, description })
        .then( posted => { res.status( 201 ).json( posted )})
        .catch( err => { res.status( 500 ).json({ errorMessage: 'There was an error added the new project' })})
})

//GET: Read
router.get('/', ( req, res ) => {

    Projects.get()
        .then( projects => {
            if( projects ){
                return res.status( 200 ).json( projects )
            } else {
                return res.status( 404 ).json( { errorMessage: 'No projects were found' })
            }
        })
        .catch( err => { res.status( 500 ).json( { errorMessage: `There was an error getting the projects` })})
})

//GET: Read / project ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Projects.get( id )
        .then( project => {
            if( project ){
                res.status( 200 ).json( project )
            } else {
                res.status( 404 ).json({ errorMessage: `A project with an id of ${id} does not exist.`})
            }
        })
        .catch( err => { res.status( 500 ).json( { errorMessage: `There was an error getting the specified project` })})
})

//GET: Read  / Projects actions
router.get( '/:id/actions', validateProjectID(), ( req, res ) => {
    const { id } = req.params

    Projects.getProjectActions( id )
        .then( projectActions => {
            if( projectActions.length ){
                res.status( 200 ).json( projectActions )
            } else {
                res.status( 404 ).json( { message: `Project id ${id} exists but there are no actions associated with it`})
            }
        })
        .catch( err => { res.status( 500 ).json( { errorMessage: 'There was an error retrieving project actions' })})
})


//PUT: UPDATE
router.put( '/:id', validateProjectID(), validateProjectData(), ( req, res ) => {
    const { id } = req.params
    const { name, description } = req.body

    Projects.update( id, { name, description })
        .then( updated => { res.status( 200 ).json( updated )})
        .catch( err => { res.status( 500 ).json( { errorMessage: 'There was an error updating the project' })})
})


//DELETE: Delete
router.delete( '/:id', validateProjectID(), ( req, res ) => {
    const { id } = req.params

    Projects.remove( id )
        .then( deleted => { res.status( 204 ).end() })
        .catch( err => { res.status( 500 ).json( { errorMessage: `There was an error deleting the post` })})
})

module.exports = router