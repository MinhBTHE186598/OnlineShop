const sellerReview = require('../controllers/sellerReview');
const router = require('express').Router();

router.get('/get', sellerReview.getSellerReview)
router.get('/getStar/', sellerReview.getStar)
router.post('/add', sellerReview.addSellerReview)
router.put('/update/:id', sellerReview.updateSellerReview)
router.delete('/delete/:id', sellerReview.deleteSellerReview)

module.exports = router