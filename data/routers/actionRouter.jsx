const express = require("express");
const router = express.Router();

const projectDB = require("../helpers/projectModel");

console.log("actionRouter.jsx is running....");

const { getStuff } = require("../controllers/actionController.jsx");

router.route("/").get(getStuff);
// .post()

module.exports = router;
