import Projects from '../models/Projects';

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find(req.query);
    if (!projects.length) {
      return res.status(404).json({
        message: 'There are no projects available',
        data: projects,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Projects found',
      data: projects,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error occurred: ${err}`,
      data: undefined,
      error: true,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        message: 'Project does not exist',
        data: project,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Project found',
      data: project,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error occurred: ${err}`,
      data: undefined,
      error: true,
    });
  }
};

export const createProjects = async (req, res) => {
  try {
    const newProject = await Projects.create({
      name: req.body.name,
      clientName: req.body.clientName,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      employees: req.body.employees,
    });
    const result = await newProject.save();
    return res.status(201).json({
      message: 'Project created',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error occurred: ${err}`,
      data: undefined,
      error: true,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        message: 'Project does not exist',
        data: result,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Project deleted successfully',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error occurred: ${err}`,
      data: undefined,
      error: true,
    });
  }
};

export const editProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({
        message: 'Project does not exist',
        data: result,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Project updated successfully',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: `An error occurred: ${err}`,
      data: undefined,
      error: true,
    });
  }
};
