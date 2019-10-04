function validateProjectID(req, res, next) {
    const edit = req.body; 

    if(!edit.name && !edit.description) {
        res.status(400).json({message: "Please include a name or a description with maximum 128 characters "})
    } else if(edit.name && edit.description) {
        next()
    } else {
        res.status(404).json({error: "Project with specified id not found "});
        }
    }


module.exports = validateProjectID