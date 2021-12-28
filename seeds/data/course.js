const faker = require('faker');
const { Course } = require('../../models/course')
const { ObjectId } = require('mongoose').Types;
exports.seedCourses = (coursesIDs, instructorsIDs) => {
    const courses = [];
    let instIDindex = 0
    const qaIDs = []
    const syllabusesIDs = []
    const weekIDs = []

    for (i = 0; i < 22; i += 1) {
        weekIDs.push(new ObjectId)
        weekIDs.push(new ObjectId)
        let qaID = new ObjectId()
        qaIDs.push(qaID)
        let syllabusID = new ObjectId()
        syllabusesIDs.push(syllabusID)
        let course = new Course({
            code: `CMP${i}`,
            name: `CMP${i}`,
            instructor: instructorsIDs[instIDindex],
            qa: qaID,
            about: `This is course number ${i}`,
            syllabus: syllabusID,
            weeks: [
                {
                    weekNum: i % 2,
                    id: weekIDs[i * 2],
                },
                {
                    weekNum: (i + 1) % 2,
                    id: weekIDs[(i * 2)+1],

                }]
        })
        if (i % 2 != 0) {
            instIDindex += 1
        }
        course._id = coursesIDs[i]
        courses.push(course)
    }
    return { courses, qaIDs, syllabusesIDs,weekIDs }
};
