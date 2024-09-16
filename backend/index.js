const express = require('express')
const Connection = require('./config/db')
const app = express();

app.listen(4500, async () => {
    try {
        await Connection
        console.log("connected to db")
    } catch (e) {
console.log(e)
    }
    console.log("server running on port 4500")
})