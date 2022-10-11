const fs = require('fs');
const employees = require('../data/employees.json');

export const getEmployees = (req, res) => {
  const queryParams = req.query;

  let filterdList = employees;
  if (Object.keys(queryParams).length > 0) {
    const filterById = queryParams.id;
    const filterByName = queryParams.first_name;
    const filterByDni = queryParams.dni;
    filterdList = employees.filter((user) => Object.keys(user) === Object.keys(queryParams));

    if (filterById) {
      filterdList = employees.filter((user) => user.id.includes(filterById));
    }
    if (filterByName) {
      filterdList = employees.filter((user) => user.first_name.includes(filterByName));
    }
    if (filterByDni) {
      filterdList = employees.filter((user) => user.dni.includes(filterByName));
    }
  }
  res.status(200).json({
    user: filterdList,
  });
};

export const getEmployeeById = ((req, res) => {
  const userId = req.params.id;
  const foundUser = employees.find((user) => user.id === userId);
  if (foundUser) {
    res.status(200).json({
      user: foundUser,
    });
  } else {
    res.status(404).json({
      error: 'User dont found',
    });
  }
});

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

export const editEmployee = (req, res) => {
  const editedEmployees = employees.map((employee) => {
    if (employee.id === req.params.id) {
      return {
        id: employee.id,
        first_name: req.body.first_name || employee.first_name,
        last_name: req.body.last_name || employee.last_name,
        email: req.body.email || employee.email,
        password: req.body.password || employee.password,
        dni: req.body.dni || employee.dni,
        phone: req.body.phone || employee.phone,
        DateOfBirth: req.body.DateOfBirth || employee.DateOfBirth,
      };
    }
    return employee;
  });
  fs.writeFile('src/data/employees.json', JSON.stringify(editedEmployees, null, 2), () => {
    res.status(200).json({
      message: 'The employee was edited successfully',
    });
  });
};
