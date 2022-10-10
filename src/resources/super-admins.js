const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

export const filterSuperAdmin = (req, res) => {
  const filters = req.query;
  const filteredUsers = superAdmins.filter((user) => {
    let isValid = true;
    let key;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (key in filters) {
      isValid = isValid && user[key] === filters[key];
    }
    return isValid;
  });
  if (filteredUsers.length !== 0) {
    res.status(200).json(filteredUsers);
  } else {
    res.status(404).json('Not found');
  }
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

export const postSuperAdmins = (req, res) => {
  const user = {
    id: req.body.id,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    DNI: req.body.DNI,
    Phone: req.body.Phone,
  };
  const newSuperAdmins = [...superAdmins, user];
  if (!user.email || !user.first_name || !user.last_name
          || !user.date_of_birth || !user.DNI || !user.Phone) {
    res.status(404).json({
      error: 'Cannot create a super admin. Invalid body params',
    });
  } else {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(newSuperAdmins, null, 2), () => {
      res.status(200).json({
        message: 'Created new super admin',
      });
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

export const deleteSuperAdmins = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const deleteUser = superAdmins.filter((admin) => admin.id !== userId);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(deleteUser), (err) => {
    if (err) {
      res.send('Cannot deleted user');
    } else {
      res.status(200).json({
        message: 'Super admin deleted',
      });
    }
  });
};
