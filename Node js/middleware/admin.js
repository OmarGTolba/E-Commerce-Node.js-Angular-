const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const admin = async (req, res, next) => {
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
    if (user.role == 'Admin') {
      next()
    } else {
      res.send('only Admin')
    }
  } catch (err) {
    return res.status(401).send({ message: 'un authorized user' })
  }
}

module.exports = { admin }
