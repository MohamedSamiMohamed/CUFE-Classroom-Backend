const userController = require('../controllers/user')
const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate')
const validateRoles = require('../middlewares/roles')
const auth = require('../middlewares/authentication')
const Joi = require('joi');


router.get('/instructors',[auth],userController.getAllInstructors)
router.get('/learners',[auth],userController.getAllLearners)
router.get('/me', [auth], userController.getMe)
router.get('/:id', [auth], userController.getUser)
router.put('/me', [auth, validate(validateUpdateInfo)], userController.updateInfo)
router.get('/', [auth, validate(validateEmailUserName)],userController.getUserByEmail)

function validateEmailUserName(body) {
    const schema = Joi.object({
        email: Joi.alternatives().try(Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }), Joi.string().min(5).max(20)).required()

    })
    return schema.validate(body)
}
function validateUpdateInfo(body) {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(40),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        firstName: Joi.string()
            .alphanum()
            .min(3)
            .max(15),
        lastName: Joi.string()
            .alphanum()
            .min(3)
            .max(15),
        birthDate: Joi.date().max('01-01-2004').iso().messages({ 'date.format': `Date format is YYYY-MM-DD`, 'date.max': `Age must be +17` })
    });
    return schema.validate(body)
}
module.exports = router