require('dotenv').config({
    path: `./.env.${process.env.NODE_ENV}`
})

require('express-async-errors')
const morgan = require('morgan')
var multer = require('multer');
const express = require('express');
const serverDebugger = require('debug')('server')
const app = express();
let cors = require('cors');
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}
require('./start-up/db').connectDB()
require('./start-up/routes')(app)
app.use(express.urlencoded({ extended: true }));
app.use(cors())
const port = process.env.PORT || 3000;
app.listen(port, () => serverDebugger(`Listening on port ${port}...`));
