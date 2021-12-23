const activityController = require('../controllers/activity')
const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate')
const validateRoles = require('../middlewares/roles')
const auth = require('../middlewares/authentication')
const Joi = require('joi');
const { fileUpload } = require("../middlewares/fileUpload")
var multiparty = require('multiparty');
const { validateYoutubeActivity, validatePdfActivity } = require("../models/activity")
// post youtube link to a course week
router.post('/youtube/:course/:week', [auth, validateRoles(["admin", "instructor"]), validate(validateYoutubeActivity), activityController.validateMaterialUploading], activityController.addVideo)
//post a pdf to a course week
router.post('/pdf/:course/:week/:description', [auth, validateRoles(["admin", "instructor"]), activityController.validateMaterialUploading, fileUpload.single("pdfDocument")], activityController.addPdf)
//get all activities in a week 
router.get('/:course/:week',[auth],activityController.getAllMaterials)
//get all pdfs in a week
router.get('/pdf/:course/:week',[auth],activityController.getPdfs)
//get all yotube links in a week
router.get('/youtube/:course/:week',[auth],activityController.getYoutube)


// function validatePdf(req, res, next) {
//     console.log(req)
//     let validReq =  JSON.parse(JSON.stringify(req))
//     var form = new multiparty.Form();
//     form.parse(validReq, (err, fields, files) => {
//         console.log(fields.description[0])
    //     if (!fields.description || !files.pdfDocument) {
    //         return res.status(400).send("must contain description and pdfDocument fileds");
    //     } else {
    //         // req.description = fields.description[0]
    //         next()
    //     }

    // });
    // next()
// }
module.exports = router