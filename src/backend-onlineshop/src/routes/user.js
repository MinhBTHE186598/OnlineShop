const user = require('../controllers/user')
const router = require('express').Router();

router.delete('/delete/:id', user.deleteUser)
router.get('/get', user.getUser)
router.post('/registerUser', user.registerUser)
router.get('/getinf/:id', user.getUserByID)
router.put('/update', user.updateUser)
router.get('/checkUsername', user.checkUsername);



module.exports = router