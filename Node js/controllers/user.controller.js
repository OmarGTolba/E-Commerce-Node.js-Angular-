const { cretateNewUser, findUserService } = require('../services/user.service')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const nodemailer = require('nodemailer')

const { validateAddUsers } = require('../validation/user.validator')

const createNewUse = async (req, res) => {
  const { error } = validateAddUsers(req.body)
  if (error) {
    res.status(400).send({ message: error })
    return
  }
  const { name, email, password, role, address, phone } = req.body
  if (!email || !name) {
    return res.send('Invalid')
  }
  const user = await findUserService(email)
  if (user) {
    res.status(409).send({ message: 'this email is already exist..' })
  } else {
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await cretateNewUser({
      name,
      email,
      passwordHash,
      role,
      address,
      phone,
    })
    res.send(newUser)
  }
}

const updateUser = async (req, res) => {
  const token = req.headers['jwt']

  const { password } = req.body
  const { error } = validateAddUsers(req.body)
  if (error) {
    res.status(400).send({ message: error })
    return
  }

  if (!token) {
    return res.status(401).send({ message: 'un authorized user' })
  }
  const payLoad = await jwt.verify(token, 'myjwtsecret')
  const { email } = payLoad
  const user = await User.findOne({ email })
  if (!user) {
    res.status(404).send(`there is no user with id ${req.params.id}`)
    return
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const Updates = await User.updateOne(
    { email },
    { email: email, passwordHash: passwordHash },
  )

  res.send(Updates)
}

const updateUserInfo = async (req, res) => {
  const token = req.headers['jwt']

  const { name, phone, address } = req.body

  if (!token) {
    return res.status(401).send({ message: 'unauthorized user' })
  }
  const payLoad = await jwt.verify(token, 'myjwtsecret')
  const { email } = payLoad
  const user = await User.findOne({ email })
  if (!user) {
    res.status(404).send(`there is no user with id ${req.params.id}`)
    return
  }
  const Updates = await User.updateOne({ email }, { name, phone, address })

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

    const token = jwt.sign({ email }, 'myjwtsecret', { expiresIn: '1d' })
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

const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(404).send('There is no user with this email')
  }
  const secret = 'myjwtsecret' + user.passwordHash
  const token = jwt.sign({ email: user.email, id: user._id }, secret, {
    expiresIn: '15m',
  })

  const link = `https://furniture-deployment.vercel.app/reset-password/${user._id}/${token}`
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  })

  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: user.email,
    subject: 'Reset password',
    html: `<div>
    <h3>Hello, <span style='color: #f8b810'>${user.name}</span></h3>
    <h4>Click on the link below to reset yor password</h4>
    <p>${link}</p>
    </div>`,
  }
  transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Email sent: ' + success.response)
    }
  })
  res.send('Check your email')
}

const getResetPassword = async (req, res) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(404).send('There is no user with this id')
  }
  const secret = 'myjwtsecret' + user.passwordHash
  try {
    jwt.verify(req.params.token, secret)
    const newPass = await bcrypt.hash(req.body.password, 10)
    await User.updateOne({ _id: req.params.id }, { passwordHash: newPass })
    res.status(200).send('Password reset successfully')
  } catch (err) {
    console.log(err)
    res.status(401).send('Expired token')
  }
}

module.exports = {
  createNewUse,
  login,
  findAllUsers,
  updateUser,
  getUserById,
  updateUserInfo,
  forgotPassword,
  getResetPassword,
}
