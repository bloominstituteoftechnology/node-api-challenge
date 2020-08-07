const express = require( "express" );
var cors = require( "cors" );
const server = express();

server.use( express.json() );
server.use( cors() );

server.use( "/api/projects", require( "./routers/projectsRouter" ) );
server.use( "/api/actions", require( "./routers/actionsRouter" ) );

const PORT_NUMBER = process.env.PORT || 5000;
server.listen( PORT_NUMBER, () => { console.log( `\n* Server Running on http://localhost:${ PORT_NUMBER } *\n` )  } );