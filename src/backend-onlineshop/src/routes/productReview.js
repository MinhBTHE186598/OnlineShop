const productReview = require('../controllers/productReview');
const router = require('express').Router();

router.get('/get', productReview.getProductReview)
router.get('/getStar/', productReview.getStar)

module.exports = router