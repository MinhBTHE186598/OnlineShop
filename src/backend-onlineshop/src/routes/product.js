const product = require('../controllers/product')
const router = require('express').Router();

router.get('/get', product.getProduct)
router.get('/getWhitelistProduct', product.getWhitelistProduct)
router.get('/getProductByID', product.getProductByID)


module.exports = router