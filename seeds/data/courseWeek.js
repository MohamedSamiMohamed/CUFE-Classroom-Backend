const faker = require('faker');
const { CourseWeek } = require('../../models/courseWeek')
const { ObjectId } = require('mongoose').Types;
exports.seedWeek = (weekIDs) => {
    let weeks = []
    let pdfIDs = []
    let youtubeIDs = []
    let week = {}
    for (i = 0; i < weekIDs.length; i += 1) {

        if (i % 2 == 0) {
            pdfIDs.push(new ObjectId())
            youtubeIDs.push(new ObjectId())
             week = new CourseWeek({
                youtube: [youtubeIDs[i]],
                pdf: [pdfIDs[i]]
            })
        }
        else {
            pdfIDs.push(new ObjectId())
            pdfIDs.push(new ObjectId())

            youtubeIDs.push(new ObjectId())
            youtubeIDs.push(new ObjectId())

             week = new CourseWeek({
                youtube: [youtubeIDs[i], youtubeIDs[i + 1]],
                pdf: [pdfIDs[i], pdfIDs[i + 1]]
            })

        }
        week._id = weekIDs[i]
        weeks.push(week)
    }
    return {weeks,youtubeIDs,pdfIDs}
};
