const fs = require('fs');
const admins = require('../data/admins.json');

export const getAllAdmins = (req, res) => {
  res.status(200).json({
    data: admins,
  });
};

export const getAdminsId = (req, res) => {
  const userID = parseInt(req.params.id, 10);
  const filterUserId = admins.find((user) => user.id === userID);
  if (filterUserId) {
    res.status(200).json({
      data: filterUserId,
    });
  } else {
    res.status(404).json({
      error: 'User not found',
    });
  }
};

export const editAdmins = (req, res) => {
  const newAdmins = admins.map((admin) => {
    if (admin.id === parseInt(req.params.id, 10)) {
      return {
        ...req.body,
        id: parseInt(req.params.id, 10),
      };
    }
    return admin;
  });
  fs.writeFile('src/data/admins.json', JSON.stringify(newAdmins, null, 2), () => {
    res.status(200).json({
      message: 'The admin was modified',
    });
  });
};
