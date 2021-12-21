const userController = require('../controllers/user')
const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate')
const validateRoles = require('../middlewares/roles')
const auth = require('../middlewares/authentication')
const Joi = require('joi');


router.get('/me',[auth],userController.getMe)
router.get('/:id',[auth],userController.getUser)

module.exports = router