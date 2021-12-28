const faker = require('faker');
const { ObjectId } = require('mongoose').Types;
const passwordHashing = require("../../utils/passwordHashing");
exports.seedUsers = async() => {
    const learners = [];
    const instructors = [];
    let courseID
    const coursesIDs = [];
    let hashedPass = await passwordHashing("testPassword1")
for (let i = 0; i < 10; i += 1) {
  let instructorcoursesIDs = []
  courseID = new ObjectId()
  instructorcoursesIDs.push(courseID)
  coursesIDs.push(courseID)
  learners.push({
    userName : `learner${i}`,
    firstName : faker.name.firstName(),
    lastName : faker.name.lastName(),
    email : faker.internet.email(),
    password : hashedPass,
    isVerified : true,
    type : "learner",
    birthDate : "1999-08-02",
    confirmationToken : `${faker.datatype.uuid()}`
  })
  courseID = new ObjectId()
  instructorcoursesIDs.push(courseID)
  coursesIDs.push(courseID)
    instructors.push({
    userName : `instructor${i}`,
    firstName : faker.name.firstName(),
    lastName : faker.name.lastName(),
    email : faker.internet.email(),
    password : hashedPass,
    isVerified : true,
    type : "instructor",
    birthDate : "1999-08-02",
    confirmationToken : `${faker.datatype.uuid()}`,
    courses: instructorcoursesIDs
  })
  }
  let adminCoursesIDs = []
  courseID = new ObjectId()
  coursesIDs.push(courseID)
  adminCoursesIDs.push(courseID)
  courseID = new ObjectId()
  coursesIDs.push(courseID)
  adminCoursesIDs.push(courseID)


  const admin = {
    userName : `admin`,
    firstName : faker.name.firstName(),
    lastName : faker.name.lastName(),
    email : faker.internet.email(),
    password : hashedPass,
    isVerified : true,
    type : "admin",
    birthDate : "1999-08-02",
    confirmationToken : `${faker.datatype.uuid()}`,
    courses : adminCoursesIDs
  }
  return { learners, instructors, admin, coursesIDs };
};
