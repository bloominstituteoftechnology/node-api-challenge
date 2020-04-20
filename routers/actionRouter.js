const express = require("express");
const actions = require("../data/helpers/actionModel");
const middleware = require("./middleware");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const actionList = await actions.get();
    res.status(200).json(actionList);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", middleware.validateActionId, (req, res, next) => {
  res.status(200).json(req.action);
});

router.put("/:id", middleware.validateActionId, async (req,res,next) =>{
    try{
        const actionChange = await actions.update(req.id,req.body);
        res.status(200).json(actionChange);
    }catch (err){
        next(err);
    }
});

router.delete("/:id",middleware.validateActionId, async (req,res,next) =>{
    try{
        const deletedAction = await actions.remove(req.id);
        res.status(200).json({
            message:"action deleted!"
        });
    }catch(err){
        next(err);
    }
});



module.exports = router;
