const employee = require('../data/employees.json');

export const getEmployees = (req, res) => {
  res.status(200).json({
    data: employee,
  });
};

export const getEmployeeById = ((req, res) => {
  const userId = req.params.id;
  const foundUser = employee.find((user) => user.id === userId);
  if (foundUser) {
    res.send(foundUser);
  } else {
    res.send('User dont found');
  }
});

export const getEmployeeByFilter = ((req, res) => {
  const found = employee.some((user) => user.id === req.params.id);

  if (found) {
    res.json(employee.filter((user) => user.id === req.params.id));
  } else {
    res.status(400).json({ msg: 'Employee not found' });
  }
});
