const projects = require('../data/helpers/projectModel');

module.exports = function validateProjectId(req, res, next) {
    projects
        .get(req.params.id)
        .then(project => {
            if(project) {
                req.project = project;
                next();
            } else {
                res.status(400).json({ message: 'project could not be found.'})
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'server error, cant find post', err })
        });
};