import dotenv from 'dotenv'
import express from 'express'
import connectDB from './db/mogoose.js'
import cors from 'cors'
import AuthRoute from './routes/user.router.js'
import AdminRoute from './routes/admin.router.js'
import ProductRoute from './routes/product.router.js'
import CartRoute from './routes/cart.router.js'
import AdressRoute from './routes/address.router.js'
import OrderRoute from './routes/order.router.js'
import cookieParser from 'cookie-parser'


dotenv.config()

const app=express()

app.use(cors({
    origin: "https://mistry-shop-xox.onrender.com",
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())

connectDB()

app.use('/api',AuthRoute)
app.use('/admin',AdminRoute)
app.use('/product',ProductRoute)
app.use('/cart',CartRoute)
app.use('/address',AdressRoute)
app.use('/order',OrderRoute)

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port");
    
})
