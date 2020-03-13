module.exports = function validateAction(req, res, next) {
  resource = {
    notes: req.body.notes,
    description: req.body.description
  };

  if (!req.body.notes) {
    return res.status(404).json({ errorMessage: "Missing notes data" });
  } else if (req.description.length <= 128) {
    req.notes = resource.notes;
    req.description = resource.description;
    next();
  } else {
    return res
      .status(500)
      .json({ errorMessage: "description is too long. 128 characters max." });
  }
};
