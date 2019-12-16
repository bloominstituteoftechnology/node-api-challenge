function validateProjectBody (){
    return (req, res, next)=>{
        const {name, description} = req.body;
        if(!name || !description){
            return res.status(500).json({
            message: 'Error'
            });
        }
        req.project = {name, description},
        next()   
    }
}
const validateProjectId = () => (req, res, next) =>{
    const id = req.params.id;
    if(!id){
        return res.status(500).json({
            message: 'Error'
            });
    }
    req.id = id;
    next(); 
}
module.exports = {
    validateProjectBody,
    validateProjectId
}