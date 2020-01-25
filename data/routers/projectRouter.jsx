const express = require("express");
const router = express.Router();

const projectDB = require("../helpers/projectModel");

console.log("projectRouter.jsx is running....");

const { getStuff } = require("../controllers/projectController.jsx");

router.route("/").get(getStuff);
// .post()

module.exports = router;
