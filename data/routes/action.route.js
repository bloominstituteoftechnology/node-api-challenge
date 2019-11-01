const express = require('express');
const router = express.Router();
const helpers = require('./helpers');
const validators = require("../../middlewares/custom");

router.route('/')
.get(helpers.getActions)
.post(helpers.createAction)

router.route('/:id')
.get(helpers.getActionById)
.put(helpers.updateAction)
.delete(helpers.deleteAction)

module.exports = router;