const mongoose = require('mongoose');
require('dotenv').config()
dbDebugger = require('debug')('db')
const Fawn = require("fawn")

Fawn.init(process.env.FAWN_MONGODB_CONNECTION_STRING, "TempForFawn")
exports.connectDB = () => {
  mongoose.connect(process.env.CUFE_CLASSROOM_DB_CONNECTION_STRING,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => dbDebugger('Connected to MongoDB...'))
    .catch(err => dbDebugger('Could not connect to MongoDB...' + err.message));
}