const db = require('../db');


var saveComments = function (req, res) {
  var postContent = req.body;
  db.query('INSERT INTO comments (text_comment, id_post, id_author) VALUES (?, ?, ?)',
    [postContent.postText, postContent.idPost, postContent.authorId], function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

var fetchComments = function (req, res) {
  db.query('SELECT text_comment, comments.created_at, users.full_name FROM comments ' +
    'INNER JOIN users ON id_author = users.id ' +
    'WHERE id_post = ? ORDER BY comments.created_at DESC',
    [req.query.id], function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(
        data.map(row => {
          console.log(row);
          return {
            textComment: row.text_comment,
            createdAt: row.created_at,
            author: row.full_name
          };
        })
      );
    }
  });
};

exports.fetchComments = fetchComments;
exports.saveComments = saveComments;