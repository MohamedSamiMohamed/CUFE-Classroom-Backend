const faker = require('faker');
const { Comment } = require('../../models/comment')
const { ObjectId } = require('mongoose').Types;
exports.seedComment = (threadIDs, learnersDocs, instructors) => {
    let comments = []
    let attachedName=""
    let attachedUserName = ""
    for (i = 0; i < threadIDs.length; i += 1) {
        for (j = 0; j < 3; j++) {
            if(j==2){
                attachedName = `${instructors[i%10].firstName} ${instructors[i%10].lastName}`
                attachedUserName = instructors[i%10].userName
            }
            else {
                attachedName = `${learnersDocs[(i+j)%10].firstName} ${learnersDocs[(i+j)%10].lastName}`
                attachedUserName = learnersDocs[(i+j)%10].userName
            }
            comments.push({
                thread : threadIDs[i],
                name : attachedName,
                userName : attachedUserName,
                text : faker.lorem.sentence()
            })
        }
    }
    return comments
};
