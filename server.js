// import commonJS modules
const express = require("express");
const userRouter = require("./users/userRouter.js");
const cors = require("cors");
const server = express();


// middleware
server.use(express.json());

//routes end points
server.use("/api/users", userRouter);
server.use(logger);


//Stretch using cors.
server.use(cors())

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!!!</h2>`);
});
// logger()
function logger(req, res, next) {
  console.log(
    `${Date(Date.now).toString()} ${req.method} Request to ${req.originalUrl}`);
  next();
}
module.exports = server;