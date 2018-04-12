const con = require('../db');

var searchFriends = function(req, res) {
  var term = req.url.slice(12);
  if (term.length) { // do not allow blank searches. limit to more than x characters later if wanted
    con.query("SELECT * FROM `users` WHERE `full_name` LIKE ? OR `username` LIKE ?", ['%'+term+'%', '%'+term+'%'], function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);

      }
    });
  }
}

var addFriend = function(req, res) {
  var potentialFriendId = req.body.potentialFriendId;
  var myId = req.body.myId;
  // 2 inserts, 1 select
  // if we're already friends...1 select
    // respond saying that 
  // else we're not friends
    // 2 inserts....insert mine into column 1 and theirs into 2 and theirs into 1 and mine into 2
    // respond saying they've been added. possibly move card to top? or just have button dynamically change to remove friend
}

exports.searchFriends = searchFriends;
exports.addFriend = addFriend;