// Loading Data
const actionsDB = require( "../data/helpers/actionModel" );
const projectsDB = require( "../data/helpers/projectModel" );

// Creating Router
const router = require( "express" ).Router();

/**************** POST ****************/
router.post( "/:id", validateProjectID, ( req, res ) => {
  actionsDB.insert( { project_id : req.params.id, ...req.body } )
    .then( response => res.status( 201 ).json( { data : response } ) )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
} );

/**************** GET ****************/
router.get( "/", ( req, res ) => {
  actionsDB.get()
    .then( response => res.status( 200 ).json( { data : response } ) )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
} );

router.get( "/:id", validateProjectID, ( req, res ) => {
  actionsDB.get( req.params.id )
    .then( response => res.status( 200 ).json( { data : response } ) )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
} );

router.get( "/:id/actions", validateProjectID, ( req, res ) => {
  projectsDB.getProjectActions( req.params.id )
    .then( response => res.status( 200 ).json( { data : response } ) )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
} );

/**************** PUT ****************/
router.put( "/:id", validateActionID, ( req, res ) => {
  actionsDB.update( req.params.id, req.body )
    .then( response => res.status( 200 ).json( { data : response } ) )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
} );

/**************** DELETE ****************/
router.delete( "/:id", validateActionID, ( req, res ) => {
  actionsDB.remove( req.params.id )
    .then( () => res.status( 200 ).json( { data : "Project Deleted" } ) )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
} );

/**************** Custom Middleware ****************/
function validateProjectID( req, res, next ) {
  projectsDB.get( req.params.id )
    .then( response => {
      if( !response )
        return res.status( 400 ).json( { data : response } );
      next();
    } )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
}

function validateActionID( req, res, next ) {
  actionsDB.get( req.params.id )
    .then( response => {
      if( !response ) 
        return res.status( 400 ).json( { data : response } );
      next();
    } )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
}

module.exports = router;