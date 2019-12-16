const projectsRouter = require('./routers/projectsRouter')
const actionsRouter = require('./routers/actionsRouter')

const express = require('express')
const app = express()

app.use(express.json())
app.use('/api/projects', projectsRouter)
app.use('/api/projects/:project_id/actions', actionsRouter)

app.get('/', (req, res) => {
    res.json({ message: "Welcome to my API!" })
})

// const port = process.env.PORT || 8000
// const host = process.env.HOST || "localhost:"

app.listen(8000, () => {
    console.log(`Server is listening on PORT 8000...`)
})