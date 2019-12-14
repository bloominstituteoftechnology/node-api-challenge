async function validateAction(req, res, next) {
    if (!req.body) {
        return res.status(400).json({ message: "missing action name" })
    }

    if (!req.body.name) {
        return res.status(400).json({ message: "missing required description" })
    }
    next(err)
}

module.exports = validateAction