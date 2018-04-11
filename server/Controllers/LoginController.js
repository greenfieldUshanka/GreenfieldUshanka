const DB = require('../DB');
const bcrypt = require('bcrypt');

const LoginController = {
    createAccount: ( req, res ) => {
        console.log('START LOGIN C', req.body.newPassword)
        bcrypt.genSalt(10) 
        .then( salt => {
            bcrypt.hash(req.body.newPassword, salt)
            .then( hashedPassword => {
                console.log('Hash', hashedPassword)
                DB.query(`INSERT INTO users (full_name, username, password, profile_picture) 
                VALUES (?, ?, ?, ?) `, [req.body.fullName, req.body.newUsername, hashedPassword, req.body.profilePicture], (err, data) => {
                    if ( err ) {
                        console.log('Datafromcontroller', data, err) 
                    }
                })
            })
        })
    },
    Login: ( req, res ) => {
        DB.query(`SELECT * FROM users WHERE username =?`, [req.params.username], (err, data) => {
            if (response.length) {
                bcrypt.compare(req.params.password, data[0].password)
                .then( response => {
                    res.status(200).send('Valid Password')
                })
                .catch( err => {
                    res.status(404).send('Request failed')
                })
            }
        })

    }   
}

module.exports = LoginController;