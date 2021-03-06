const courseController = require('../controllers/course')
const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate')
const admin = require('../middlewares/admin')
const instructor = require('../middlewares/instructor')
const validateRoles = require('../middlewares/roles')
const auth = require('../middlewares/authentication')
const Joi = require('joi');
const {validateCourse} = require('../models/course')

router.post('/',[auth,validateRoles(["admin","instructor"]),validate(validateCourse)],courseController.addCourse)
router.post('/week/:id',[auth,validateRoles(["admin","instructor"])],courseController.addWeek)
router.get('/:id',[auth],courseController.getCourse)
router.get('/',[auth],courseController.getAllCourses)
router.get('/isOwner/:id',[auth,validateRoles(["admin","instructor"])],courseController.checkCourseOwner)
module.exports = router