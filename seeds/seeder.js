const faker = require("faker");
const mongoose = require('mongoose');
const { User, Instructor } = require("../models/user");
let dropDB = require('../utils/dropDB')
const userSeed = require('./data/user');
require('dotenv').config({
    path: `./.env.${process.env.NODE_ENV}`
})



async function seedDB(){
    require('../start-up/db').connectDB()
    await dropDB()
    require('../start-up/db').connectDB()
    console.log('Running seeds, please wait...');
    const {learners,instructors,admin} = userSeed.seedUsers()
    const learnersDocs = await User.create(learners)
    const instructorsDocs = await Instructor.create(instructors)
    const adminDoc  = await User.create(admin)

    // await User.insertMany(learnersDocs)    
    // await Instructor.insertMany(instructorsDocs)
    // await adminDoc.save()
    console.log('✅ Seeds executed successfully');
    process.exit(1)
}

seedDB()