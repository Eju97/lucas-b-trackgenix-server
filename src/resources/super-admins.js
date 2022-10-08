const superAdmins = require('../data/super-admins.json');

export const allSuperAdmins = (req, res) => {
  res.status(200).json({
    data: superAdmins,
  });
};
export const singleSuperAdmin = (req, res) => {
  const found = superAdmins.some((superAdmins) => superAdmins.id === parseInt(req.params.id, 10));
  if (found) {
    res.json(superAdmins.filter((superAdmins) => superAdmins.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: 'Member not found' });
  }
};
