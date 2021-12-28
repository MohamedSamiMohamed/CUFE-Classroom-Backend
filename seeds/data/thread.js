const faker = require('faker');
const {Thread} = require('../../models/thread')
const { ObjectId } = require('mongoose').Types;
exports.seedThread = (qaIDs,learnersDocs) => {
    let threads = []
    for (i = 0; i < qaIDs.length; i += 1) {
        threads.push(new Thread({
            qa : qaIDs[i],
            question : {
                name : `${learnersDocs[i%10].firstName} ${learnersDocs[i%10].lastName}`,
                userName : `${learnersDocs[i%10].userName}`,
                text : faker.lorem.sentence()
            }
        }))
        threads.push(new Thread({
            qa : qaIDs[i],
            question : {
                name : `${learnersDocs[(i+1)%10].firstName} ${learnersDocs[(i+1)%10].lastName}`,
                userName : `${learnersDocs[(i+1)%10].userName}`,
                text : faker.lorem.sentence()
            }
        }))

    }
    return threads
};
