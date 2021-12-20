const threadController = require('../controllers/thread')
const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate')
const validateRoles = require('../middlewares/roles')
const auth = require('../middlewares/authentication')
const Joi = require('joi');
const {validateThread} = require('../models/thread')
const {validateComment} = require('../models/comment')

// QA section ID is required here
router.post('/:id',[auth,validate(validateThread)],threadController.startThread)
// thread ID is required here 
router.post('/comment/:id',[auth,validate(validateComment)],threadController.postComment)
// thread ID is required 
router.get('/:id',[auth],threadController.getThread)
// get all thread is QA section, QA section ID is required here
router.get('/all/:id',[auth],threadController.getThreads)

module.exports = router