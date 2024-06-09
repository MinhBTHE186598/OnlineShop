const sellManager = require('../controllers/sellManager');
const router = require('express').Router();

router.get('/get', sellManager.getSellManager)

module.exports = router