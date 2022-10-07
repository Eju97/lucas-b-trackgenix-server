const admins = require('../data/admins.json');

const getAllAdmins = (req, res) => {
  res.status(200).json({
    data: admins,
  });
};

export default getAllAdmins;
