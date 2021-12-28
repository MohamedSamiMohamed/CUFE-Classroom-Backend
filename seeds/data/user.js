const faker = require('faker');
exports.seedUsers = () => {
    const learners = [];
    const instructors = [];
  
for (let i = 0; i < 10; i += 1) {
  learners.push({
    userName : `learner${i}`,
    firstName : faker.name.firstName(),
    lastName : faker.name.lastName(),
    email : faker.internet.email(),
    password : "testPassword1",
    isVerified : true,
    type : "learner",
    birthDate : "1999-08-02",
    confirmationToken : `${faker.datatype.uuid()}`
  })

  instructors.push({
    userName : `instructor${i}`,
    firstName : faker.name.firstName(),
    lastName : faker.name.lastName(),
    email : faker.internet.email(),
    password : "testPassword1",
    isVerified : true,
    type : "instructor",
    birthDate : "1999-08-02",
    confirmationToken : `${faker.datatype.uuid()}`

  })
  }
  const admin = {
    userName : `admin`,
    firstName : faker.name.firstName(),
    lastName : faker.name.lastName(),
    email : faker.internet.email(),
    password : "testPassword1",
    isVerified : true,
    type : "admin",
    birthDate : "1999-08-02",
    confirmationToken : `${faker.datatype.uuid()}`

  }
  return { learners, instructors, admin };
};
