const faker = require('faker');
const {Thread} = require('../../models/thread')
const { ObjectId } = require('mongoose').Types;
exports.seedThread = (qaIDs) => {
    let threads = []
    for (i = 0; i < qaIDs.length; i += 1) {
        let thread = new Thread({
            qa : qaIDs[i],
            question : {
                
            }
        })
    }
    return qas 
};
