async function validateProject(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ message: "missing project id number" })
    }

    if (!req.body.description) {
        return res.status(400).json({ message: "missing required description" })
    }
    next()
}
module.exports = validateProject
