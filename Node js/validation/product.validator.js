const joi =require('joi');

const validateAddProduct=(user)=>{
    const schema=joi.object({
        name_en:joi.string().min(3).max(60).required(),
        name_ar:joi.string().min(3).max(60).required(),
        description_en:joi.string().min(5).required(),
        description_ar:joi.string().min(5).required(),
        images: joi.array().items(joi.string()),
        brand_en: joi.string(),
        brand_ar: joi.string(),
        countInStock:joi.required(),
        price:joi.number().required(),
        categories:joi.string().required(),
        isFeatured: joi.string()
    })
    return schema.validate(user)
}

module.exports={validateAddProduct}