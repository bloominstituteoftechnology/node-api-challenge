const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "Lemme work it." });
});

const port = process.env.PORT || 7777;

server.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
