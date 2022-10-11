const fs = require('fs');
const employees = require('../data/employees.json');

export const getEmployees = (req, res) => {
  const queryParams = req.query;
  let filterdList = employees;
  if (Object.keys(queryParams).length > 0) {
    const filterByEmail = queryParams.email;
    const filterByName = queryParams.first_name;
    const filterByDni = queryParams.dni;
    filterdList = employees.filter((user) => Object.keys(user) === Object.keys(queryParams));
    if (filterByEmail) {
      filterdList = employees.filter((user) => user.email.includes(filterByEmail));
    }
    if (filterByName) {
      filterdList = employees.filter((user) => user.first_name.includes(filterByName));
    }
    if (filterByDni) {
      filterdList = employees.filter((user) => user.dni.toString().includes(filterByDni));
    }
  }
  res.status(200).json({
    user: filterdList,
  });
};

export const getEmployeeById = ((req, res) => {
  const userId = parseInt(req.params.id, 10);
  const foundUser = employees.find((user) => user.id === userId);
  if (foundUser) {
    res.status(200).json({
      user: foundUser,
    });
  } else {
    res.status(404).json({
      error: 'User not found',
    });
  }
});

export const createEmployees = (req, res) => {
  const newEmployee = {
    ...req.body,
    id: parseInt(new Date().getTime().toString().substring(6), 10),
  };
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
  const userId = parseInt(req.params.id, 10);
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

export const editEmployee = (req, res) => {
  const editedEmployees = employees.map((employee) => {
    if (employee.id === parseInt(req.params.id, 10)) {
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
