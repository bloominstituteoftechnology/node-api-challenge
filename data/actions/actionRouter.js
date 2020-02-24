const express = require(express);

const Projects = require("./../helpers/projectModel.js");
const Actions = require("./../helpers/actionModel.js");

const router = express.Router();

router.get('/', async (req, res, next) => {
   const actions = await Actions.get();
   actions 
      ? res.status(200).json(actions)
      : next({status: 500, message: 'action retrival error'})
});

router.get('/:id', validateActionId, async (req, res, next) => {
   res.status(200).json(req.action)
});

router.post('/', validateAction, async (req, res, next) => {
   try {
      const result = await Actions.insert(req.action);
      res.status(201).json(result);
   }
   catch(error) {
      next(error);
   }
});

router.put(':/id', validateActionId, validateAction, async (req, res, next) => {
   const { id } = req.params;
   try {
      const updatedProject = await Actions.update(id, req.action);
      res.status(200).json(updatedProject);
   }
   catch(error) {
      next(error);
   }
});

router.delete('/:id', validateActionId, async (req, res, next) => {
   const { id } = req.params;

   try {
      const count = await Actions.remove(id);

      if(count <= 0){
         next({status: 500, message: "Error while deleting action"});
      } else {
         res.status(200).json({message: "Deleted successfully"})
      }
   };
   catch(error) {
      next(error);
   }
});

async function validateActionId(req, res, next) {
   const { id } = req.params;

   try{
      const action = await Actions.get(id);
      
      if(action) {
         req.action = action;
         next()
      } else{
         next({status: 404, message: 'Action does not exist'})
      }
   }
   catch(error) {
      next(error)
   }
};