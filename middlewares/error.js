require('dotenv').config()
errorDebugger = require('debug')('error')
module.exports = (error, req, res, next) => {
    errorDebugger(error)
    res.status(500).send({
        error:'Internal server error. Something failed',
        errorDetails:error.message})
}