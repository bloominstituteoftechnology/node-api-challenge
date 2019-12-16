async function validateAction(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ message: "missing action name" })
    }

    if (!req.body.text) {
        return res.status(400).json({ message: "missing required description" })
    }

    if (!req.body.notes) {
        return res.status(400).json({ message: "missing required additional notes" })
    }
    next(err)
}

module.exports = validateAction