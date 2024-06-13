const seller = require('../controllers/seller');
const router = require('express').Router();

router.get('/get', seller.getSeller)
router.get('/getSellerByID:id', seller.getSellerByID)
router.post('/addSeller', seller.addSeller)
router.post('/updateSeller/:id', seller.updateSeller)
module.exports = router