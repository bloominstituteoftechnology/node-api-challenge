require('dotenv').config();

const server = require('./server.js'); // like a react import from another file

const port = process.env.PORT;


server.listen(port, () => {
    console.log(`listening on port ${port}....`)
});


