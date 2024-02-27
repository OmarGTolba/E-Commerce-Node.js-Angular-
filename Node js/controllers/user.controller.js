const {
  cretateNewUser,
  findUserService,
} = require('../services/user.service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const { validateAddUsers } = require('../validation/user.validator')

const createNewUse = async (req, res) => {
  const { error } = validateAddUsers(req.body)
  if (error) {
    res.status(400).send({ message: error })
    return
  }
  const { name, email, password, role } = req.body
  if (!email || !name) {
    return res.send('Invalid')
  }
  const user = await findUserService(email)
  if (user) {
    res.send({ message: 'this email is already exist..' })
  } else {
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await cretateNewUser({ name, email, passwordHash, role })
    res.send(newUser)
    console.log(newUser)
  }
}

const updateUser = async (req, res) => {
  const token = req.headers["jwt"]

  const { password } = req.body
  const { error } = validateAddUsers(req.body)
  if (error) {
    res.status(400).send({ message: error })
    return
  }

  if (!token) {
    return res.status(401).send({ "message": "un authorized user" })
  }
  const payLoad = await jwt.verify(token, "myjwtsecret")
  const { email } = payLoad;
  const user = await User.findOne({ email })
  if (!user) {
    res.status(404).send(`there is no user with id ${req.params.id}`); return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const Updates = await User.updateOne({ email }, { email: email, passwordHash: passwordHash });

  res.send(Updates)
}

const findAllUsers = async (req, res) => {
  const users = await User.find()
  res.send(users)
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(422).send({ message: 'wrong email or password!' })

    const user = await findUserService(email)
    if (!user)
      return res.status(401).send({ message: 'Incorret email or password...' })
    if (user.role == 'Admin') {
    }
    const { role, _id } = user

    const isValidPassword = await bcrypt.compare(password, user.passwordHash)

    if (!isValidPassword)
      return res.status(401).send({ message: 'Incorret email or password...' })

    const token = jwt.sign({ email }, 'myjwtsecret', { expiresIn: '1h' })
    res.header({ jwt: token }).send({ token, email, role, _id })
  } catch (userLoginError) {
    res.status(500).send(userLoginError.message)
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ _id: id })
  res.send(user)
}


module.exports = {
  createNewUse,
  login,
  findAllUsers,
  updateUser,
  getUserById,
}
