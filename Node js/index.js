require('dotenv').config()
require("./db")

var cors = require('cors');
const productRouter =require('./routes/product.router.js')
const categoryRouter =require('./routes/categories.router.js')
const ordeRouter =require('./routes/order.router.js')
const searchRouter=require("./routes/search.router.js")
const cartRouter=require('./routes/cart.router.js');
const adminRouter=require('./routes/admin.router.js');
const productFav=require("./routes/productFavourite.router.js")

const {auth}=require("./middleware/auth")
const {admin}=require("./middleware/admin")
const express = require ('express');
const app = express()
const userRouter = require('./routes/user.router.js')
const paymentRouter = require('./routes/payment.router.js')

const ejs = require('ejs')

app.use(cors());
app.use((req,res,next)=>{
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Origin", "*");
    req.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    req.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
   next();
})

app.use(express.json())
app.use(express.static("public"))


app.set('view engine', 'ejs');
app.set('views','views')
app.get("/ejs",(req,res)=>{
    res.render('index',{title:'hellow', message: 'welcome to ejs'})
})


app.listen(3000,()=>{
    console.log(`listening on ${3000}`);
})

app.use(`${process.env.API_URL}search`,searchRouter)
app.use(`${process.env.API_URL}products`, productRouter)
app.use(`${process.env.API_URL}products/favourite`, productFav)
app.use(`${process.env.API_URL}user`,userRouter)
app.use(`${process.env.API_URL}categories`, categoryRouter)
app.use(`${process.env.API_URL}orders`, ordeRouter)

app.use(auth);

app.use(`${process.env.API_URL}payment`, paymentRouter)
app.use(`${process.env.API_URL}cart`, cartRouter);

app.use(admin);

app.use(`${process.env.API_URL}admin`, adminRouter)