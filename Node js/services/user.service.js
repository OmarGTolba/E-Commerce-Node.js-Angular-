const User = require('../models/user.model')

const cretateNewUser = async (user) => {
  try {
    return await User.create(user)
  } catch (err) {
    console.log(err)
    return
  }
}
const findUserService = async (email) => {
  return await User.findOne({ email })
}
const getAllUsers = async () => {
  return await User.find()
}

module.exports = {
  cretateNewUser,
  getAllUsers,
  findUserService,
}
