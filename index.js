/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/
/*
Mention two parts of Express that you learned about this week.
1. res.json - sends a response that parses through JSON 
2. Router - performing middleware and routing functions 

 Describe Middleware?
 1. helper function(s) that can be passed through the (req, res, next) objects 

 Describe a Resource?
 1. Database Schemas and endpoints /

 What can the API return to help clients know if a request was successful?
 1. a response or sucess code 200, 201, 204
 How can we partition our application into sub-applications?
 1. using express routing 
*/


const server = require('./server');

server.listen(4000, () => {
    console.log('running on port 4000');
})
