const banner = require('../controllers/banner')
const router = require('express').Router();

router.get('/get', banner.getBanner)
router.delete('/delete/:id', banner.deleteBanner)
router.post('/add', banner.addBanner)
router.put('/edit/:id', banner.editBanner)
router.get('/getA', banner.getBannerForAdmin)
router.get('/get/:id', banner.getBannerByID)


module.exports = router