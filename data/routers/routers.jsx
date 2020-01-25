const express = require("express");
const router = express.Router();

const actionDB = require("../helpers/actionModel");
const projectDB = require("../helpers/projectModel");

console.log("routers.jsx is running....");

const { getStuff } = require("../controllers/actionController.jsx");

router.route("/").get(getStuff);
// .post()

module.exports = router;
