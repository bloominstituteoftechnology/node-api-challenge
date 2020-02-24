const express=require("express")
const router=express.Router()
const projectdb=require('../data/helpers/projectModel')

// Routing

router.get("/:id",validateProjectId, async(req,res,next)=>{
    try{
        const data=await projectdb.get(req.params.id)
        res.status(200).json(data)
    }catch(err){
        next(err)
    }
})

router.post("/",validateproject, async(req,res,next)=>{
    try{
        const data=await projectdb.insert(req.body)
        res.json(data)
    }catch(err){
        next(err)
    }
})

router.put("/:id",validateProjectId,validateproject,async(req,res,next)=>{
    try{
        const data=await projectdb.update(req.params.id, req.body)
        res.json(data)
    }catch(err){
        next(err)
    }
})

router.delete("/:id",validateProjectId, async(req,res,next)=>{
    try{
        await projectdb.remove(req.params.id)
        res.json({message:"successfully deleted."})
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


function validateproject(req,res,next){
    const {name,description}=req.body
    if(!name||!description){
        res.status(400).json({message:"please provide name and description."})
    }else{
        next()
    }
}


module.exports=router