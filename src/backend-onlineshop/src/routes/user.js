const user = require('../controllers/user')
const router = require('express').Router();

router.get('/delete/:id', user.deleteUser)
router.get('/get', user.getUser)


module.exports = router