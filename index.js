const server = require('./server');

const port = 8000
server.get('/', (req, res) => {
    res.status(200).json({message: "Server is online!"})
})

server.listen(port, () => {
    console.log(`*** Server is listening on port ${port} ***`)
})