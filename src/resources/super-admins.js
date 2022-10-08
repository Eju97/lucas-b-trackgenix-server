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
    res.send(findUser);
  } else {
    res.send('user not find');
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
