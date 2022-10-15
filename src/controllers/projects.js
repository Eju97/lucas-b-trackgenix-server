import Projects from '../models/Projects';

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    return res.status(200).json({
      message: 'Projects found',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      error,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    return res.status(200).json({
      message: 'Project found',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has ocurred',
      error,
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
      message: 'An error has ocurred',
      error: err,
    });
  }
};

// export const deleteProjects = (req, res) => {};

// export const editProject = (req, res) => {};

// export const assignEmployee = (req, res) => {};
