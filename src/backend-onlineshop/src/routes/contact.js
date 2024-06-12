const ticket = require('../controllers/ticket.js');
const express = require('express');
const router = express.Router();
const { submitContactForm, getTicket } = require('../controllers/ticket.js');

router.post('/contact', submitContactForm);
router.get('/get', ticket.getTicket);

module.exports = router;
