const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 512,
        required: true
    },
    cart:{
        
    },
    email: {
        type: String,
        minLength: 3,
        maxLength: 512,
        required: true
    },
    passwordHash: {
        type: String,
        minLength: 3,
        maxLength: 512,
    },
    role: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
