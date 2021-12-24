const { User, Instructor } = require("../models/user")
const _ = require('lodash');

exports.getMe = async (req, res) => {
    if (req.user.role === "instructor") {
        let instructor = await Instructor.findById(req.user._id).populate('courses','-instructor -qa -weeks')
        if (!instructor) return res.status(404).send("sorry, something wrong has been occured")
        return res.send(_.pick(instructor, ['_id','userName', 'email', 'firstName', 'lasName', 'type', 'birthDate', 'courses']))
    }
    else if(req.user.role === "admin"){
        let admin = await User.findById(req.user._id).populate('courses','-instructor -qa -weeks')
        if (!admin) return res.status(404).send("sorry, something wrong has been occured")
        return res.send(_.pick(admin, ['_id','userName', 'email', 'firstName', 'lasName', 'type', 'birthDate', 'courses']))
    }
    else {
        let user = await User.findById(req.user._id)
        if (!user) return res.status(404).send("sorry, something wrong has been occured")
        return res.send(_.pick(user, ['_id','userName', 'email', 'firstName', 'lasName', 'type', 'birthDate']))
    }
}

exports.getUser = async (req, res) => {
    let user = await User.findById(req.params.id)
    if(!user) return res.status(404).send("No user is found with this ID")
    if(user.type === "instructor"|| user.type == "admin"){
    user = await user.populate('courses','-instructor -qa -weeks')
    return res.send(_.pick(user, ['userName', 'email', 'firstName', 'lasName', 'type', 'birthDate', 'courses']))
    }
    else{
        return res.send(_.pick(user, ['userName', 'email', 'firstName', 'lasName', 'type', 'birthDate']))
    }
}

exports.updateInfo = async(req,res)=>{

}