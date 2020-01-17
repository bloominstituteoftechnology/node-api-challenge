const express = require('express');
const projects = require('../data/helpers/projectModel');

const router = express.Router();

// ==== Schema ====
// id           number    Auto-generated
// project_id   number    Required. Must be the id of an existing project
// description  string    Required. Max length 128.
// notes        string    Required. No size limit.
// completed    boolean   Not required
//

// Get all the actions
router.get('/', (req, res) => {
  
  
});

module.exports = router;