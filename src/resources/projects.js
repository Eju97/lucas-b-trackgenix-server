const fs = require('fs');
const projects = require('../data/projects.json');
const employees = require('../data/employees.json');

export const createProjects = (req, res) => {
  const newProjects = {
    ...req.body,
    id: parseInt(new Date().getTime().toString().substring(6), 10),
  };
  projects.push(newProjects);
  fs.writeFile('src/data/projects.json', JSON.stringify(projects), (err) => {
    if (err) {
      res.status(400).json({
        error: 'Could not create project',
      });
    } else {
      res.status(200).json({
        message: 'The project was created successfully',
      });
    }
  });
};

export const deleteProjects = (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const deleteProject = projects.filter((project) => project.id !== projectId);
  fs.writeFile('src/data/projects.json', JSON.stringify(deleteProject), (err) => {
    if (err) {
      res.send('Cannot deleted project');
    } else {
      res.status(200).json({
        message: 'Project deleted',
      });
    }
  });
};
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

export const assignEmployee = (req, res) => {
  const getEmployeeById = (employeeId) => employees.find((employee) => employee.id === employeeId);
  const findProjectById = (projectId) => projects.find((project) => project.id === projectId);
  const selectedProject = findProjectById(req.params.id);
  const roles = ['PM', 'TL', 'DEV', 'QA'];
  if (!selectedProject) {
    return res.status(403).json({
      error: 'The project does not exist',
    });
  }
  if (!roles.includes(req.body.role)) {
    return res.status(403).json({
      error: 'The role is not supported',
    });
  }
  const employee = getEmployeeById(req.body.id);
  if (!employee) {
    return res.status(403).json({
      error: 'Employee not found',
    });
  }
  const newProjects = projects.map((project) => {
    if (project.id === req.params.id) {
      return {
        ...project,
        employees: [...project.employees, req.body],
      };
    }
    return project;
  });

  return fs.writeFile('src/data/projects.json', JSON.stringify(newProjects, null, 2), () => {
    res.status(200).json({
      message: 'The employee was assigned to the project successfully',
    });
  });
};
