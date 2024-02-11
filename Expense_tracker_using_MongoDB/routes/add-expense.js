const express =require('express');
const router = express.Router();
const userautheticate=require('../middleware/auth');
const routes=require('../controllers/addExpense');
router.post('/expense',userautheticate.authenticate,routes.addExpense)

module.exports=router