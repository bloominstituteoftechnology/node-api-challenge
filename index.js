//const express = require("express")
const app = require("./server")


const port = process.env.PORT || 6000;


app.listen(port, () => {
    console.log(`Server Running on http://localhost:${port}`)
})



// process.env.PORT || 