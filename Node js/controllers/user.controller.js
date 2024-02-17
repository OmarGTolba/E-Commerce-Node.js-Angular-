const { cretateNewUser, getAllUsers, findUserService, getuserBooks, getUserProducts } = require("../services/user.service")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/user.schema")

const createNewUse =
    async (req, res) => {
        const { name, email, password, Products, role } = req.body
        if (!email || !name) {
            return res.send("Invalid")
        }
        const user = await findUserService(email)
        if (user) { res.send({ message: "this email is already exist.." }) }
        else {
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await cretateNewUser({ name, email, passwordHash, Products, role })
            res.send(newUser)
        }
    }


const updateUser = async (req, res) => {
    const token = req.headers["jwt"]
    console.log(token);
    if (!token) {
        return res.status(401).send({ "message": "un authorized user" })
    }
    const payLoad = await jwt.verify(token, "myjwtsecret")
    const { email } = payLoad;
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404).send(`there is no book with id ${req.params.id}`); return;
    }

    const Updates = await User.updateOne({ email }, req.body)
    res.send(Updates)
}


const findAllUsers = async (req, res) => {
    const users = await User.find()
    res.send(users)
}



const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(422).send({ message: "wrong email or password!" })

        const user = await findUserService(email);
        if (!user)
            return res.status(401).send({ message: "Incorret email or password..." })
        if (user.role == 'Admin') {

        }
        role=user.role
        const isValidPassword = await bcrypt.compare(password, user.passwordHash)

        if (!isValidPassword)
            return res.status(401).send({ message: "Incorret email or password..." })

        const token = jwt.sign({ email }, 'myjwtsecret', { expiresIn: '1h' });
        console.log(token);
        res.header({ jwt: token }).send({ token, email, role });
    }
    catch (userLoginError) {
        res.status(500).send(userLoginError.message)
    }
}


const getProducts = async (req,res)=>{   
    const token = req.headers["jwt"];
    const payLoad = await jwt.verify(token, "myjwtsecret")
    const { email } = payLoad;
    const userCourses = await User.findOne({email}).populate("Products")
    res.send(userCourses)
    }



module.exports = {
    createNewUse, login, findAllUsers, updateUser,getProducts
}