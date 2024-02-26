require('dotenv').config()
require("./db")

var cors = require('cors');
const productRouter =require('./routes/productRouter')
const categoryRouter =require('./routes/categoriesRouter')
const ordeRouter =require('./routes/orderRouter')
const searchRouter=require("./routes/searchRouter")
const cartRouter=require('./routes/cart.routes');

const {auth}=require("./middleware/auth")
const {admin}=require("./middleware/admin")
const express = require ('express');
const app = express()
const userRouter = require('./routes/user.router.js')
const paymentRouter = require('./routes/payment.router.js')
// const { getProductsByCategory } = require('./controllers/category.controllers');
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

//  app.use(auth);
// app.use(`${process.env.API_URL}/products/:category`,getProductsByCategory)
// app.use(`${process.env.API_URL}products/`,productRouter)

app.use(`${process.env.API_URL}search`,searchRouter)
app.use(`${process.env.API_URL}products`, productRouter)
app.use(`${process.env.API_URL}user`,userRouter)

//app.use(auth);
//  app.use(admin);

app.use(`${process.env.API_URL}payment`, paymentRouter)
app.use(`${process.env.API_URL}cart`, cartRouter);
app.use(`${process.env.API_URL}categories`, categoryRouter)
app.use(`${process.env.API_URL}orders`, ordeRouter)