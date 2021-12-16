const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config()
const Joi = require('joi');

let courseWeekSchema = new mongoose.Schema({
    youtube: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref : 'activity',
        default: []
    },
    pdf: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref : 'activity',
        default: []
    }
})

let CourseWeek = mongoose.model("courseWeek",courseWeekSchema)

exports.CourseWeek = CourseWeek