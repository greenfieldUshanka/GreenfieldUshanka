const router = require('express').Router();
const friends = require('../controllers/friends.js');
const LoginController = require('../controllers/LoginController');

router.get('/friends', friends.searchFriends);
router.post('/addfriend', friends.addFriend);

router.route('/newAccount')
    .post(LoginController.createAccount);

router.route('/Login/:username/:password')
    .get(LoginController.Login);

module.exports = router; 