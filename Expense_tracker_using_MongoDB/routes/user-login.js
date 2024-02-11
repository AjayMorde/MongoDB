const express =require('express');
const router = express.Router();
const routes=require('../controllers/userLogin');
router.post('/login',routes.userLogin)

module.exports=router