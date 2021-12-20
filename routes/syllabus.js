const syllabusController = require('../controllers/syllabus')
const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate')
const validateRoles = require('../middlewares/roles')
const auth = require('../middlewares/authentication')
const Joi = require('joi');
const {validateSyllabus} = require('../models/syllabus')

router.post('/:id',[auth,validateRoles(["admin","instructor"]),validate(validateSyllabus)],syllabusController.addSyllabus)

module.exports = router