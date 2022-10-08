const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

export const getAllSuperAdmins = (req, res) => {
  res.status(200).json({
    data: superAdmins,
  });
};

export const getSuperAdminsId = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const findUser = superAdmins.find((user) => user.id === userId);
  if (findUser) {
    res.status(200).json({
      data: findUser,
    });
  } else {
    res.status(404).json({
      error: 'User not found',
    });
  }
};

export const editSuperAdmins = (req, res) => {
  const newSuperAdmins = superAdmins.map((superAdmin) => {
    if (superAdmin.id === parseInt(req.params.id, 10)) {
      return {
        ...req.body,
        id: parseInt(req.params.id, 10),
      };
    }
    return superAdmin;
  });
  fs.writeFile('src/data/super-admins.json', JSON.stringify(newSuperAdmins, null, 2), () => {
    res.status(200).json({
      message: 'The super admin was modified',
    });
  });
};
