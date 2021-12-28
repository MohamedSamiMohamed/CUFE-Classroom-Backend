const faker = require('faker');
const {QA} = require('../../models/qa')
const { ObjectId } = require('mongoose').Types;
exports.seedQA = (coursesIDs, qaIDs) => {
    let qas = []
    for (i = 0; i < coursesIDs.length; i += 1) {
        let qa = new QA({
            course : coursesIDs[i]
        })
        qa._id = qaIDs[i]
        qas.push(qa)
    }
    return qas 
};
