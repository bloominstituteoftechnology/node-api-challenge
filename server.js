// const express = require("express");
// const actionRouter = require("./actionRouter/actionRouter");
// const projectRouter = require("./projectRouter/projectRouter");
// const db = require("../data/helpers/actionModel");
// const server = express();

// server.use(express.json());
// const server = require("./server");

// const port = 5040;

// // server.use("api/users", actionRouter);
// // server.use("api/posts", projectRouter);

// server.get("/api/users", (req, res) => {
//   db.get(req.params.id)
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((err) => {
//       res.status(404).json({
//         errorMessage: "Can't retrive ID.",
//       });
//     });
// });

// server.listen(port, () => console.log(`server is listining on  ${port}`));

// module.exports = server;
