const db = require('../db');


var fetchPosts = function(req, res) {
  var postContent = req.body;
    db.query("INSERT INTO posts (post_text) VALUES (?)", [postContent], function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send(data);
      }
    });
}

// app.post('/posts', function(req, res) {
//   var postContent = req.body;
//   console.log(postContent);
//   // connection.query('INSERT INTO posts (post_text) VALUES (?)', [], function(err, results) {
//   //   if (err) throw err;
//   //   res.send('Successfully added to the database!', results);
//   // });
// });


// createAccount: ( req, res ) => {
//         console.log('START LOGIN C', req.body.newPassword)
//         bcrypt.genSalt(10) 
//         .then( salt => {
//             bcrypt.hash(req.body.newPassword, salt)
//             .then( hashedPassword => {
//                 console.log('Hash', hashedPassword)
//                 DB.query(`INSERT INTO users (full_name, username, password, profile_picture) 
//                 VALUES (?, ?, ?, ?) `, [req.body.fullName, req.body.newUsername, hashedPassword, req.body.profilePicture], (err, data) => {
//                     if ( err ) {
//                         console.log('Datafromcontroller', data, err) 
//                     }
//                 })
//             })
//         })
//     }

exports.fetchPosts = fetchPosts;