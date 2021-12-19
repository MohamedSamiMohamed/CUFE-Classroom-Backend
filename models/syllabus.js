const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config()
const Joi = require('joi');
const { required } = require('joi');


let syllabusSchema = new mongoose.Schema({
    syllabus: [{
        week: {
            type: Number,
            min: 1,
            required: true
        },
        date: {
            type: Date,
            required: true,
            min: new Date(`${new Date().getFullYear()}-01-01`),
            max: new Date(`${new Date().getFullYear() + 1}-12-30`),
        },
        lectureTopic: {
            type: String,
            min: 5,
            max: 50,
            required: true
        },
        readings: {
            type: String,
            min: 5,
            max: 200,
        }
    }]
})

function validateSyllabus(syallabus) {
    const schema = Joi.object({
        syllabus: Joi.array().items(Joi.object({
            week: Joi.number().min(1),
            date: Joi.date().max(`${new Date().getFullYear() + 1}-12-30`).iso().messages({ 'date.format': `Date format is YYYY-MM-DD`, 'date.max': `exceeding max date` }).required(),
            lectureTopic: Joi.string().min(5).max(50).required(),
            readings : Joi.string().min(5).max(200).required()
        })
        )
    });
    return schema.validate(syallabus)
}

let Syllabus = mongoose.model("syllabus", syllabusSchema)
exports.Syllabus = Syllabus
exports.validateSyllabus = validateSyllabus