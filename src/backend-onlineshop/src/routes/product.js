const product = require('../controllers/product')
const router = require('express').Router();

router.get('/get', product.getProduct)


module.exports = router