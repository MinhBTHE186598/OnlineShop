const noti = require('../controllers/noti');
const router = require('express').Router();

router.post('/postnoti',noti.postNoti)

module.exports = router