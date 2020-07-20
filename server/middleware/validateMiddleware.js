const Projects = require('../data/helpers/projectModel.js')
const Actions = require('../data/helpers/actionModel')


function validateProjectID() {
    return  ( req, res, next ) => {
        Projects.get( req.params.id )
        .then( project => {
            if( project ) {
                req.project = project
                next()
            } else {
                res.status( 404 ).json( { errorMessage: `The project with id: ${req.params.id} does not exist.` })
            }
        })
        .catch( err =>  { res.status( 500 ).json( { errorMessage: "There was an error validating the project ID."})})
    }
}

function validateProjectData() {
    return ( req, res, next ) => {
        if( !req.body.name || !req.body.description ) {
            return res.status( 400 ).json( { errorMessage: "A new project requires a name and description" })
        } else {
            next()
        }
    }
}

function validateActionID() {
    return  ( req, res, next ) => {
        Actions.get( req.params.id )
        .then( action => {
            if( action ) {
                req.action = action
                next()
            } else {
                res.status( 404 ).json( { errorMessage: `The action with id: ${req.params.id} does not exist.` })
            }
        })
        .catch( err =>  { res.status( 500 ).json( { errorMessage: "There was an error validating the action ID."})})
    }
}

function validateActionData() {
    return ( req, res, next ) => {
        if( !req.body.description || !req.body.notes ) {
            return res.status( 400 ).json( { errorMessage: "A new action requires a description and notes." })
        } else {
            next()
        }
    }
}


module.exports = {
    validateProjectID,
    validateProjectData,
    validateActionID,
    validateActionData
}