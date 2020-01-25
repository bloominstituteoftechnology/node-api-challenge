const actionController = require("../helpers/actionModel");
console.log("\nactionController.jsx is running....\n");

// ================================
//            GET
// ================================
// @desc    GET all projects
// @route   GET to /api/project/:id/actions/:actionId
exports.getAction = (req, res, next) => {
  console.log("getProject: ", req.action);
  res
    .status(200) // success
    .json(req.action);
};

// ================================
//            POST
// ================================
// @desc    POST/CREATE new action to :id
// @route   POST to /api/project
exports.createAction = (req, res, next) => {
  console.log("getStuff");
  actionController
    .insert(req.body)
    .then(action => {
      res
        .status(200) //success
        .json(action);
    })
    .catch(e => {
      console.log(e);
      res
        .status(500) //server error
        .json({ error: "Error in createAction" });
    });
};

// ================================
//            PUT
// ================================
// @desc    update/changed data to project with :id AND :actionId
// @route   PUT to /api/project/:id/actions/:actionId

// ================================
//            DELETE
// ================================
// @desc    DELETE action with :id AND :actionId
// @route   DELETE to /api/project/:id/actions/:actionId
