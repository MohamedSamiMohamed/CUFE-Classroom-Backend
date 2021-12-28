const Joi = require('joi');
const mongoose = require('mongoose');


let commentSchema = new mongoose.Schema({
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    userName: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
        min: 1,
    }
}, { timestamps: true })

const Comment = mongoose.model('comment', commentSchema)


function validateComment(comment) {
    const schema = Joi.object({
        text: Joi.string().min(1).required()
    });
    return schema.validate(comment)
}


exports.Comment = Comment
exports.commentSchema = commentSchema
exports.validateComment = validateComment