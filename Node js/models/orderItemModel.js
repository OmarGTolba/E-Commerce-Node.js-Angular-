const mongoose = require('mongoose');

const OrderItem = mongoose.model('OrderItem', new mongoose.Schema({
   quantity:{
    type:Number,
    required:true
   },
   product:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Product"
   }
}))

module.exports = OrderItem;