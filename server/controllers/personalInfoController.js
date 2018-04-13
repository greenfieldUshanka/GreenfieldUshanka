const DB = require('../DB');

const PersonalInfoController = {
  Status: (req, res) => {
    DB.query(`INSERT INTO users  FROM users WHERE id =?`, [req.body.id], (err, data) => {
      console.log(data[0]);
    })
  } 
}

module.exports = PersonalInfoController; 