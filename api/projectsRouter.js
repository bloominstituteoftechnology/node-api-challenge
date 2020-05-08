const projects = require('../data/helpers/projectModel');
const actions = require('../data/helpers/actionModel');
const router = require('express').Router();
const messages = require('../middleware').messageDictionary;

module.exports = router;


// Projects
// Field	Data Type	Metadata
// id	number	no need to provide it when creating projects, the database will generate it
// name	string	required.
// description	string	required.
// completed	boolean	used to indicate if the project has been completed, not required

router.post('/', validatePost, (req, res, next) => {
  // there should be some type of "formatting" prior to sending object to db!!!
  projects.insert(req.body)
  .then(result => {
    // check if there's an object first
    res.status(200).json(result);
  })
  .catch(err => {
    console.log({err});
    next(messages.dbCreateError)
  })
})

router.get('/', (req, res, next) => {
  projects.get()
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => {
    console.log({err})
    next(messages.dbRetrieveError)
  })
})

// router.get('/:id', (req, res, next) => {
//   projects.get()

// })

function validatePost(req, res, next) {
  console.log(req.body)
  if (!req.body || !req.body.name || !req.body.description) {
    next(messages.incompleteData);
  } else {
    next();
  }
}
