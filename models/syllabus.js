const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config()
const Joi = require('joi');


let syllabusSchema = new mongoose.Schema({
    syllabus: [{
        week: {
            type: Number,
            min: 1,
            max: 15,
            required: true
        },
        date: {
            type: Date,
            required: true,
            min: new Date(`${new Date().getFullYear()}-01-01`),
            max: new Date(`${new Date().getFullYear() + 1}-12-30`),
        },
        lectureTopic: {
            type: String
        }
    }]
})

let Syllabus = mongoose.model("syllabusSchema",syllabusSchema)
exports.Syllabus = Syllabus