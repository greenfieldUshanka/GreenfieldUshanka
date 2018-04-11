const router = require('express').Router();
const friends = require('../controllers/friends.js');

router.get('/friends', friends.searchFriends);

module.exports = router;