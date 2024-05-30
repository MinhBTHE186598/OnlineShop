const category = require('../controllers/category')
const router = require('express').Router();

router.get('/getCategories', category.getCategories)

module.exports = router