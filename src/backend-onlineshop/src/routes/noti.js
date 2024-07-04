const noti = require('../controllers/noti');
const router = require('express').Router();

router.post('/postnoti',noti.postNoti)
router.get('/getnoti', noti.getNoti);



module.exports = router