require("dotenv").config()


const server = require('./server')

const port = process.env.PORT || 4500

server.listen(port, ()=>{
    console.log(`\n Server listening on http://localhost:${port}`)
})