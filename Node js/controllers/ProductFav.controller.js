const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const Product = require('../models/product.model')


const getUserFavProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await User.findOne({ _id: id }).populate('FavProduct')
    if (!user) {
        res.status(404).send(`there is no user with id ${req.params.id}`)
        return
    }
    res.send(user.products)
})
const AddNewFavProduct = asyncHandler(async (req, res) => {
    const { userId, id } = req.params

    const product = await Product.findOne({ _id: id })
    const user = await User.findOne({ _id: userId })
    if (!product) {
        res.status(404).send(`there is no product with id ${req.params.id}`)
        return
    }
    favourites = user.FavProduct
    favourites.push(id)
    const Updates = await User.updateOne({ _id: userId }, { FavProduct: favourites });

    res.send(Updates)
})

const DelFromFav = asyncHandler(async (req, res) => {
    const { userId, id } = req.params

    const product = await Product.findOne({ _id: id })

    if (!product) {
        res.status(404).send(`there is no product with id ${req.params.id}`)
        return
    }

    const user = await User.findOne({ _id: userId })
    favourites = user.FavProduct

    const index = favourites.indexOf(id);

    if (index !== -1) {
        favourites.splice(index, 1);
        await User.updateOne({ _id: userId }, { FavProduct: favourites });
        res.status(200).send("Product removed from favorites successfully");
    } else {
        res.status(404).send("Product not found in favorites");
    }
})




module.exports = {
    getUserFavProduct,
    AddNewFavProduct,
    DelFromFav,

}
