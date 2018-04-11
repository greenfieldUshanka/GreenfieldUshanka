const express = require('express')
const router = express.Router()
const LoginController = require('../Controllers/LoginController')

router.route('/newAccount')
    .post(LoginController.createAccount)

router.route('/Login/:username/:password')
    .get(LoginController.Login)

module.exports = router; 