function validateAll() {

    return (req, res, next) => {
        if(!Object.keys(req.body).length) {
            res.status(400).json({
                message: "missing data"
            })
        } else {next()}
    }
}

module.exports = {
    validateAll
}