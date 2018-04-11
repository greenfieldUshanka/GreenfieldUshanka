const con = require('../db/db.js');

var searchFriends = function(req, res) { // search term passed in
  var term = req.url.slice(12);
  con.query(`SELECT * FROM greenfield.users WHERE full_name LIKE '%${term}%' OR username LIKE '%${term}%'`, function(err, res) {
    if (err) {
      //return cb('Error in query postMessage');
    } else {
      console.log(res)
      //return cb(null, res);
    }
  });
}

exports.searchFriends = searchFriends;