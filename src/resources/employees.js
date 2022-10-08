const fs = require('fs');
const employees = require('../data/employees.json');

export const getAllEmployees = (req, res) => {
  res.send(JSON.stringify(employees));
};

export const createEmployees = (req, res) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  fs.writeFile('src/data/employees.json', JSON.stringify(employees), (err) => {
    if (err) {
      res.send('Could not create employee');
    } else {
      res.send('Employee created ');
    }
  });
};
