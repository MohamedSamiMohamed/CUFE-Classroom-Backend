const mongoose = require('mongoose');
const _ = require('lodash');
const Fawn = require("fawn");
const { Thread } = require("../models/thread")
const { Comment } = require("../models/comment")
const { QA } = require('../models/qa')
const Pusher = require('pusher');
const { User } = require('../models/user');
require("dotenv")

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});
// get the comments and the question of specific thread
exports.getThread = async (req, res) => {
    let thread = await Thread.findById(req.params.id)
    if (!thread) return res.status(404).send("Sorry, No Thread found with the given ID")
    thread = await thread.populate('answers','-__v -_id')
    return res.send(thread)   
}

// get all threads (don't populate comments here)
exports.getThreads = async (req, res) => {
 let qa = await QA.findById(req.params.id).select("-course")
 if (!qa) return res.status(404).send("Sorry, No QA section has been found with this ID")
 let threads = await qa.populate('threads','-__v')
 return res.send(threads)
}


exports.startThread = async (req, res) => {

    let qa = await QA.findOne({ _id: req.params.id })
    if (!qa) return res.status(404).send("sorry, No QA section has been found with this ID")
    let thread = new Thread()
    let user = await User.findOne({userName : req.user.userName})
    thread.question = req.body
    thread.question.name = `${user.firstName} ${user.lastName}`
    thread.question.userName = req.user.userName
    thread.qa = req.params.id
    const result = await thread.save()
    pusher.trigger("threadChannel", "question", result)
    return res.status(200).send("The thread has been created successfully")
}

exports.postComment = async (req, res) => {

    let thread = await Thread.findById(req.params.id)
    if (!thread) return res.status(404).send("Sorry, No Thread found with the given ID")
    let user = await User.findOne({userName : req.user.userName})
    let comment = new Comment(_.pick(req.body, ['text']))
    comment.name = `${user.firstName} ${user.lastName}`
    comment.thread = thread._id
    comment.userName = req.user.userName
    const reuslt = await comment.save()
    pusher.trigger("threadChannel", "answer", reuslt)
    return res.status(200).send("The comment has been added successfully")

}
