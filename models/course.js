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
        unique: true
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
        unique: true
    },
    weeks : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'courseWeek',
        required: true,
        unique: true,
        default : []
    },
    weeksNum : {
        type : Number,
        min : 4,
        max : 24,
        required : true,
        default : 4
    }
})






const Course = mongoose.model('course', courseSchema);


function validateCourse(course) {
    const schema = Joi.object({
        code : Joi.string().alphanum().min(4).max(10).required(),
        name : Joi.string().min(4).max(20).required(),
        aboud : Joi.string().min(20).required().message({
            'string.empty': `"about" cannot be an empty field`,
        }),
        weeks : Joi.number().min(4).max(24).required()
    });
    return schema.validate(course)
}

exports.Course = Course
exports.validateCourse = validateCourse
