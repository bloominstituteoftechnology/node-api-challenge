const router = require('express').Router();
const idChecker = require('../middleware/idChecker');
const logger = require('../middleware/logger');
const { 
createAction,
updateAction,
getAction,
removeAction
 } = require('../controllers/actions');

router
.route('/')
// .get(getActions)
.post(idChecker,logger, createAction);

router
.route('/:id')
.get(getAction)
.put(updateAction)
.delete(removeAction);

module.exports = router;
