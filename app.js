const mongoose = require('mongoose');
// const {CourseWeek} = require('./models/courseWeek')
require('dotenv').config()
require('express-async-errors')
const morgan = require('morgan')
const express = require('express');
const serverDebugger = require('debug')('server')
const app = express();
let cors = require('cors')
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}
require('./start-up/db')()
require('./start-up/routes')(app)
app.use(cors())
const port = process.env.PORT || 3000;
app.listen(port, () => serverDebugger(`Listening on port ${port}...`));

// async function createCourse(){
//     let courseWeek = await new CourseWeek()
//     console.log(courseWeek)
// }

// createCourse()