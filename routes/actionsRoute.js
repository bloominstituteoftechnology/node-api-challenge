const express = require("express")

const actionsDb = require("../data/helpers/actionModel")
const projectsDb = require("../data/helpers/projectModel")

const router = express.Router()
router.use(express.json())





module.exports = router