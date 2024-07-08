const bill = require('../controllers/bill')
const router = require('express').Router();

router.get('/getBill', bill.getBill)
router.get('/getBillDetail', bill.getBillDetail)
router.get('/getSellerToBill', bill.getSellerToBill)
router.get('/getUserToBill', bill.getUserToBill)
router.get('/getProductToBill', bill.getProductToBill);
router.get('/getCart/:id', bill.getCart)
router.get('/getBillDetailByBillID/:id', bill.getBillDetailByBillID)
router.post('/addNewBill/:id', bill.addNewBill)
router.put('/updateBillDetail', bill.updateBillDetail);
router.delete('/delete/:id', bill.deleteBill)
router.put('/updatePlus/:id', bill.updateBillDetailPlusQuantity)
router.put('/updateMinus/:id', bill.updateBillDetailMinusQuantity)
router.put('/updateCustom/:id', bill.updateBillDetailCustomQuantity)
router.get('/getBills', bill.getBillsByUserID)
router.post('/addToCart/:id', bill.addToCart)

module.exports = router