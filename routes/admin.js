const adminController = require('../controllers/admin')
const express = require('express');
const router = express.Router();
const admin = require('../middlewares/admin')
const auth = require('../middlewares/authentication')

router.patch('/toggleRole/:id',[auth,admin],adminController.toggleLearnerRole)
module.exports = router