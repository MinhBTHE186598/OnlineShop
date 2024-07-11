const seller = require('../controllers/seller');
const router = require('express').Router();

router.get('/get', seller.getSeller)
router.get('/getSellerByID:id', seller.getSellerByID)
router.post('/addSeller', seller.addSeller)
router.put('/updateSeller/:id', seller.updateSeller)
router.delete('/deleteSeller/:id', seller.deleteSeller)
router.get('/viewBillDetailForSeller/:id', seller.viewBillDetailForSeller)
router.get('/listBillForSeller/:id', seller.listBillForSeller)
module.exports = router