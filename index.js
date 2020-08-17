const express = require("express")
const logger = require('./middleware/logger');
const port = process.argv[2] || 4000

const projectRouter = require("./middleware/projectRouter");
const actionsRouter = require("./middleware/actionsRouter");
const {pt} = require('./middleware/shrinker')

const serv = express();
serv.use(express.json());
serv.use(logger());
serv.use(projectRouter);
serv.use(actionsRouter);

serv.get('/',(req,res)=>{
    res.status(200).json({message:"Welcome to the api"})
})


//error catching
serv.use((err,req,res,next)=>{
    pt(err)
    res.status(500).json({message:"Something went wrong"})
})


serv.listen(port,()=>{
    pt("server running on port", port,'yes')

})