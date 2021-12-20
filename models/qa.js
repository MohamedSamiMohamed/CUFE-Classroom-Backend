const mongoose = require('mongoose');


let qaSchema = new mongoose.Schema({
course : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'course',
    required : true   
}
})

qaSchema.virtual('threads',{
    ref : 'thread',
    localField : '_id',
    foreignField : 'qa'
})
const QA = mongoose.model('qa',qaSchema)
exports.QA = QA
