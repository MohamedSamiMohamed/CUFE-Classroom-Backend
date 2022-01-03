
module.exports = function() {
    if(process.env.NODE_ENV == "development"){
        require('dotenv').config({
            path: `./.env.${process.env.NODE_ENV}`
        })
    }
    if(process.env.NODE_ENV == "production"){
        require('dotenv').config({
            path: `./.env.${process.env.NODE_ENV}`
        })
    }
}