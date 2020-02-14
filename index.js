const express = require("express");

const server = express();



const endpointRouter = require("./data/Endpoints")

server.use(express.json());

server.get("/", logger,  (req, res) => {
  res.send(`<h2>HEY</h2>`);
});

server.use("/lambda", logger, endpointRouter)

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl} at ${Date.now()}`);

  next();
}

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`\n** Running on port ${port}\n`))




module.exports = server



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
