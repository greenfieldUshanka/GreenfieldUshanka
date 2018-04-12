const router = require('express').Router();
const friends = require('../controllers/friends.js');
const LoginController = require('../controllers/LoginController');
const posts = require('../controllers/posts.js');

router.get('/friends', friends.searchFriends);
router.post('/addfriend', friends.addFriend);

router.post('/postFeed', posts.savePosts);
router.get('/postFeed', posts.fetchPosts);

router.route('/newAccount')
  .post(LoginController.createAccount);

router.route('/Login/:username/:password')
  .get(LoginController.Login);

module.exports = router;