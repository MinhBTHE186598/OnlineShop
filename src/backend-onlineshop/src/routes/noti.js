const noti = require('../controllers/noti');
const router = require('express').Router();

router.post('/postnoti', noti.postNoti);
router.get('/getnoti', noti.getNoti);
router.delete('/deletenoti/:notificationID', noti.deleteNoti);

module.exports = router;
