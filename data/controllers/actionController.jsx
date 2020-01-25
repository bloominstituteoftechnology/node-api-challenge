const actionController = require("../helpers/actionModel");
console.log("\nactionController.jsx is running....\n");

exports.getStuff = (req, res, next) => {
  console.log("getStuff");
  actionController
    .get()
    .then(users => {
      res
        .status(200) //success
        .json(users);
    })
    .catch(e => {
      console.log(e);
      res
        .status(500) //server error
        .json({ error: "Error in getStuff" });
    });
};
