
require('dotenv').config()
const express = require('express');
const auth = require('../routes/authentication')
const course = require('../routes/course')
const syllabus = require('../routes/syllabus')
const thread = require('../routes/thread')
const user = require('../routes/user')
const baseApiURl = `${process.env.API_BASE_URL}/v${process.env.API_VERSION}`
const error = require('../middlewares/error');
module.exports = (app) => {
    app.use(express.json());
    app.use(`${baseApiURl}/auth`, auth)
    app.use(`${baseApiURl}/course`,course)
    app.use(`${baseApiURl}/syllabus`,syllabus)
    app.use(`${baseApiURl}/thread`,thread)
    app.use(`${baseApiURl}/user`,user)
    app.use(error)
}