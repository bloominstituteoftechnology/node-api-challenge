require('dotenv').config

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const port = process.env.PORT || 4000


const app = express()

app.use(express.static('client/build'))
app.use(cors())
app.use(helmet())
app.use(express.json())



app.listen(port, () => {
    console.log(`listening on ${port}`)
})