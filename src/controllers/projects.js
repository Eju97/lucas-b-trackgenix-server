import Projects from '../models/Projects';
import APIError from '../utils/APIError';

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find(req.query).populate('employees.employee');
    return res.status(200).json({
      message: 'Projects found',
      data: projects,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id).populate('employees.employee');
    if (!project) {
      throw new APIError({
        message: 'Project not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Project found',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
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
    await newProject.save();
    const project = await Projects.find(newProject).populate('employees.employee');
    return res.status(201).json({
      message: 'Project created',
      data: project,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndDelete(req.params.id);
    if (!result) {
      throw new APIError({
        message: 'Project not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Project deleted successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const editProject = async (req, res) => {
  try {
    const result = await Projects.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('employees.employee');
    if (!result) {
      throw new APIError({
        message: 'Project not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Project updated successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const assignEmployee = async (req, res) => {
  try {
    const result = await Projects.findByIdAndUpdate(
      req.params.id,
      { $push: { employees: req.body } },
      { new: true },
    ).populate('employees.employee');
    if (!result) {
      throw new APIError({
        message: 'Project not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Employee assigned to project successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
