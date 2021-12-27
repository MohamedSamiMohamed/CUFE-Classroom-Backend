
const mongoose = require('mongoose');
const { Activity } = require('../models/activity')
const { CourseWeek } = require("../models/courseWeek")
const _ = require('lodash');
const Fawn = require("fawn");
const { Course } = require('../models/course');
const { Instructor, User } = require('../models/user');


exports.toggleLearnerRole = async (req,res)=>{
    let learnerID = req.params.id
    let learner  = await User.findById(learnerID)
    if(!learner) return res.status(404).send("Sorry, we can't find any user with the given ID")
    if(learner.type!='learner') return res.status(400).send("Sorry, This operation is valid only for learners")
    let instructor  = new Instructor(learner)
    instructor.type = 'instructor'
    try {
        await Fawn.Task().remove('users', {_id: learner._id}).save('users',instructor).run()
        return res.status(200).send("The student has been promoted to be instructor successfully")
      }
      catch (err) {
          console.log(err)
        throw new Error(err.message)
      }
}

// exports.deleteCourse = async (req,res)=>{
// let course  =  await Course.findByIdAndRemove(req.params.id)
// console.log(course)
// }


// exports.deleteInstructor = async(req,res)=>{

// }

// exports.deleteStudent = async(req,res)=>{

// }


