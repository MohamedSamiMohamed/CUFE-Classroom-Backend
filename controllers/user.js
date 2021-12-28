const { User, Instructor } = require("../models/user")
const _ = require('lodash');
const { setEmailOptions, sendConfirmationEmail } = require("../utils/email");

exports.getMe = async (req, res) => {
    if (req.user.role === "instructor") {
        let instructor = await Instructor.findById(req.user._id).populate('courses', '-instructor -qa -weeks')
        if (!instructor) return res.status(404).send("sorry, something wrong has been occured")
        return res.send(_.pick(instructor, ['_id', 'userName', 'email', 'firstName', 'lasName', 'type', 'birthDate', 'courses']))
    }
    else if (req.user.role === "admin") {
        let admin = await User.findById(req.user._id).populate('courses', '-instructor -qa -weeks')
        if (!admin) return res.status(404).send("sorry, something wrong has been occured")
        return res.send(_.pick(admin, ['_id', 'userName', 'email', 'firstName', 'lasName', 'type', 'birthDate', 'courses']))
    }
    else {
        let user = await User.findById(req.user._id)
        if (!user) return res.status(404).send("sorry, something wrong has been occured")
        return res.send(_.pick(user, ['_id', 'userName', 'email', 'firstName', 'lasName', 'type', 'birthDate']))
    }
}

exports.getUser = async (req, res) => {
    let user = await User.findById(req.params.id)
    if (!user) return res.status(404).send("No user is found with this ID")
    if (user.type === "instructor" || user.type == "admin") {
        user = await user.populate('courses', '-instructor -qa -weeks')
        return res.send(_.pick(user, ['_id', 'userName', 'email', 'firstName', 'lasName', 'type', 'birthDate', 'courses']))
    }
    else {
        return res.send(_.pick(user, ['_id', 'userName', 'email', 'firstName', 'lasName', 'type', 'birthDate']))
    }
}

exports.updateInfo = async (req, res) => {
    let conflictEmail = false
    let conflictUserName = false
    let success = false
    let user = await User.findById(req.user._id)
    if (!user) return res.status(404).send("sorry, something very wrong has been occured")
    for (key in req.body) {
        if (key == 'email') {
            let conflict = await User.findOne({ email: req.body[key] })
            if (conflict) {
                conflictEmail = true
                continue
            }
            else {
                user.isVerified = false
                user.confirmationToken = user.generateConfirmationToken()
                setEmailOptions(user)
                await sendConfirmationEmail(user.email)
            }
        }
        else if (key == 'userName') {
            conflict = await User.findOne({ userName: req.body[key] })
            if (conflict) {
                conflictUserName = true
                continue
            }
        }

        user[key] = req.body[key]
        success = true
    }
    if ((conflictEmail || conflictUserName) && success) {
        await user.save()
        return res.status(207).send({
            status: "partially successful",
            message: "Your information has been updated successfull except your userName/email as they are already registered before",
            user: _.pick(user, ['_id', 'email', 'firstName', 'lastName', 'userName', 'birthDate', 'isVerified'])
        })
    }
    else if ((conflictEmail || conflictUserName) && !success) {
        if (conflictEmail) {
            return res.status(400).send({
                status: "failure",
                message: "sorry the email you are trying to use is already registered",
                user: _.pick(user, ['_id', 'email', 'firstName', 'lastName', 'userName', 'birthDate', 'isVerified'])
            })
        }
        else if (conflictUserName) {
            return res.status(400).send({
                status: "failure",
                message: "sorry the userName you are trying to use is already taken",
                user: _.pick(user, ['_id', 'email', 'firstName', 'lastName', 'userName', 'birthDate', 'isVerified'])
            })
        }
    }
    else {
        await user.save()
        return res.status(200).send({
            status: "success",
            message: "Your info has been updated successfully",
            user: _.pick(user, ['_id', 'email', 'firstName', 'lastName', 'userName', 'birthDate', 'isVerified'])
        })
    }

}

exports.getUserByEmail = async (req, res) => {
    let user = await User.findOne({ $or: [{ email: req.body.email }, { userName: req.body.email }] })
    if (!user) return res.status(404).send("Sorry, we can't find any user with this email or username")
    if (user.type === "instructor" || user.type == "admin") {
        user = await user.populate('courses', '-instructor -qa -weeks')
        return res.status(200).send(_.pick(user, ['_id', 'userName', 'email', 'firstName', 'lasName', 'type', 'birthDate', 'courses']))
    }
    else {
        return res.status(200).send(_.pick(user, ['_id', 'userName', 'email', 'firstName', 'lasName', 'type', 'birthDate']))
    }
}