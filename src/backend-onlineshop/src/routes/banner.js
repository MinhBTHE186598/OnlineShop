const banner = require('../controllers/banner')
const router = require('express').Router();

router.get('/get', banner.getBanner)
router.get('/delete/:id', banner.deleteBanner)
router.get('/add', banner.addBanner)
router.get('/edit/:id', banner.editBanner)
router.get('/getA', banner.getBannerForAdmin)


module.exports = router