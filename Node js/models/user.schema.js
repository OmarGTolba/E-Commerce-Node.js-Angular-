const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 512,
    },
    cart:{
        
    },
    email: {
        type: String,
        minLength: 3,
        maxLength: 512,
        // Add email format validation if needed
    },
    passwordHash: {
        type: String,
        minLength: 3,
        maxLength: 512,
        // Use a secure password hashing algorithm (e.g., bcrypt)
    },
  
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    // Products: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Product',  // Ensure this matches the model name for your product
    //     },
    //   ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
