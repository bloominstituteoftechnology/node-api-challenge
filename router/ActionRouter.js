const express=require("express")
const router=express.Router()
const actiondb=require('../data/helpers/actionModel')
const projectdb=require('../data/helpers/projectModel')

// Routing

router.get("/:id/actions",validateProjectId,async(req,res,next)=>{
    try{
        const actions=await projectdb.getProjectActions(req.params.id)
        if(actions[0]===undefined){
            res.status(404).json({message:"this project has no actions."})
        }else{
            res.json(actions)
        }   
    }catch(err){
        next(err)
    }
})

router.get('/:id/actions/:actionId',validateProjectId,validateActionId,async(req,res,next)=>{
    try{
        const data=await actiondb.get(req.params.actionId)
        res.json(data)
    }catch(err){
        next(err)
    }
})

router.post('/:id/actions',validateaction,async(req,res,next)=>{
    const newaction={
            description:req.body.description,
            notes:req.body.notes,
            project_id:req.params.id
        }
    try{  
        const data= await actiondb.insert(newaction)
        res.status(201).json(data)
    }catch(err){
        next(err)
    }
})

router.put("/:id/actions/:actionId",validateProjectId,validateActionId,async(req,res,next)=>{
    const updatedAction={
            description:req.body.description,
            notes:req.body.notes,
            project_id:req.params.id
        }
    try{
        const updated= await actiondb.update(req.params.actionId,updatedAction)
        res.json(updated)
    }catch(err){
        next(err)
    }
})

router.delete("/:id/actions/:actionId",validateProjectId,validateActionId,async(req,res,next)=>{
    try{
        await actiondb.remove(req.params.actionId)
        res.json({message:"Successfully deleted."})
    }catch(err){
        next(err)
    }
})

// MiddleWare Functions

async function validateProjectId(req,res,next){
     const id=await projectdb.get(req.params.id)
        if(!id){
            res.status(404).json({message:"this project with this specific id is not found"})
        }else{
            next()
        }
}

async function validateActionId(req,res,next){
    const id=await actiondb.get(req.params.actionId)
    if(!id){
        res.status(404).json({message:"this action with this specific id is not found"})
    }else{
        next()
    }
}

async function validateaction(req,res,next){
    const id = await projectdb.get(req.params.id)
    const {description,notes}=req.body
    if(!id){
        res.status(404).json({message:"can't add action to not existing project"})
    }else if(!description||!notes){
        res.status(400).json({message:"please provide description and notes "})
    }else{
        next()
    }
}

module.exports=router
