const projects = require('../data/projects.json');

export const getProjects = (req, res) => {
  const queryParams = req.query;

  let filterdList = projects;
  if (Object.keys(queryParams).length > 0) {
    const filterById = queryParams.id;
    const filterByName = queryParams.name;
    const filterByClientName = queryParams.clientName;
    filterdList = projects.filter((user) => Object.keys(user) === Object.keys(queryParams));

    if (filterById) {
      filterdList = projects.filter((user) => user.id.includes(filterById));
    }
    if (filterByName) {
      filterdList = projects.filter((user) => user.name.includes(filterByName));
    }
    if (filterByClientName) {
      filterdList = projects.filter((user) => user.clientName.includes(filterByName));
    }
  }
  res.status(200).json({
    data: filterdList,
  });
};

export const getProjectById = ((req, res) => {
  const projectID = req.params.id;
  const foundProject = projects.find((user) => user.id === projectID);
  if (foundProject) {
    res.status(200).json({
      data: foundProject,
    });
  } else {
    res.status(404).json({
      error: 'Data dont found',
    });
  }
});
