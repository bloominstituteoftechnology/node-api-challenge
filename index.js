/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/
// Imports
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mw = require('./middleware');

// Basic init and config
const server = express();
const port = process.env.PORT || 5000;

// Add global middleware
server.use(express.json());
server.use(cors());


server.use(mw.logger);
server.use(mw.errorCatcher);
// Add routes middleware 
const api = express.Router();
server.use('/api/v1', api);


api.get('/', (req, res) => {
  console.log("\n -- root request -- \n")
  res.send('There is nothing here');
})



server.listen(port, () => {
  console.log(`\n== express on: ${port} ==`)
})


// Helpers and custom middleware



