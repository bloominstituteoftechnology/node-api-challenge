const router = require('express').Router();

const { 
createAction,
updateAction,
getAction,
removeAction
 } = require('../controllers/actions');

router
.route('/')
// .get(getActions)
.post(createAction);

router
.route('/:id')
.get(getAction)
.put(updateAction)
.delete(removeAction);

module.exports = router;
