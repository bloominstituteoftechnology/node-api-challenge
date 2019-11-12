const express = require ('express');

 const Project = require('../data/projectModel.js')

const router = express.Router();
// this enstatiates the router
router.get('/projects', (req, res) => { 
Project.get()
.then(project => {
    res.status(200).json(project);
})
.catch(err => {
    res.status(500).json({message:"error"});
});
});
// ----------------------thanks Karen! 
 router.get('/project/:id', (req, res) => {

 });
// ----------------------thanks Karen! 
 router.post('/', (req, res) => {

 });
// ----------------------thanks Karen! 
 router.put('/', (req, res) => {

 });
// ----------------------thanks Karen! 
 router.delete('/', (req, res) => {

 });


 module.exports = router;