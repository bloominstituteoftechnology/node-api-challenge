 [ ] Mention two parts of Express that you learned about this week.
 express.router
 express middleware like
 helmet()
morgan()


- [ ] Describe Middleware?
   A middleware will catch an error before it happens,
   such as :
   
   async function validateUserId(req, res, next) {
   const id = req.params.id;
  const user =  await Users.getById(id)
   if(user){
     next();
   }else {
     res.status(404).json({message: 'Must have a valid Id.'})
   }
}

It will let the user know why they have received an error, instead of guessing and getting all frustrated. Also it could be a logger, or any other function you write to go before the response happens.


- [ ] Describe a Resource?

The data model which is written in SQL to make a model so Node can do all
the CRUD operations on the different endpoints.

- [ ] What can the API return to help clients know if a request was successful?
res.status(200)- which means OK,
res.status(201)- which means successfully added.

- [ ] How can we partition our application into sub-applications?
 For each endpoint, we have different files, and different models that were done with SQL. Like this project as an ActionModel, and a ProjectModel, as well as Routers for each one.
