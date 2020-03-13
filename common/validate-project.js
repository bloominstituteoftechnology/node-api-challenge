module.exports = function validateProject(req, res, next) {
    resource = {
        description: req.body.description
    }

    if(!req.body.description) {
        return res.status(404).json({ errorMessage: 'missing description data' })
    } else if (req.description.length <= 128){
        req.description = resource;
        next();
    } else {
        return res.status(500).json({ errorMessage: 'description is too long. 128 characters max.'})
    }
};