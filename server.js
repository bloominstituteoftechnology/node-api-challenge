const express =require('express')
const projectRouter=require('./router/projectRouter')
const server=express()

server.use(express.json());
server.use("/project",projectRouter)


server.get("/",(req,res)=>{
    res.send('<h1>Hello<h1/>')
})


module.exports = server;