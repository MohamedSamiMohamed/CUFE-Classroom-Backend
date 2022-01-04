const faker = require('faker');
const { Activity } = require('../../models/activity')
const { ObjectId } = require('mongoose').Types;
exports.seedActivity = (youtubeIDs, pdfIDs) => {
    let pdfActivities = []
    let youtubeActivities = []
    for (i = 0; i < youtubeIDs.length; i += 1) {
        let youtubeActivity = new Activity({
            description: `youtube activity #${i}`,
            url: "https://www.youtube.com/embed/tgbNymZ7vqY",
            type: "youtube"
        })

        let pdfActivity = new Activity({
            description: `pdf activity #${i}`,
            url: "https://cufe-classroom-bucket.s3.amazonaws.com/Mini-Project%20-%202021.pdf-1640293341207-.pdf",
            type: "pdf"
        })

        youtubeActivity._id = youtubeIDs[i]
        pdfActivity._id = pdfIDs[i]
        pdfActivities.push(pdfActivity)
        youtubeActivities.push(youtubeActivity)
    }

    return { pdfActivities, youtubeActivities }
};