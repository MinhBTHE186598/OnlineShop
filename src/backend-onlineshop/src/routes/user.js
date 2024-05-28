const user = require('../controllers/user')
const router = require('express').Router();

router.delete('/delete/:id', user.deleteUser)
router.get('/get', user.getUser)
router.post('/register', user.registerUser)

module.exports = router