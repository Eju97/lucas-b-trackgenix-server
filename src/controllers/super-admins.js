import SuperAdmins from '../models/Super-admins';

export const getAllSuperAdmins = async (req, res) => {
  try {
    const SuperAdmin = await SuperAdmins.find();
    return res.status(200).json({
      message: 'Super Admins founded.',
      data: SuperAdmin,
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

export const getByIdSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const SuperAdmin = await SuperAdmins.findById(id);
    return res.status(200).json({
      message: 'Super admin found',
      data: SuperAdmin,
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
