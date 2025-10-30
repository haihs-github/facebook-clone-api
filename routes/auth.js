//import thu vien
const router = require('express').Router()
const authController = require('../controllers/authController')

//dinh nghia route khi co request post /register thi chay ham register trong authController
router.post('/register', authController.register);

router.post('/login', authController.login)

module.exports = router