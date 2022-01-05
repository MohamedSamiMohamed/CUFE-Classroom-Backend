const { User, Instructor } = require("../models/user")
const _ = require('lodash');
const passwordHashing = require("../utils/passwordHashing");
const { setEmailOptions, sendConfirmationEmail } = require("../utils/email");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.signup = async (req, res) => {
    let user = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.userName }] })
    if (user) return res.status(400).send("This email or username has registered before")
    if (req.body.type === "instructor") {
        user = new Instructor(_.pick(req.body, ['userName', 'email', 'firstName', 'lastName', 'type', 'birthDate']))
    }
    else {
        user = new User(_.pick(req.body, ['userName', 'email', 'firstName', 'lastName', 'type', 'birthDate']))
    }
    user.password = await passwordHashing(req.body.password)
    user.confirmationToken = user.generateConfirmationToken()
    setEmailOptions(user)
    await sendConfirmationEmail(user.email)
    await user.save()
    return res.status(200).send(_.pick(user, ['firstName', 'lastName', 'userName', 'email', 'type']))
}

exports.verifyEmail = async (req, res) => {
    let payload
    try {
        payload = jwt.verify(req.query.confirmationToken, process.env.CONFIRMATION_TOKEN_PRIVATE_KEY)
    }
    catch (err) {
        throw new Error(err.message)
    }
    let user = await User.findByIdAndUpdate(payload._id, { isVerified: true }, { new: true })
    if (user) return res.status(200).send("This user is now verified")
    return res.status(404).send("user can not be found")
}

exports.login = async (req, res) => {
    let user = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.email }] })
    if (!user) return res.status(404).send("This user hasn't registered before, please signup first")
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password.')
    if (user.isVerified == false) {
        try {
            jwt.verify(user.confirmationToken, process.env.CONFIRMATION_TOKEN_PRIVATE_KEY)
            return res.status(400).send("This email isn't verified yet, Pleas check your inbox to verify")
        }
        catch (err) {
            res.status(400).send("Please verify your email, we will send another verification code as the previous one is expired. Check your inbox!")
            user.confirmationToken = user.generateConfirmationToken()
            setEmailOptions(user)
            await sendConfirmationEmail(user.email)
            await user.save()
        }
    }
    else {
        const token = user.generateAuthToken()
        user.token = token
        return res.status(200).header('x-auth-token', token).send(_.pick(user, ['_id', 'email', 'firstName', 'type','lastName', 'userName', 'token']))
    }

}