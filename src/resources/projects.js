const fs = require('fs');
const projects = require('../data/projects.json');

export const getAllProjects = (req, res) => {
  res.status(200).json({
    data: projects,
  });
};

export const createProjects = (req, res) => {
  const newProjects = req.body;
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
