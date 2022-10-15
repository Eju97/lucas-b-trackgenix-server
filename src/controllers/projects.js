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
      message: 'Projects found',
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

// export const createProjects = (req, res) => {};

// export const deleteProjects = (req, res) => {};

// export const editProject = (req, res) => {};

// export const assignEmployee = (req, res) => {};
