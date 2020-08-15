const express = require("express");
const actions = require("../data/helpers/actionModel");
const {validateProjectId } = require("../middleware/projects");
const { checkActionsData } = require("../middleware/actions")

const router = express.Router();

router.get("/projects/:id/actions", validateProjectId (),  (req, res) => {
    
    actions.get()

        .then((actions) => {
            res.status(200).json(actions)
        })
        .catch((error) => {
            console.log(error);
            next(error);
        })
});

router.post("/projects/:id/actions",checkActionsData(),validateProjectId (),(req, res,next) => {

    actions.insert(req.body)
        .then((action) => {
            res.status(201).json(action)
        })
        .catch((error) => {
            next(error)
        })
});
module.exports = router;