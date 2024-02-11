
const express = require('express');



const mainpageController = require('../controllers/mainpage');


const router = express.Router();


router.get('',mainpageController.gethomePage);
router.get('/login',mainpageController.getloginpage);
router.get('/forgotPassword',mainpageController.getforgotoage);
router.get('/index3',mainpageController.getindex3page);
router.get('/index1',mainpageController.getindex1page);
router.get('/index2',mainpageController.getindex2page);
router.get('/index4',mainpageController.getindex4page);
router.get('/reports',mainpageController.getreportspage);
router.get('/resetPassword',mainpageController.getresetpasspage);
// router.get('',mainpageController.geterrorPage);


module.exports = router;

