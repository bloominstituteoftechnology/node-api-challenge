const express = require("express");

const db = require("../helpers/actionModel.js");

const server = express.Router();

server.use(express.json());

//GET
server.get("/", (req, res) => {
    db.get()
    .then(actions => {
        res.status(200).json(actions);
    })
    .catch(error => {
        res.status(500).json({ error: "GET / error" })
    })
})

//GET by ID
server.get("/:id", (req, res) => {
    const id = req.params.id;
    db.get(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({ error: "GET /:id error" })
    })
})

module.exports = server;