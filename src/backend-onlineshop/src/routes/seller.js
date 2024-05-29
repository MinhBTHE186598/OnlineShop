const seller = require('../controllers/seller');
const router = require('express').Router();

router.get('/get', seller.getSeller)
router.get('/getSellerByID:id', seller.getSellerByID)

module.exports = router