const express = require('express')
const router = express.Router()
const projects = require("./projectModel")

router.get('/', (req, res) => {
    projects.get()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch ((error) => {
        console.log(error)
        res.status(500).json({
            message: "Error retrieving the projects"
        })
    })
})

router.post("/", (req, res) => {
	if (!req.body.name || !req.body.description) {
		return res.status(400).json({
			message: "Please provide name and description for the project.",
		})
	}

	projects.insert(req.body)
		.then((project) => {
			res.status(201).json(project)
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "There was an error while saving the project to the database",
			})
		})
})

router.put("/:id", (req, res) => {
	if (!req.body.name || !req.body.description) {
		return res.status(400).json({
			message: "Please provide name and description for the project.",
		})
	}

	projects.update(req.params.id, req.body)
		.then((project) => {
			if (project) {
				res.status(200).json(project)
			} else {
				res.status(404).json({
					message: "There was an error while saving the project to the database",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "The project information could not be modified.",
			})
		})
})

router.delete("/:id", (req, res) => {
	projects.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The project has been deleted",
				})
			} else {
				res.status(404).json({
					message: "The project with the specified ID does not exist.",
				})
			}
		})
		.catch((error) => {
			console.log(error)
			res.status(500).json({
				message: "Error removing the project",
			})
		})
})

module.exports = router