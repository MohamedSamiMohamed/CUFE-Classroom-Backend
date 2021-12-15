const authController = require('../controllers/authentication')
const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate')
const { validateUser } = require('../models/user')
const Joi = require('joi');
const { JoiPasswordComplexity } = require('joi-password')

router.post('/signup', validate(validateUser), authController.signup)
router.post('/login', validate(validateLogin), authController.login)
router.get('/confirm', authController.verifyEmail)

function validateLogin(loginReqBody) {
    const schema = Joi.object({
        email: Joi.alternatives().try(Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), Joi.string().min(5).max(20)).required(),
        password: JoiPasswordComplexity.string()
            .min(8)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .required(),
    });
    return schema.validate(loginReqBody)
}

module.exports = router