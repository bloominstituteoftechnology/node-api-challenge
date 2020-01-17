require('dotenv').config

const express = require('express')
const port = process.env.PORT || 4000
const app = express()

const projectRouter = require('./data/actions/projectRouter');
const actionsRouter = require('./data/actions/actionsRouter');

app.use(express.json());


app.listen(port, () => {
    console.log(`listening on ${port}`)
})

app.use('/projects', projectRouter);
app.use('/actions', projectRouter);


app.get("*", (req, res) => {
	res.status(200).json({ message: "it works " });
});