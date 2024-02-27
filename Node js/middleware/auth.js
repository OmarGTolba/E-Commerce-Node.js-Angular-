const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const auth = async (req, res, next) => {
  try {
    const token = req.headers['jwt']
    console.log(token)
    if (!token) {
      return res.status(401).send({ message: 'un authorized user' })
    }
    const payLoad = await jwt.verify(token, 'myjwtsecret')
    const { email } = payLoad
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).send({ message: 'un authorized user' })
    }
    next()
  } catch (err) {
    return res.status(401).send({ message: 'un authorized user' })
  }
}

module.exports = { auth }
