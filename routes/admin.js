const adminController = require('../controllers/admin')
const express = require('express');
const router = express.Router();
const admin = require('../middlewares/admin')
const auth = require('../middlewares/authentication')

router.patch('/toggleRole/:id',[auth,admin],adminController.toggleLearnerRole)
// router.delete('/instructor/:id',[auth,admin],adminController.deleteInstructor)
// router.delete('/learner/:id',[auth,admin],adminController.deleteLearner)
// router.delete('/course/:id',[auth,admin],adminController.deleteCourse)
module.exports = router