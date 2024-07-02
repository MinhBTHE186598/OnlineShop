const bill = require('../controllers/bill')
const router = require('express').Router();

router.get('/getBillDetail', bill.getBillDetail)
router.get('/getCart/:id', bill.getCart)
router.get('/getBillDetailByBillID/:id', bill.getBillDetailByBillID)
router.post('/addNewBill/:id', bill.addNewBill)

module.exports = router