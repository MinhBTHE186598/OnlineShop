const user = require('../controllers/user')
const router = require('express').Router();

router.delete('/delete/:id', user.deleteUser)
router.get('/getUser', user.getUser)
router.post('/registerUser', user.registerUser)
router.get('/getinf/:id', user.getUserByID)
router.put('/update', user.updateUser)
router.get('/checkUsername', user.checkUsername);
router.post('/registerShipper', user.registerShipper)
router.get('/getShipper', user.getShipper)




module.exports = router