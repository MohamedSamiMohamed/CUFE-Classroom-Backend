
const mongoose = require('mongoose');
const { Activity } = require('../models/activity')
const { CourseWeek } = require("../models/courseWeek")
const _ = require('lodash');
const Fawn = require("fawn");
const { Course } = require('../models/course');
const { Instructor } = require('../models/user');



exports.addVideo = async (req, res) => {
  let youtubeMaterial = new Activity(_.pick(req.body, ['description', 'url']))
  youtubeMaterial.type = "youtube"
  try {
    await Fawn.Task().save('activities', youtubeMaterial).update('courseweeks',
      { _id: req.courseWeek }, { $push:{youtube:youtubeMaterial._id } } ).run()
    return res.status(200).send("The video has been added successfully to your course")
  }
  catch (err) {
    throw new Error(err.message)
  }
}

exports.validateMaterialUploading = async(req,res,next) =>{
  let weekID = req.params.week
  let courseID = new mongoose.Types.ObjectId(req.params.course)
  let course = await Course.findById(courseID)
  if(!course) return res.status(404).send("sorry, Can't find this course")
  let courseWeek = await CourseWeek.findById(weekID)
  if (!courseWeek) return res.status(404).send("This week doesn't exist!")
  if (course.instructor != req.user._id && req.user.role != "admin") {
    return res.status(403).send("you must be the instructor of the course to add activities to it")
  }
  req.courseWeek = courseWeek._id
  if(req.params.description){
    req.description = req.params.description
  }
  next()
}

exports.addPdf = async (req,res)=>{
  if(!req.file){
   return res.status(400).send("something went very wrong,check your request and send it again")
  }
  let pdfMaterial = new Activity({
    description : req.description,
    url : req.file.location,
    type: "pdf"
  })

  try {
    await Fawn.Task().save('activities', pdfMaterial).update('courseweeks',
      { _id: req.courseWeek }, { $push:{pdf:pdfMaterial._id } } ).run()
    return res.status(200).send("The pdf has been added successfully to your course")
  }
  catch (err) {
    throw new Error(err.message)
  }
}

exports.getAllMaterials = async(req,res)=>{
  let weekID = req.params.week
  let courseID =req.params.course
  let course = await Course.findById(courseID)
  if(!course) return res.status(404).send("sorry, Can't find this course")
  let courseWeek = await CourseWeek.findById(weekID).select("-_id")
  if (!courseWeek) return res.status(404).send("This week doesn't exist!")
  let result  = await courseWeek.populate('youtube pdf','-_id -type')
  return res.status(200).send(result)
}

exports.getPdfs = async(req,res)=>{
  let weekID = req.params.week
  let courseID =req.params.course
  let course = await Course.findById(courseID)
  if(!course) return res.status(404).send("sorry, Can't find this course")
  let courseWeek = await CourseWeek.findById(weekID).select("-_id -youtube")
  if (!courseWeek) return res.status(404).send("This week doesn't exist!")
  let result  = await courseWeek.populate('pdf','-_id -type')
  return res.status(200).send(result) 
}

exports.getYoutube = async(req,res)=>{
  let weekID = req.params.week
  let courseID =req.params.course
  let course = await Course.findById(courseID)
  if(!course) return res.status(404).send("sorry, Can't find this course")
  let courseWeek = await CourseWeek.findById(weekID).select("-_id -pdf")
  if (!courseWeek) return res.status(404).send("This week doesn't exist!")
  let result  = await courseWeek.populate('youtube','-_id -type')
  return res.status(200).send(result) 
}