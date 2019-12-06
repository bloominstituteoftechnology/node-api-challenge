const actionDb = require('./actionModel.js')

module.exports = {
    validateId: (req, res, next) => {
        const { id } = req.params

        actionDb
            .get(id)
            .then(action => {
                if (action) {
                    req.action = action
                    next()
                } else {
                    res.status(400).json({ message: 'action does not exist' })
                }
            })
            .catch(err => res.status(500).json({ message: 'Server unable to retrieve action', error: err }))
    }
}