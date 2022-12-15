import Projects from '../models/Projects';
import APIError from '../utils/APIError';
import isValidObjectId from '../middlewares/idValidator';

export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find(req.query).populate('employees.employee');
    if (!projects) {
      throw new APIError({
        message: 'Projects not found',
        status: 404,
      });
    }
    if (projects.length === 0) {
      return res.status(200).json({
        message: 'Projects list is empty',
        data: projects,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Projects found successfully',
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
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Project ID',
        status: 400,
      });
    }
    const project = await Projects.findById(id).populate('employees.employee');
    if (!project) {
      throw new APIError({
        message: 'Project not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Project found successfully',
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
      message: 'Project created successfully',
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
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Project ID',
        status: 400,
      });
    }
    const result = await Projects.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    if (!result) {
      throw new APIError({
        message: 'Project not found',
        status: 404,
      });
    }
    return res.status(204).json({
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
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Project ID',
        status: 400,
      });
    }
    const result = await Projects.findByIdAndUpdate(id, req.body, { new: true }).populate('employees.employee');
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
