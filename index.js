const express = require("express")
const logger = require('./middleware/logger');
const port = process.argv[2] || 4000

const projectRouter = require("./middleware/projectRouter");
const actionsRouter = require("./middleware/actionsRouter");

const serv = express();
serv.use(express.json());
serv.use(logger());
serv.use(projectRouter);
serv.use(actionsRouter);


//error catching
serv.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).json({message:"Something went wrong"})
})


serv.listen(port,()=>{
    console.log(`server running on port ${port}`);
})