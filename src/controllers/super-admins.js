import SuperAdmins from '../models/Super-admins';

const getAllSuperAdmins = async (req, res) => {
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

export default { getAllSuperAdmins };
