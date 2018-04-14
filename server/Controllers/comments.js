const db = require('../db');


var saveComments = function (req, res) {
  var postContent = req.body;
  db.query('INSERT INTO comments (text_comment, id_post) VALUES (?, ?)', [postContent.postText, postContent.idPost], function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

var fetchComments = function (req, res) {
  db.query('SELECT text_comment, created_at FROM comments WHERE id_post = ? ORDER BY id DESC',
    [req.query.id], function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

exports.fetchComments = fetchComments;
exports.saveComments = saveComments;