const mongoose = require('mongoose');
result = require('dotenv').config()
require('express-async-errors')
const morgan = require('morgan')
const express = require('express');
const serverDebugger = require('debug')('server')
const app = express();
let cors = require('cors')
require('./start-up/db')()
require('./start-up/routes')(app)

app.use(cors())
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}
const port = process.env.PORT || 3000;
app.listen(port, () => serverDebugger(`Listening on port ${port}...`));
