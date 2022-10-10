const fs = require('fs');
const employees = require('../data/employees.json');

export const getAllEmployees = (req, res) => {
  res.status(200).json({
    data: employees,
  });
};

export const createEmployees = (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.status(400).json({
        error: 'Could not create employee',
      });
    } else {
      res.status(200).json({
        message: 'The employee was created successfully',
      });
    }
  });
};

export const deleteEmployees = (req, res) => {
  const userId = req.params.id;
  let deleteUser = employees;
  deleteUser = employees.filter((user) => user.id !== userId);
  fs.writeFile('src/data/employees.json', JSON.stringify(deleteUser), (err) => {
    if (err) {
      res.send('Cannot deleted user');
    } else {
      res.status(200).json({
        message: 'Employee deleted',
      });
    }
  });
};
