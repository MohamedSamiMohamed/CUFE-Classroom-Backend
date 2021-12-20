const mongoose = require('mongoose');
const validator = require('validator');
require('dotenv').config()
const {validateComment } = require('./comment')


let questionSchema = new mongoose.Schema({
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
}, { timestamps: true , _id : false})



let threadSchema = new mongoose.Schema({
    qa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qa',
        required: true
    },
    question: questionSchema,
})

threadSchema.virtual('answers', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'thread'
})
const Thread = mongoose.model('thread', threadSchema)
exports.Thread = Thread
exports.validateThread = validateComment
