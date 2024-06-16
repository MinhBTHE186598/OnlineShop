const contact = require('../controllers/contact.js');
const router = require('express').Router();

router.get('/get', contact.getContact);

module.exports = router;
