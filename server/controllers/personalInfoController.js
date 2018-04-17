const DB = require('../DB');

const PersonalInfoController = {
  GetProfileInformation: (req, res) => {
    console.log('PERSONAL INFORMATION CONTROLLER', req.body.id)
    DB.query('SELECT * from users WHERE id=?', [req.params.id], (err, data) => {
      if (err) { console.log('Error from personalInfo', err); }
      res.status(200).send({
        username: data[0].username, 
        profilePic: data[0].profile_picture, 
        work: data[0].work, 
        join: data[0].created_at,
        vodka: data[0].vodka_consumption,
        status: data[0].status,
        extra: data[0].txt
      });
    });
  },
  SaveUpdatedProfile: (req, res) => {
    DB.query(`UPDATE users SET work = ? , vodka_consumption = ? , txt = ? , status = ? WHERE id = ?`, 
    [req.body.work, req.body.vodka, req.body.extra, req.body.status, req.body.id], (err, data) => {
      if (err) {console.log('Error from personalInfoController', err); }
      res.status(200).send('Succes')
    }); 
  }
};

module.exports = PersonalInfoController; 
