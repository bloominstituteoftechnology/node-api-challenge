const express=require("express")
const router=express.Router()
const projectdb=require('../data/helpers/projectModel')
const actiondb=require('../data/helpers/actionModel')

router.get("/:id",validateProjectId, async(req,res)=>{
    try{
        const data=await projectdb.get(req.params.id)
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({message:"server error."})
    }
})

router.post("/",validateproject, async(req,res)=>{
    try{
        const data=await projectdb.insert(req.body)
        res.json(data)
    }catch(err){
        res.status(500).json({message:err})
    }
})

router.put("/:id",validateProjectId,validateproject,async(req,res)=>{
    try{
        const data=await projectdb.update(req.params.id, req.body)
        res.json(data)
    }catch(err){
        res.status(500).json({message:err})
    }
})

router.delete("/:id",validateProjectId, async(req,res)=>{
    try{
        await projectdb.remove(req.params.id)
        res.json({message:"successfully deleted."})
    }catch(err){
        res.status(500).json({message:err})
    }
    
})

router.get("/:id/actions",validateProjectId,async(req,res)=>{
    try{
        const actions=await projectdb.getProjectActions(req.params.id)
        if(actions[0]===undefined){
            res.status(404).json({message:"this project has no actions."})
        }else{
            res.json(actions)
        }   
    }catch(err){
        res.status(500).json({message:err})
    }
})

router.get('/:id/actions/:actionId',validateProjectId,validateActionId,async(req,res)=>{
    try{
        const data=await actiondb.get(req.params.actionId)
        console.log(data)
        res.json(data)
    }catch(err){
        res.status(500).json({message:"Server Error"})
    }
})

router.post('/:id/actions/',validateaction,async(req,res)=>{
    try{  
        const data= await actiondb.insert(req.body)
        console.log(data)
        res.json(data)
    }catch(err){
        res.status(500).json({message:"dfjrhf"})
    }
})


async function validateProjectId(req,res,next){
     const id=await projectdb.get(req.params.id)
        if(!id){
            res.status(404).json({message:"this project with this specific id is not found"})
        }else{
            next()
        }
}

function validateproject(req,res,next){
    const {name,description}=req.body
    if(!name||!description){
        res.status(400).json({message:"please provide name and description."})
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
    
    const {description,notes,project_id}=req.body
    if(!id){
        res.status(404).json({message:"can't add action to not existing project"})
    }else if(!description||!notes){
        res.status(400).json({message:"please provide description and notes "})
    }else{
        next()
    }
    
}

module.exports=router