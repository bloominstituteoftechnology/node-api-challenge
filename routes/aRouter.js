const express = require('express');

const router = express.Router();

const actionDb = require('../data/helpers/actionModel')

router.get('/', (req, res) => {
    actionDb.get()
    .then(gets => {
        res.status(200).json(gets)
    })
    .catch(error => {
        res.status(500).json({ message: "Error retrieving action." })
    })
})

router.get("/:id", (req, res) => {
    actionDb.get(req.params.id)
        .then(get => {
            res.status(200).json(get);
        })
        .catch(error => {
            res.status(500).json ({ error: "Could not retrieve data",error });
        });
});

router.post("/", (req, res) => {
    const action = req.body;
    actionDb.insert(action)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json({ error: "Could not add data" });
        });
});

router.delete("/:id", (req, res) => {
    actionDb.remove(req.params.id)
        .then(gone => {
            res.status(200).json(gone);
        })
        .catch(error => {
            res.status(500).json({ error: "Could not remove data" });
        });
});

router.put("/:id", (req, res) => {
    actionDb.update(req.params.id, req.body)
        .then(puts => {
            res.status(200).json(puts);
        })
        .catch(error => {
            res.status(500).json({ error: "Could not update data" });
        });
});

module.exports = router