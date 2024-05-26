const user = require('../controllers/user');
const router = require('express').Router();
router.get('/', user.getUser);
module.exports = router;