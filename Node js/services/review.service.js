const Rating = require("../models/rating.model");
const Review = require("../models/review.model");

const addReview = async(review)=>{
    try{
        return await Review.create(review)
    }catch(err){
        console.log(err);
    }
}

const showReview = async(id)=>{
    return await Review.find({prdId: id})
}

const showRating = async(id)=>{
    return await Rating.find({prdId: id})
}

module.exports={
    addReview,
    showReview,
    showRating
}