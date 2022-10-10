const admins = require('../data/admins.json');

const filterAdmin = (req, res) => {
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

export default filterAdmin;
