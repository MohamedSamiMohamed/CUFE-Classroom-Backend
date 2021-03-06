const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { JoiPasswordComplexity } = require('joi-password')
require('dotenv').config()
const Joi = require('joi')

const options = { discriminatorKey: 'userType' };
let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    confirmationToken: {
        type: String,
        unique: true,
        required: true,
        default: ""
    },
    type: {
        type: String,
        required: true,
        enum: {
            values: ["admin", "learner", "instructor"],
            message: '{VALUE} is not a supported type'
        }
    },
    birthDate: {
        type: Date,
        required: true
    },
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'course',
        required: function () {
            return this.type == "admin"
        },
        default : function (){
            if(this.type == 'admin'){
                return []
            }
            else{
                return undefined;
            }

        },

    },

}, options)

// userSchema.pre('save',(next)=>{
//     if (this.type === 'admin') {
//         this.courses = [];
//       }
//       next();
// })


let instructorSchema = new mongoose.Schema({
    courses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'course',
        required: true,
        default: []
    }
}, options)

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id, role: this.type, email: this.email, userName: this.userName }, process.env.JWT_PRIVATE_KEY);
}

userSchema.methods.generateConfirmationToken = function () {
    return jwt.sign({ _id: this._id, email: this.email }, process.env.CONFIRMATION_TOKEN_PRIVATE_KEY, { expiresIn: '3d' });
}



const User = mongoose.model('user', userSchema);
const Instructor = User.discriminator("instructor", instructorSchema)


function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        firstName: Joi.string()
            .alphanum()
            .required()
            .min(3)
            .max(15),
        lastName: Joi.string()
            .alphanum()
            .required()
            .min(3)
            .max(15),
        // // abcdeF91 is correct 
        password: JoiPasswordComplexity.string()
            .min(8)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .required(),
        confirmPassword: Joi.string()
            .required()
            .equal(Joi.ref('password'))
            .messages({ 'any.only': 'confirmed password does not match password' }),
        type: Joi.string().valid("learner", "instructor").required(),
        birthDate: Joi.date().max('01-01-2004').iso().messages({ 'date.format': `Date format is YYYY-MM-DD`, 'date.max': `Age must be +17` }).required(),
        userName: Joi.string().min(5).max(40).required(),
    });
    return schema.validate(user)
}


exports.validateUser = validateUser
exports.User = User
exports.Instructor = Instructor

