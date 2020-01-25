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
  console.log("createAction:", req.body);
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
exports.updateAction = (req, res, next) => {
  console.log("updateAction: ");
  actionController
    .update(req.params.actionId, req.body)
    .then(updated => {
      console.log("updateAction, updated: ", updated);
      res
        .status(200) //success
        .json({
          message: `Action with ID of ${req.params.actionId} updated.`,
          changes: updated
        });
    })
    .catch(e => {
      res
        .status(500) //server error
        .json({ message: "Error in updateAction" });
    });
};

// ================================
//            DELETE
// ================================
// @desc    DELETE action with :id AND :actionId
// @route   DELETE to /api/project/:id/actions/:actionId
exports.deleteAction = (req, res, next) => {
  console.log("deleteAction: ", req.action);
  actionController
    .remove(req.action.id)
    .then(action => {
      res
        .status(200) //success
        .json({
          message: `Project_id: ${req.action.project_id} successfully removed`
        });
    })
    .catch(e => {
      console.log(e);
      res
        .status(500) //server error
        .json({ error: "Error in createAction" });
    });
};
