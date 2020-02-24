const express =require('express')
const projectRouter=require('./router/projectRouter')
const actionRouter=require('./router/ActionRouter')
const server=express()

server.use(express.json());
server.use("/project",projectRouter)
server.use("/project",actionRouter)

server.get("/",(req,res)=>{
    res.send('<h1>Wellcome!<h1/>')
})

server.use((err,req,res,next)=>{
    res.status(500).json({message:"Server Error"})
})

module.exports = server;