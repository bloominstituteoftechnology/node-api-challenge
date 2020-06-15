//Go code!

const express = require("express");
const actionRouter = require("./actionRouter/actionRouter");
const projectRouter = require("./projectRouter/projectRouter");

const server = express();
const port = 5040;

server.use(express.json());
//const server = require("./server");

server.use(actionRouter);
server.use(projectRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

server.listen(port, () => console.log(`server is listining on  ${port}`));
