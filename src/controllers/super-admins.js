import SuperAdmins from '../models/Super-admins';

export const getAllSuperAdmins = async (req, res) => {
  try {
    const SuperAdmin = await SuperAdmins.find(req.query);
    if (!SuperAdmin.length) {
      return res.status(404).json({
        message: 'Super Admin not found',
        data: SuperAdmin,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Super Admins founded.',
      data: SuperAdmin,
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
    const SuperAdmin = await SuperAdmins.findById(id);
    if (!SuperAdmin) {
      return res.status(404).json({
        message: 'Super Admin not found',
        data: SuperAdmin,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Super admin found',
      data: SuperAdmin,
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
      message: error,
      data: undefined,
      error: true,
    });
  }
};
