const db = require('../db');


var savePosts = function (req, res) {
  console.log('req.body ', req.body);
  var postContent = req.body;
  db.query("INSERT INTO posts (post_text) VALUES (?)", [postContent.post_text], function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
}

var fetchPosts = function (req, res) {
  console.log('in the post controller, running fetchPosts');
  db.query("SELECT * FROM posts", function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
}

exports.fetchPosts = fetchPosts;
exports.savePosts = savePosts;