const express = require("express");

const router = express.Router();
const DB = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
	DB.get()
		.then(result => {
			if (result) {
				res.status(200).json(result);
			} else {
				res.status(404).json({ message: "projects not found" });
			}
		})
		.catch(err => {
			res.status(500).json({ message: "error getting projects" });
		});
});

router.get("/:id", validateId, (req, res) => {
	// do your magic!
	res.status(200).json(req.data);
});

router.post("/", validateBody, (req, res) => {
	// do your magic!
	DB.insert(req.body)
		.then(result => {
			if (result) {
				res.status(200).json(result);
			}
		})
		.catch(err => {
			res.status(500).json({ message: "error" });
		});
});

router.put("/:id", validateId, validateBody, (req, res) => {
	// do your magic!
	DB.update(req.params.id, req.body)
		.then(result => {
			if (result) {
				res.status(200).json(result);
			}
		})
		.catch(err => {
			res.status(500).json({ message: "error" });
		});
});

router.delete("/:id", validateId, (req, res) => {
	// do your magic!
	DB.remove(req.params.id)
		.then(result => {
			if (result) {
				res.status(200).json(req.data);
			}
		})
		.catch(err => {
			res.status(500).json({ message: "error" });
		});
});

// 👇🏻 custom middleware 👇🏻

function validateId(req, res, next) {
	// do your magic!

	if (new RegExp(/^\d+$/).test(req.params.id) !== true) {
		res.status(500).json({ message: "Invalid ID" });
		return true;
	}

	DB.get(req.params.id)
		.then(data => {
			if (data) {
				req.data = data;
				next();
			} else {
				res.status(404).json({ message: "not found" });
			}
		})
		.catch(err => {
			res.status(500).json({ message: "error getting" });
		});
}

function validateBody(req, res, next) {
	if (!req.body) {
		res.status(400).json({ message: "missing data" });
		return true;
	}
	if (!req.body.name || !req.body.description) {
		res.status(400).json({ message: "missing required field" });
		return true;
	}
	if (req.body.completed !== undefined) {
		req.body.completed = !!Number(req.body.completed);
	}
	next();
}

module.exports = router;
