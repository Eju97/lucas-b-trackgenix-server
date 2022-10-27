import Admins from '../models/Admins';
import APIError from '../utils/APIError';

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admins.find(req.query);

    return res.status(200).json({
      message: 'Admins found',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const getAdminsById = async (req, res) => {
  try {
    const filteredAdmin = await Admins.findById(req.params.id);
    if (!filteredAdmin) {
      throw new APIError({
        message: 'Admin not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Admin found',
      data: filteredAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const admin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await admin.save();
    return res.status(201).json({
      message: 'Project created successfully.',
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

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Admins.findByIdAndDelete(id);

    if (!deleted) {
      throw new APIError({
        message: 'Admin not found',
        status: 404,
      });
    }

    return res.status(201).json({
      message: 'Admin deleted',
      data: deleted,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const edited = await Admins.findByIdAndUpdate(id, req.body, { new: true });

    if (!edited) {
      throw new APIError({
        message: 'Admin not found',
        status: 404,
      });
    }
    return res.status(201).json({
      message: 'Admin updated',
      data: edited,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
