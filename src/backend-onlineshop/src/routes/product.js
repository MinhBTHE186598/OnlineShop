const product = require('../controllers/product')
const router = require('express').Router();

router.get('/get', product.getProduct)
router.get('/getAll', product.getAllProduct)
router.post('/getAllFilter', product.postAllProductFilter)
router.get('/getWhitelistProduct', product.getWhitelistProduct)
router.get('/getProductByID/:id', product.getProductByID)
router.post('/addProduct', product.addProduct)
router.post('/filter', product.filterProduct)
router.delete('/delete/:id', product.deleteProduct)
router.put('/approve/:id', product.approveProduct)
router.get('/getProductSID/:id', product.getProductBySellerID)
router.put('/update', product.updateProduct)
module.exports = router