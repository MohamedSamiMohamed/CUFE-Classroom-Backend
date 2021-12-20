const mongoose = require('mongoose');
const { Syllabus } = require('../models/syllabus')
const _ = require('lodash');
const { Course } = require('../models/course');
const Fawn = require("fawn")
require("dotenv")


exports.addSyllabus = async (req, res) => {
    let course = await Course.findOne({ _id: req.params.id })
    if (!course) return res.status(404).send("No course found with this id")
    if (course.syllabus != null) return res.status(400).send("This course already has a syllabus")
    let syllabus = new Syllabus(req.body)
    try {
        await Fawn.Task().update('courses', { _id: course._id }, { syllabus: syllabus._id }).save('syllabuses', syllabus).run()
        return res.status(201).send("This syllabus has been created for the course successfully!")
    }
    catch (err) {
        throw new Error(err.message)
    }
}
