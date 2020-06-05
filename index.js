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
//import exress
const express = require('express');

//import routers
const projectsRouter = require('./Routers/ProjectsRouter');
const actionsRouter = require('./Routers/ActionsRouter');

const server = express();

// json middleware
server.use(express.json());

//return default response
server.get('/', (req, res) => {
  res.send({ message: 'welcome to the sprint challenge!' });
});

// listen to port
const port = 9000;
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
