const con = require('../db/db.js');
var _ = require('lodash');

var searchFriends = function(req, res) {
  var term = _.escapeRegExp(req.url.slice(12));
  if(term.length) { // do not allow blank searches. limit to more than x characters later if wanted
    con.query(`SELECT * FROM greenfield.users WHERE full_name LIKE '%${term}%' OR username LIKE '%${term}%'`, function(err, data) {
      if (err) {
        //return cb('Error in query postMessage');
      } else {
        res.send(data);

      }
    });
  }
}

exports.searchFriends = searchFriends;