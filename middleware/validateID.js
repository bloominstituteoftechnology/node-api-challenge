const db = require("../data/helpers/actionModel");

module.exports = () => {
    const {id} = req.params;
  
    db.get(id)
    .then(actions => {
      if (actions) {
        req.actions = actions;
        next();
      } else {
        res.status(400).json({ errorMessage: `Action ID ${req.params.id} does not exist` })
      }
    })
};
