require('dotenv').config({
    path: `./.env.${process.env.NODE_ENV}`
})

const faker = require("faker");
const mongoose = require('mongoose');
const { User, Instructor } = require("../models/user");
let dropDB = require('../utils/dropDB')
const userSeed = require('./data/user');
const courseSeed = require('./data/course')
const qaSeed = require('./data/qa')
const syllabusSeed = require('./data/syllabus')
const courseWeekSeed = require('./data/courseWeek')
const activitySeed = require('./data/activity')
const threadSeed = require('./data/thread')
const commentSeed = require('./data/comment')


let databaseConnection = require('../start-up/db')


const { ObjectId } = require('mongoose').Types;
const { Course } = require("../models/course");
const { QA } = require("../models/qa");
const { Syllabus } = require("../models/syllabus");
const { CourseWeek } = require("../models/courseWeek");
const { Activity } = require("../models/activity");
const { Thread } = require("../models/thread");
const { Comment } = require("../models/comment");


async function seedDB(){
    databaseConnection.connectDB()
    await dropDB()
    databaseConnection.connectDB()
    console.log('Running seeds, please wait...');
    const {learners,instructors,admin,coursesIDs} = await userSeed.seedUsers()
    const learnersDocs = await User.create(learners)
    const instructorsDocs = await Instructor.create(instructors)
    const adminDoc  = await User.create(admin)

    const instructorsIDs = instructorsDocs.map(el => el._id)
    instructorsIDs.push(adminDoc._id)
    const {courses,qaIDs,syllabusesIDs,weekIDs} =courseSeed.seedCourses(coursesIDs,instructorsIDs)
    await Course.create(courses)
    const qas = qaSeed.seedQA(coursesIDs,qaIDs)
    await QA.create(qas)
    const syllabuses = syllabusSeed.seedSyllabus(syllabusesIDs)
    await Syllabus.create(syllabuses)
    const {weeks,youtubeIDs,pdfIDs} = courseWeekSeed.seedWeek(weekIDs)
    await CourseWeek.create(weeks)
    const { pdfActivities, youtubeActivities } = activitySeed.seedActivity(youtubeIDs,pdfIDs)
    await Activity.create(pdfActivities)
    await Activity.create(youtubeActivities)
    const threads = threadSeed.seedThread(qaIDs,learnersDocs)
    const threadDocs = await Thread.create(threads)
    const threadIDs = threadDocs.map(el => el._id)
    const comments = commentSeed.seedComment(threadIDs, learnersDocs, instructorsDocs)
    await Comment.create(comments)
    console.log('✅ Seeds executed successfully');
    process.exit(0)
}

seedDB()