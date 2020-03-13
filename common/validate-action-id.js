const actions = require('../data/helpers/projectModel');

module.exports = function validateActionId(req, res, next) {
    actions
        .get(req.params.project_id)
        .then(action => {
            if(action) {
                req.actions = action
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