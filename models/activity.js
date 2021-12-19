const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { JoiPasswordComplexity } = require('joi-password')
require('dotenv').config()
const Joi = require('joi')
require('mongoose-type-url');


const options = { discriminatorKey: 'activityType' };
let activitySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    url: {
        type: mongoose.SchemaTypes.Url,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: {
            values: ["youtube", "pdf"],
            message: '{VALUE} is not a supported type'
        }
    }
})


const Activity = mongoose.model('activity', activitySchema);
exports.Activity = Activity

