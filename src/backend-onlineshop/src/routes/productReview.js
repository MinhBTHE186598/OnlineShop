const productReview = require('../controllers/productReview');
const router = require('express').Router();

router.get('/get', productReview.getProductReview)
router.get('/getStar/', productReview.getStar)
router.post('/add', productReview.addProductReview)
router.put('/update/:id', productReview.updateProductReview)
router.delete('/delete/:id', productReview.deleteProductReview)

module.exports = router