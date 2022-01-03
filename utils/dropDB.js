const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
dbDebugger = require('debug')('db')
module.exports = async () => {
    try {
        let db = await MongoClient.connect(process.env.CUFE_CLASSROOM_DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
        let dbo = db.db(process.env.CUFE_CLASSROON_DB_NAME);
        try {
            const result = await dbo.dropDatabase()
            if (result) console.log(`✅Database dropped successfully.`);
        }
        catch (err) {
            console.log(`✅Database was already empty.`)
        }
    }
    catch (err) {
        console.log(err.message)
    }
}