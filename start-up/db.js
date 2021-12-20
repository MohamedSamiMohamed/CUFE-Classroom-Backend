const mongoose = require('mongoose');
require('dotenv').config()
dbDebugger = require('debug')('db')
const Fawn = require("fawn")
require("dotenv")
Fawn.init(process.env.FAWN_MONGODB_CONNECTION_STRING, "TempForFawn")

module.exports = () => {
  mongoose.connect(process.env.CUFE_CLASSROOM_DB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => dbDebugger('Connected to MongoDB...'))
    .catch(err => dbDebugger('Could not connect to MongoDB...'+err.message));
    }