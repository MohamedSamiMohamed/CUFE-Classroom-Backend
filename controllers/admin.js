
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
    if(learner.type!='learner') return res.status(400).send("Sorry, This operation is valid only for learners")
    
}