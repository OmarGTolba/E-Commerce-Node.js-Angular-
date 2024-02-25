const asyncHandler = require('express-async-handler')
const orderModel = require("../models/orderModel")
const OrderItemModel = require("../models/orderItemModel")
const cartService = require("../models/cart.model")
const User = require("../models/user.schema")
const getAllOrders=asyncHandler(async (req, res) => {
    const order = await orderModel.find().populate('user', 'name -_id').populate({
        path: 'orderItemsIds', populate: {
            path: 'product', populate: 'categories'
        }
    });
    res.status(200).json({ results: order.length, data: order });
})
// const getUserOrder=asyncHandler(async (req, res) => {
//     const userId = req.params.id;

//     const userOrder = await orderModel.find({user:userId}).populate('user', 'name -_id').populate({
//         path: 'orderItemsIds', populate: {
//             path: 'product', populate: 'categories'
//         }
//     });
//     res.status(200).json({ data: userOrder });
// })


const getOrderById=asyncHandler(async (req, res) => {
    const order = await orderModel.findById(req.params.id).populate('user', 'name -_id').populate({
        path: 'orderItemsIds', populate: {
            path: 'product', populate: 'categories'
        }
    });
    res.status(200).json({ data: order });
})

const calculateTotalPrice = async (orderItemIds) => {
    let totalPrice = 0;

    for (const item of orderItemIds) {
        const orderItem = await OrderItemModel.findOne(item).populate('product');
        totalPrice += orderItem.product.price * orderItem.quantity;
      
    }

    return totalPrice;
};

const createNewOrder=asyncHandler(async (req, res) => {
    const orderItemsIds = [];

    for (const item of req.body.orderItems) {
        let { quantity, product } = item;
        const newItem = await OrderItemModel.create({ quantity, product });

        orderItemsIds.push(newItem._id);

    }


    const totalPrice = await calculateTotalPrice(orderItemsIds);

    const { city, phone, status, user, dateOrdered } = req.body;
    const newOrder = await orderModel.create({ orderItemsIds, city, phone, status, totalPrice, user, dateOrdered });

    if (!newOrder) {
        return res.status(400).send("the order can't be created");
    }
    res.status(200).json({ data: newOrder });
})


const getUserOrder = asyncHandler(async (req, res) => {
    const userId = req.params.id; // Assuming you have the user ID in the request body

    // Retrieve user's cart items 

    const userCarts = await cartService.find({ user: userId }).populate('items.product_id');
    console.log(userCarts[0].items[0].quantity);

    if (!userCarts || userCarts.length === 0) {
        return res.status(400).json({ message: "No carts found for the user" });
    }
    
    const orderItemsIds = [];
    let totalPrice = 0;
    
    // Loop through all user carts
    for (const userCart of userCarts) {
        // Loop through cart items in each cart
        for (const cartItem of userCart.items) {
            const { product_id, quantity } = cartItem;
    
            // Assuming product_id is the ID of the product in your OrderItemModel
            const newItem = await OrderItemModel.create({ quantity, product: product_id });
    
            orderItemsIds.push(newItem._id);
    
            // Update the total price based on the product price and quantity
            //    const price = (await newItem.populate('product')).product.price
            //    totalPrice+=price*quantity
        }
        totalPrice += userCarts[0].items[0].product_id.price *userCarts[0].items[0].quantity
    }
    
    // Additional order details
    const { city, phone, status, dateOrdered } = req.body;
    let user = await User.find({"_id":userId})
    // console.log(user);
    const newOrder = await orderModel.create({
        orderItemsIds,
        city: city,
        phone,
        status,
        totalPrice,
        user: userId,
        dateOrdered
    });
    
    // Populate order items for the response
    const order = await orderModel.findById(newOrder._id).populate('orderItemsIds');
    
    // Clear all user's carts after the order is created
    //await cartService.deleteMany({ user: userId });
    
    res.status(200).json({ data: order });
    
});


const cancelOrder=asyncHandler(async (req, res) => {
    const orderId = req.params.id;

    const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { $set: { status: 'canceled' } },
        { new: true }
    );

    if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order canceled successfully", data: updatedOrder });
})
 


module.exports = {
    getAllOrders,
    getOrderById,
    createNewOrder,
    cancelOrder,
    getUserOrder
}