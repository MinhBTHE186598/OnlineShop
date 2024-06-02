const product = require('../controllers/product')
const router = require('express').Router();

router.get('/get', product.getProduct)
router.get('/getWhitelistProduct', product.getWhitelistProduct)
router.get('/getProductByID:id', product.getProductByID)
router.post('/addProduct', product.addProduct)
router.post('/filterProduct', product.filterProduct)

module.exports = router