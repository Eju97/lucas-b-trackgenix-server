const fs = require('fs');
const admins = require('../data/admins.json');

export const postAdmins = (req, res) => {
  const user = {
    id: req.body.id,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    date_of_birth: req.body.date_of_birth,
    DNI: req.body.DNI,
    Phone: req.body.Phone,
  };
  const newAdmins = [...admins, user];
  if (!user.email || !user.first_name || !user.last_name
          || !user.date_of_birth || !user.DNI || !user.Phone) {
    res.status(404).json({
      error: 'Cannot create an admin. Invalid body params',
    });
  } else {
    fs.writeFile('src/data/admins.json', JSON.stringify(newAdmins, null, 2), () => {
      res.status(200).json({
        message: 'Created new admin',
      });
    });
  }
};

export const deleteAdmins = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const deleteUser = admins.filter((admin) => admin.id !== userId);
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
export const filterAdmin = (req, res) => {
  const filters = req.query;
  const filteredUsers = admins.filter((user) => {
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
