var multer = require('multer')
var aws = require('aws-sdk')
var multerS3 = require('multer-s3')
require('dotenv').config({
    path: `./.env.${process.env.NODE_ENV}`
})
let path = require('path')
var s3 = new aws.S3(
    {
        accessKeyId: process.env.AWS_ACESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
)


var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            console.log(file)
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, `${file.originalname}-${Date.now().toString()}-${path.extname(file.originalname)}`)
        }
    })
})
exports.fileUpload = upload
