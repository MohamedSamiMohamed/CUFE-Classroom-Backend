
require('dotenv').config()
const express = require('express');
const auth = require('../routes/authentication')
const baseApiURl = `${process.env.API_BASE_URL}/v${process.env.API_VERSION}`
const error = require('../middlewares/error');
module.exports = (app) => {
    app.use(express.json());
    app.use(`${baseApiURl}/auth`, auth)
    app.use(error)
}