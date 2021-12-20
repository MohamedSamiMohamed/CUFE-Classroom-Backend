const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config()
const Joi = require('joi');

let courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        min : 4,
        max : 10
    },
    name: {
        type: String,
        required: true,
        min: 4,
        max: 20,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    qa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qa',
        required: false,
    },
    about: {
        type: String,
        required : true,
        min : 20,
    },
    syllabus : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'syllabus',
        required: false,
    },
    weeks : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'courseWeek',
        required: true,
        default : []
    },
    weeksNum : {
        type : Number,
        required : true,
        default : 0
    }
})






const Course = mongoose.model('course', courseSchema);


function validateCourse(course) {
    const schema = Joi.object({
        code : Joi.string().alphanum().min(4).max(10).required(),
        name : Joi.string().min(4).max(20).required(),
        about : Joi.string().min(20).required(),
    });
    return schema.validate(course)
}

exports.Course = Course
exports.validateCourse = validateCourse
