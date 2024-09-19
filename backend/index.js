const express = require('express')
const Connection = require('./config/db')
const userRouter = require('./routes/userroute')
const productsRoute = require('./routes/productsroute')
const cors = require('cors');
const app = express();

app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.use('/user',userRouter)
app.use('/product',productsRoute)



app.listen(4500, async () => {
    try {
        await Connection
        console.log("connected to db")
    } catch (e) {
console.log(e)
    }
    console.log("server running on port 4500")
})