const mongoose = require('mongoose');
const { Course } = require('../models/course')
const { CourseWeek } = require('../models/courseWeek')
const _ = require('lodash');
const {QA} = require('../models/qa')
const Fawn = require("fawn")
require("dotenv")
// Fawn.init(process.env.FAWN_MONGODB_CONNECTION_STRING, "TempForFawn")


exports.addCourse = async (req, res) => {
    let course = await Course.findOne({ code: req.body.code })
    if (course) return res.status(400).send("There is existing course with this code, please check the course code and make it unique")
    course = new Course(_.pick(req.body, ['code', 'name', 'about']))
    course.instructor = req.user._id
    let qaSection = new QA({
        course : course._id
    })
    course.qa=qaSection._id
    try {
        await Fawn.Task().save('courses',course).save('qas', qaSection).run()
        return res.status(201).send("The course has been created successfully")
    }
    catch (err) {
        throw new Error(err.message)
    }
}

exports.addWeek = async (req,res)=>{
    let course = await Course.findById(req.params.id)
    if(!course) return res.status(404).send("No course is found with this ID")
    console.log(req.user)
    if(req.user.role === "instructor" && (req.user._id!=course.instructor)) return res.status(403).send("you must be the einstructor of the course to be able to add weeks")
    let week = new CourseWeek()
    let weeksNum = course.weeks.length
    course.weeks.push({
        weekNum : weeksNum+1,
        id : week._id
    })
    try {
        await Fawn.Task().save('courseweeks',week).update('courses', {_id : course._id},{$set :{weeks : course.weeks}}).run()
        return res.status(201).send(`week ${weeksNum+1} has been added to this course, you can start pushing materials to it!`)
    }
    catch (err) {
        throw new Error(err.message)
    }
}