const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

const allSuperAdmins = (req, res) => {
  res.status(200).json({
    data: superAdmins,
  });
};
export default allSuperAdmins;
