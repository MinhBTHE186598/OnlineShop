const contact = require('../controllers/contact.js');
const router = require('express').Router();

router.get('/get', contact.getContact);
router.post('/addContact' , contact.addContact);
router.get('/getdetail',contact.getContactDetail);
router.put('/response', contact.response)

module.exports = router;
