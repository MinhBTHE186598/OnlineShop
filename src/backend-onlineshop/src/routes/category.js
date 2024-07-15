const category = require('../controllers/category')
const router = require('express').Router();

router.get('/getCategories', category.getCategories)
router.get('/getCategoryQuantity', category.getCategoryQuantity)

module.exports = router