const express = require('express');

const purchase = require('../controllers/purchase');

const userautheticate=require('../middleware/auth');

const router = express.Router();

router.get('/premiummembership', userautheticate.authenticate,purchase.purchasePremium);

router.post('/updatetransactionstatus', userautheticate.authenticate, purchase.updateTransactionStatus)

module.exports = router;