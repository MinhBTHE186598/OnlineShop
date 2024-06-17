const admin = require('../controllers/admin');
const router = require('express').Router();

router.get('/get', admin.getAdmin)
router.get('/getA/:id', admin.getAdminByID)

module.exports = router