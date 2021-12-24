const mongoose = require('mongoose');
const { Course } = require('../models/course')
const { CourseWeek } = require('../models/courseWeek')
const _ = require('lodash');
const { QA } = require('../models/qa')
const Fawn = require("fawn");
const { response } = require('express');
const { User } = require('../models/user');
require("dotenv")
// Fawn.init(process.env.FAWN_MONGODB_CONNECTION_STRING, "TempForFawn")


exports.addCourse = async (req, res) => {
    let course = await Course.findOne({ code: req.body.code })
    if (course) return res.status(400).send("There is existing course with this code, please check the course code and make it unique")
    let instructor = await User.findById(req.user._id)
    if(!instructor) return res.status(500).send("something went very wrong")
    course = new Course(_.pick(req.body, ['code', 'name', 'about']))
    instructor.courses.push(course._id)
    course.instructor = req.user._id
    let qaSection = new QA({
        course: course._id
    })
    course.qa = qaSection._id
    try {
        await Fawn.Task().save('courses', course).save('qas', qaSection).update('users',{_id:instructor._id},{courses: instructor.courses}).run()
        return res.status(201).send("The course has been created successfully")
    }
    catch (err) {
        throw new Error(err.message)
    }
}

exports.addWeek = async (req, res) => {
    let course = await Course.findById(req.params.id)
    if (!course) return res.status(404).send("No course is found with this ID")
    console.log(req.user)
    // admin can add weeks to any course
    if (req.user.role === "instructor" && (req.user._id != course.instructor)) return res.status(403).send("you must be the einstructor of the course to be able to add weeks")
    let week = new CourseWeek()
    let weeksNum = course.weeks.length
    course.weeks.push({
        weekNum: weeksNum + 1,
        id: week._id
    })
    try {
        await Fawn.Task().save('courseweeks', week).update('courses', { _id: course._id }, { $set: { weeks: course.weeks } }).run()
        return res.status(201).send(`week ${weeksNum + 1} has been added to this course, you can start pushing materials to it!`)
    }
    catch (err) {
        throw new Error(err.message)
    }
}

exports.getCourse = async (req, res) => {
    let course = await Course.findById(req.params.id)
    if (!course) return res.status(404).send("No course is found with this ID")
    course = await course.populate("instructor", '-isVerified -confirmationToken -__v -password')
    course.weeksNum = course.weeks.length
    return res.status(200).send(course)
}

exports.getAllCourses = async (req, res) => {
    let courses = await Course.find().select({ code: 1, name: 1, about: 1, instructor: 1, _id: 0 }).populate("instructor", "-_id -userType firstName lastName userName")
    return res.status(200).send(courses)
}