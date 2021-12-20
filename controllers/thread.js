const mongoose = require('mongoose');
const _ = require('lodash');
const Fawn = require("fawn");
const { Thread } = require("../models/thread")
const { Comment } = require("../models/comment")
const { QA } = require('../models/qa')
require("dotenv")


exports.startThread = async (req, res) => {
    let qa = await QA.findOne({ _id: req.params.id })
    if (!qa) return res.status(404).send("sorry, No QA section has been found with this ID")
    let thread = new Thread()
    thread.question = req.body
    thread.question.userName = req.user.userName
    thread.qa = req.params.id
    await thread.save()
    res.status(200).send(thread)
}

exports.addComment = async (req, res) => {

}
