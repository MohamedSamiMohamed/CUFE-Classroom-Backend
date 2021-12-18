const mongoose = require('mongoose');
const { Course } = require('../models/course')
const { CourseWeek } = require('../models/courseWeek')
const _ = require('lodash');

exports.addCourse = async (req, res) => {
    let course = await Course.findOne({ code: req.body.code })
    if (course) return res.status(400).send("There is existing course with this code, please check the course code and make it unique")
    course = new Course(_.pick(req.body, ['code', 'name', 'about']))
    course.instructor = req.user._id
    // let weeks = []
    // for (i = 0; i < req.body.weeksNum; i++) {
    //     let week = await new CourseWeek()
    //     weeks.push(week)
    //     course.weeks.push(week._id)
    // }
    // best practise is to use transaction but it seems sucks for mongodb
    // weeks.forEach(async (week) => {
    //     await week.save()
    // })
    await course.save()
    return res.status(200).send("The course has been created successfully")

    //     const session = await mongoose.startSession()
    //     try {
    //     await session.withTransaction(async()=>{
    //         const opts = { session };
    //         weeks.forEach(async(week) => {
    //             await week.save(opts)
    //         })
    //         await course.save(opts)
    //         console.log("course saved")
    //         return res.status(200).send("The course has been created successfully")
    //     })
    // }
    // catch(err){
    //     throw new Error(err.message)
    // }
}
exports.addSyllabus = async (req, res) => {

}

exports.addWeek = async (req,res)=>{

}