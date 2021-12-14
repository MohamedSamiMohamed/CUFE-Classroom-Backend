const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config()
const Joi = require('joi');

let courseSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        min : 4,
        max : 10,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    learners: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        default: []
    },
    qa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qa',
        required: false,
        unique : true
    }
})




const Course = mongoose.model('course', courseSchema);


function validateCourse(course) {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        firstName: Joi.string()
            .alphanum()
            .required()
            .min(3)
            .max(15),
        lastName: Joi.string()
            .alphanum()
            .required()
            .min(3)
            .max(15),
        // abcdeF91 is correct 
        password: JoiPasswordComplexity.string()
            .min(8)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .required(),
        confirmPassword: Joi.string()
            .required()
            .equal(Joi.ref('password'))
            .messages({ 'any.only': 'confirmed password does not match password' }),
        type: Joi.string().valid("admin", "learner", "instructor").required(),
        birthDate: Joi.date().max('01-01-2004').iso().messages({ 'date.format': `Date format is YYYY-MM-DD`, 'date.max': `Age must be +17` }).required(),

    });
    return schema.validate(course)
}
