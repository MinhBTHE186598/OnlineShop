const banner = require('../controllers/banner')
const router = require('express').Router();

router.get('/get', banner.getBanner)


module.exports = router