const category = require('../controllers/category')
const router = require('express').Router();

router.put('/change', category.changeCate)
router.get('/getCategories', category.getCategories)
router.get('/getCategoryQuantity', category.getCategoryQuantity)
router.post('/addCate', category.addCate)
router.delete('/delCate/:id', category.deleteCate)
router.put('/update', category.updateCate)


module.exports = router