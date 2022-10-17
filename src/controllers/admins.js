import Admins from '../models/Admins';

const fs = require('fs');
const admins = require('../data/admins.json');

export const getAdminsbyId = async (req, res) => {
  try {
    const filteredAdmin = await Admins.findById(req.params.id);
    if (!filteredAdmin) {
      return res.status(404).json({
        message: `Cannot find admin with ID ${req.params.id}`,
        data: {},
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Admin found',
      data: filteredAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has occured',
      data: undefined,
      error: true,
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

export const createAdmin = async (req, res) => {
  try {
    const admin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await admin.save();
    return res.status(201).json({
      message: 'Project created successfully.',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has occured',
      data: undefined,
      error: true,
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
