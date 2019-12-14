
const express = require('express')
const server = express()

const actionRouter = require('./actions/actionRouter')
const projectRouter = require('./projects/projectRouter')

server.use(express.json())

module.export = server