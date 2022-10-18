import Admins from '../models/Admins';

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admins.find(req.query);
    if (!admins.length) {
      return res.status(404).json({
        message: 'Cannot find admins with this query params',
        data: {},
        error: true,
      });
    }

    return res.status(200).json({
      message: 'Admin/s found',
      data: admins,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has occurred',
      data: undefined,
      error: true,
    });
  }
};

export const getAdminsbyId = async (req, res) => {
  try {
    const filteredAdmin = await Admins.findById(req.params.id);
    if (!filteredAdmin) {
      return res.status(404).json({
        message: `Cannot find admin with ID ${req.params.id}`,
        data: {},
        error: true,
      });
    }
    return res.status(200).json({
      message: 'Admin found',
      data: filteredAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has occurred',
      data: undefined,
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
    return res.status(400).json({
      message: 'An error has occured',
      data: undefined,
      error: true,
    });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Admins.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        message: `Cannot find admin with ID ${id}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json({
      message: 'Admin deleted',
      data: deleted,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has occurred',
      data: undefined,
      error: true,
    });
  }
};

export const editAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const edited = await Admins.findByIdAndUpdate(id, req.body, { new: true });
    return !edited
      ? res.status(404).json({
        message: `Cannot find admin with ID ${id}`,
        data: undefined,
        error: true,
      })
      : res.status(201).json({
        message: 'Admin updated',
        data: edited,
        error: false,
      });
  } catch (error) {
    return res.status(400).json({
      message: 'An error has occurred',
      data: undefined,
      error: true,
    });
  }
};
