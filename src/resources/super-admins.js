const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

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
