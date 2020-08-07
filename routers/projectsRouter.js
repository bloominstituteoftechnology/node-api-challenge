// Loading Data
const db = require( "../data/helpers/projectModel" );

// Creating Router
const router = require( "express" ).Router();

/**************** POST ****************/
router.post( "/", ( req, res ) => {
  db.insert( req.body )
    .then( response => res.status( 201 ).json( { data : response } ) )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
} );

/**************** GET ****************/
router.get( "/", ( req, res ) => {
  db.get()
    .then( response => res.status( 200 ).json( { data : response } ) )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
} );

router.get( "/:id", ( req, res ) => {
  db.get( req.params.id )
    .then( response => res.status( 200 ).json( { data : response } ) )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
} );

/**************** PUT ****************/
router.put( "/:id", ( req, res ) => {
  db.update( req.params.id, req.body )
    .then( response => res.status( 200 ).json( { data : response } ) )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
} );

/**************** DELETE ****************/
router.delete( "/:id", ( req, res ) => {
  db.remove( req.params.id )
    .then( () => res.status( 200 ).json( { data : "Project Deleted" } ) )
    .catch( () => res.status( 500 ).json( { message : "Internal Error" } ) );
} );

module.exports = router;