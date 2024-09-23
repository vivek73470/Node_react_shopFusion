const express = require('express')
const Connection = require('./config/db')
const userRouter = require('./routes/userroute')
const productsRoute = require('./routes/productsroute')
const cartRouter = require('./routes/cartroute');
const cors = require('cors');
require('dotenv').config()
const app = express();

app.use(express.json())
app.use(cors({
    origin:"*"
}))

app.use('/user',userRouter)
app.use('/products',productsRoute)
app.use('/cart',cartRouter)


app.listen(process.env.port, async () => {
    try {
        await Connection
        console.log("connected to db")
    } catch (e) {
console.log(e)
    }
    console.log(`server running on port ${process.env.port}`)
})