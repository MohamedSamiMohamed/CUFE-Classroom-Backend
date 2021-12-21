const { User, Instructor } = require("../models/user")
const _ = require('lodash');
const passwordHashing = require("../utils/passwordHashing");
const { setEmailOptions, sendConfirmationEmail } = require("../utils/email");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.getMe = async (req, res) => {
    if (req.user.type === "instructor") {
        let instructor = await Instructor.findById(req.user._id)
        if (!instructor) return res.status(404).send("sorry, something wrong has been occured")
        return res.send(_.pick(instructor, ['userName', 'email', 'firstName', 'lasName', 'type', 'birthDate', 'courses']))
    }
    else {
        let user = await User.findById(req.user._id)
        if (!user) return res.status(404).send("sorry, something wrong has been occured")
        return res.send(_.pick(user, ['userName', 'email', 'firstName', 'lasName', 'type', 'birthDate']))
    }
}

exports.getUser = async (req, res) => {
    let user = await User.findById(req.params._id)
    if(!user) return res.status(404).send("No user is found with this ID")
    if(user.type === "instructor"){
    return res.send(_.pick(instructor, ['userName', 'email', 'firstName', 'lasName', 'type', 'birthDate', 'courses']))
    }
    else{
        return res.send(_.pick(instructor, ['userName', 'email', 'firstName', 'lasName', 'type', 'birthDate']))
    }
}