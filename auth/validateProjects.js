function validateUser(req, res, next) {
    const body = req.body; 
    const name = req.body.name; 
    const description = req.body.description; 

    if(JSON.stringify(body) === "{}") {
        res.status(400).json({errorMessage: "Missing data"})
    } else if(!name && !description) {
        res.status(400).json({errorMessage: "Missing required fields"})
    } else{
        next()
    }
}

module.exports = validateUser