const shipper = require('../controllers/shipper');
const router = require('express').Router();

router.get('/get', shipper.getShipper)

module.exports = router