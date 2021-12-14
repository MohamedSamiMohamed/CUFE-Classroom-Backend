const mongoose = require('mongoose');
result = require('dotenv').config()
require('express-async-errors')
const morgan = require('morgan')
const express = require('express');
const serverDebugger = require('debug')('server')
const app = express();
let cors = require('cors')
require('./start-up/db')();


app.use(cors())
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}
const port = process.env.PORT || 3000;
app.listen(port, () => serverDebugger(`Listening on port ${port}...`));

// let user = new Learner({
//     userName:"Mohamed1",
//     firstName: "test",
//     lastName : "test",
//     email : "test@tst.com",
//     password : "abcdeF91",
//     type : "admin",
//     birthDate : "01-01-2002",
//     confirmationToken: "abc1"
// })

// user.save().then(()=>{console.log("saved")}).catch(err => console.log(err.message))
        