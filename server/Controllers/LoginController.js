const DB = require('../DB');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
const LoginController = {
  createAccount: (req, res) => {
    DB.query('SELECT `username` FROM `users` WHERE `username` = ?', [req.body.newUsername], (err, data) => {
      if (err) {
        res.send(err);
      } else {
        if (!data.length) {
          DB.query(`INSERT INTO users (full_name, username, password, profile_picture) 
              VALUES (?, ?, ?, ?) `, [req.body.fullName, req.body.newUsername, req.body.newPassword, req.body.profilePicture], (err, data) => {
            if (err) {
              console.log('Datafromcontroller', data, err);
              res.send(err);
            } else {
              req.session.userId = data.insertId;
              res.send({id: data.insertId});
            }
          });
        } else {
          res.send('exists');
        }
      }
    });
  },
  Login: (req, res) => {
    console.log('LOGIN CONTROLLER: ', req.params.username);
    DB.query('SELECT * FROM users WHERE username = ?', [req.params.username], (err, data) => {
      if (data.length) {
        bcrypt.compareAsync(req.params.password, data[0].password)
          .then(response => {
            
            if (response) {
              req.session.userId = data[0].id;
              console.log('setting stuff: ', req.session.userId);
              res.status(200).send({id: data[0].id});
            } else {
              res.send('wrong');
            }
          })
          .catch(err => {
            res.status(404).send('Request failed');
          });
      } else {
        res.send('wrong'); 
      }
    });
  }
};
module.exports = LoginController;