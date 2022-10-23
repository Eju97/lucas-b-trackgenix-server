import SuperAdmins from '../models/Super-admins';

export const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmin = await SuperAdmins.find(req.query);
    if (!superAdmin.length) {
      return res.status(404).json({
        message: 'Super Admin not found',
        data: superAdmin,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Super Admins founded.',
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export const editSuperAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SuperAdmins.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({
      message: `Super Admin with ID ${id} edited.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export const getByIdSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdmin = await SuperAdmins.findById(id);
    if (!superAdmin) {
      return res.status(404).json({
        message: 'Super Admin not found',
        data: superAdmin,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Super admin found',
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export const deletedSuperAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SuperAdmins.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Super Admin with ID ${id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export const createSuperAdmin = async (req, res) => {
  try {
    const superAdmin = new SuperAdmins({
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });
    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Super Admin created',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};
