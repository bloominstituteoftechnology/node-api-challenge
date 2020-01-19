const projectDb = require('../data/helpers/projectModel');


module.exports = (req, res, next) => {

    const id = req.body.project_id;
    projectDb.get(id)
    .then(projects => {
        console.log(projects);
        if (projects )
            next()
        else
            res.status(404).json({
                errorMessage: "No Project ID is found in the database. NO action created."
            })
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error: "Internal Server Error...."
        })
    })



}