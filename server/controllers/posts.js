const db = require('../db');

var savePosts = function (req, res) {
  var postContent = req.body;
  db.query('INSERT INTO posts (post_text, id_author, id_wall) VALUES (?, ?, ?)',
    [postContent.postText, postContent.idAuthor, postContent.idWall],
    function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
};

var fetchPosts = function (req, res) {
  db.query('SELECT posts.id, post_text, posts.created_at, users.full_name FROM posts INNER JOIN users ON id_author = users.id ORDER BY created_at DESC LIMIT 5', function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data.map(row => {
        console.log(row);
        return {
          id: row.id,
          postText: row.post_text,
          createdAt: row.created_at,
          idAuthor: row.full_name
        };
      }));
    }
  });
};

exports.fetchPosts = fetchPosts;
exports.savePosts = savePosts;