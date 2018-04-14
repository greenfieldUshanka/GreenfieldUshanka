const DB = require('../DB');

const PersonalInfoController = {
  GetProfileInformation: (req, res) => {
    DB.query('SELECT * from users WHERE id=?', [req.params.id], (err, data) => {
      if (err) { console.log('Error from personalInfo', err); }
      res.status(200).send({
        username: data[0].username, 
        profilePic: data[0].profile_picture, 
        work: data[0].work, 
        join: data[0].created_at,
        vodka: data[0].vodka_consumption
      });
    });
  },
  SaveUpdatedProfile: (req, res) => {
    
  }


};

module.exports = PersonalInfoController; 
