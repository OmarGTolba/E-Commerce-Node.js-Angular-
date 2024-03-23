const crypto = require('crypto')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 512,
    required: true,
  },
  cart: {},
  email: {
    type: String,
    minLength: 3,
    maxLength: 512,
    required: true,
  },
  address: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  passwordHash: {
    type: String,
    minLength: 3,
    maxLength: 512,
  },
  role: {
    type: String,
    enum: ['Admin', 'User'],
    default: 'User',
  },
  FavProduct: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  // passwordResetToken: {
  //   type: String,
  // },
  // passwordResetTokenExpires: {
  //   type: String,
  // },
})
// userSchema.methods.createResetPassToken = function () {
//   const resetToken = crypto.randomBytes(32).toString('hex'); // Convert buffer to hexadecimal string

//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');

//   this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiration
//   console.log(
//     this.passwordResetToken,
//     Date.now(),
//     this.passwordResetTokenExpires
//   );
//   return resetToken;
// };

const User = mongoose.model('User', userSchema);

module.exports =  User ;