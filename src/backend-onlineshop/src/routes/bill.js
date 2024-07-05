const bill = require('../controllers/bill')
const router = require('express').Router();

router.get('/getBillDetail', bill.getBillDetail)
router.get('/getCart/:id', bill.getCart)
router.get('/getBillDetailByBillID/:id', bill.getBillDetailByBillID)
router.post('/addNewBill/:id', bill.addNewBill)
router.put('/updateBill', bill.updateBill);
router.delete('/delete/:id', bill.deleteBill)
router.put('/updatePlus/:id', bill.updateBillDetailPlusQuantity)
router.put('/updateMinus/:id', bill.updateBillDetailMinusQuantity)

module.exports = router