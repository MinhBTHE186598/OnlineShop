const bill = require('../controllers/bill')
const router = require('express').Router();

router.get('/getBillDetail', bill.getBillDetail)

module.exports = router