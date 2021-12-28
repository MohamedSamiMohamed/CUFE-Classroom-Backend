const mongoose = require('mongoose');
module.exports = disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('✅ database disconnected');
    } catch (err) {
        console.log('❌ Fail during disconnecting database');
    }
};  