const admin = require('../controllers/admin');
const router = require('express').Router();

router.get('/get', admin.getAdmin)

module.exports = router