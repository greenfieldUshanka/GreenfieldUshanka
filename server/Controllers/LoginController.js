const DB = require('../DB');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

const LoginController = {
  createAccount: (req, res) => {
    console.log('START LOGIN CONTROLLER', req.body.newPassword);
    bcrypt.genSaltAsync(10)
      .then(salt => {
        bcrypt.hashAsync(req.body.newPassword, salt, null)
          .then(hashedPassword => {
            console.log('Hash', hashedPassword);
            DB.query(`INSERT INTO users (full_name, username, password, profile_picture) 
                VALUES (?, ?, ?, ?) `, [req.body.fullName, req.body.newUsername, hashedPassword, req.body.profilePicture], (err, data) => {
              if (err) {
                console.log('Datafromcontroller', data, err);
              }
            });
          });
      });
  },
  Login: (req, res) => {
    DB.query('SELECT * FROM users WHERE username =?', [req.params.username], (err, data) => {
      if (data.length) {
        bcrypt.compareAsync(req.params.password, data[0].password)
          .then(response => {
            req.session.userId = data[0].id;
            console.log('setting stuff: ', req.session.id);
            res.status(200).send({id: data[0].id});
          })
          .catch(err => {
            res.status(404).send('Request failed');
          });
      }
    });

  }
};

module.exports = LoginController;