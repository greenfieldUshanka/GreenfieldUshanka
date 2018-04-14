

const getSession = (req, res) => {
  res.status(200).send({id: req.session.userId});
};

const logout = (req, res) => {
  req.session.destroy(err => {
    console.log('Logout error');
  });
};

module.exports.getSession = getSession;
module.exports.logout = logout;