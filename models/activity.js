const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { JoiPasswordComplexity } = require('joi-password')
require('dotenv').config()
const Joi = require('joi')
require('mongoose-type-url');


let activitySchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        default : "material"
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


function validateYoutubeActivity(activity) {
    const schema = Joi.object({
        description: Joi.string().required(),
        url: Joi.string().regex(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/))((\w|-){11})(?:\S+)?$/).message({ 'any': 'the link must be a yotube embed lkink' }).required()
    });
    return schema.validate(activity)
}

function validatePdfActivity(activity) {
    const schema = Joi.object({
        description: Joi.string().required(),
        url: Joi.string().min(4).max(20).required()
    });
    return schema.validate(activity)
}
const Activity = mongoose.model('activity', activitySchema);
exports.Activity = Activity
exports.validateYoutubeActivity = validateYoutubeActivity
exports.validatePdfActivity = validatePdfActivity