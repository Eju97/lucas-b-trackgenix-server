const fs = require('fs');
const superAdmins = require('../data/super-admins.json');

export const allSuperAdmins = (req, res) => {
  res.status(200).json({
    data: superAdmins,
  });
};
export const singleSuperAdmin = (req, res) => {
  // eslint-disable-next-line no-shadow
  const found = superAdmins.some((superAdmins) => superAdmins.id === parseInt(req.params.id, 10));
  if (found) {
    // eslint-disable-next-line no-shadow
    res.json(superAdmins.filter((superAdmins) => superAdmins.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: 'Member not found' });
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
  superAdmins.push(user);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdmins), () => {
    if (!user.email || !user.first_name || !user.last_name
          || !user.date_of_birth || !user.DNI || !user.Phone) {
      res.send('Cannot save new user');
    } else {
      res.send('User created');
    }
  });
};
