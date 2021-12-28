const faker = require('faker');
const { Syllabus } = require('../../models/syllabus')
const { ObjectId } = require('mongoose').Types;
exports.seedSyllabus = (syllabusesIDs) => {
    let syllabuses = []
    for (i = 0; i < syllabusesIDs.length; i += 1) {
        let syllabus = new Syllabus({
            syllabus: [
                {
                    week: 1,
                    date: `2021-10-10`,
                    lectureTopic: faker.name.jobDescriptor(),
                    readings: faker.name.title()
                },
                {
                    week: 2,
                    date: `2021-11-10`,
                    lectureTopic: faker.name.jobDescriptor(),
                    readings: faker.name.title()
                },
                {
                    week: 3,
                    date: `2021-12-10`,
                    lectureTopic: faker.name.jobDescriptor(),
                    readings: faker.name.title()
                },
                {
                    week: 4,
                    date: `2022-01-10`,
                    lectureTopic: faker.name.jobDescriptor(),
                    readings: faker.name.title()
                }]
        })
        syllabus._id = syllabusesIDs[i]
        syllabuses.push(syllabus)
    }
    return syllabuses
};
