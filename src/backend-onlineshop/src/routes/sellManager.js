const sellManager = require('../controllers/sellManager');
const router = require('express').Router();

router.get('/get', sellManager.getSellManager)
router.get('/getInf', sellManager.getSellManagerInf)

module.exports = router