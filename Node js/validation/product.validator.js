const joi =require('joi');

const validateAddProduct=(user)=>{
    const schema=joi.object({
        name:joi.string().min(3).max(60).required(),
        description:joi.string().min(5).max(100).required(),
        countInStock:joi.required(),
        price:joi.number().required(),
        categories:joi.string().required()
    })
    return schema.validate(user)
}

module.exports={validateAddProduct}