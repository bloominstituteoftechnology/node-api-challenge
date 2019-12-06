const projectDb = require('./projectModel.js')

module.exports = {
    validateId: (req, res, next) => {
        const { id } = req.params

        projectDb
            .get(id)
            .then(project => {
                if (project) {
                    req.project = project
                    next()
                } else {
                    res.status(400).json({ message: 'Project does not exist' })
                }
            })
            .catch(err => res.status(500).json({ message: 'Server unable to retrieve Project', error: err }))
    },
    validateProject: (req, res, next) => {
        const { name, description } = req.body

        if (!req.body) {
            res.status(400).json({ message: 'Please add Project information' })
        } else if (!name) {
            res.status(400).json({ message: 'Missing project name' })
        } else if (!description){
            res.status(400).json({ message: 'Missing project description' })
        } else {
            next()
        }
    },
    validateAction: (req, res, next) => {
        const { description, notes } = req.body

        if (!req.body) {
            res.status(400).json({ message: 'Please add action information' })
        } else if (!description) {
            res.status(400).json({ message: 'Missing action description' })
        } else if (description.length > 128){
            res.status(400).json({ message: 'Description is too long'})
        } else if (!notes){
            res.status(400).json({ message: 'Missing action notes' })
        } else {
            next()
        }
    }
}