const express =require('express');
const router = express.Router();
const routes=require('../controllers/addUser');

router.post('/signup',routes.addUser);


module.exports=router 