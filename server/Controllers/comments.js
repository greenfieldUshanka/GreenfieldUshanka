const db = require('../db');


var saveComments = function (req, res) {
  console.log('req.body ', req.body);
  var postContent = req.body;
  db.query("INSERT INTO comments (text_comment, id_post) VALUES (?, ?)", [postContent.post_text, postContent.id_post], function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
}

var fetchComments = function (req, res) {
  console.log('in the post controller, running fetchPosts', req);
  db.query("SELECT * FROM comments WHERE id_post =?", [req.query.id], function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
}

exports.fetchComments = fetchComments;
exports.saveComments = saveComments;