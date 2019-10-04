const express = require('express');

const Actions = require('../helpers/actionModel');

const router = express.Router();
// verify:
// - am i using changes correctly in my put request?
// - since all actions need a project to belong to, should i change my actions
//   router path in server.js? something like "/projects/actions" or "projects/:id/actions"?
// - If getting and posting actions in projectRouter is indeed correct, does 
//   that mean I dont need a get/post request here?

// router.post('/', (req, res) => {
//     Actions.insert(req.body)
//         .then(action => {
//             if (!req.body.project_id || !req.body.description) {
//                 res.status(400).json({ errorMessage: "Please provide project_id and description for the action." })
//             } else {
//             res.status(201).json(action)
//         }})
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({
//                 error: "There was an error while saving the action to the database"
//             })
//         })
// })

// router.post('/:id', (req, res) => {
//     const id = req.params.id
//     Actions.insert(req.body)
//         .then(action => {
//             if (!id) {
//                 res.status(404).json({ message: "The action with the specified ID does not exist." })
//             } else if (!req.body.text) {
//                 res.status(400).json({ errorMessage: "Please provide text for the comment." })
//             } else {
//             res.status(201).json(action)
//         }})
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({
//                 error: "There was an error while saving the comment to the database"
//             })
//         })
// })

// router.get('/', (req, res) => {
//     Actions.get()
//         .then(post => {
//             res.status(200).json(post)
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({
//                 error: "The action information could not be retrieved"
//             })
//         })
// })

// router.get('/:id', (req, res) => {
//     const id = req.params.id; 
//         Actions.get(id)
//             .then(action => {
//                 if (!id) {
//                     res.status(404).json({ message: "The action with the specified ID does not exist." })
//                 } else {    
//                 res.status(200).json(action)
//             }})
//             .catch(error => {
//                 console.log(error);
//                 res.status(500).json({
//                     error: "The action information could not be retrieved"
//                 })
//             })
// })

module.exports = router;