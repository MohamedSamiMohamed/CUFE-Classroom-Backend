const bcrypt = require('bcrypt');
module.exports = async function (plainText){
    // console.log(plainText)
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainText, salt);
}