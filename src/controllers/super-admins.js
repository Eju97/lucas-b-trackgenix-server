import SuperAdmins from '../models/Super-admins';
import APIError from '../utils/APIError';
import firebase from '../helpers/firebase';

export const getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmin = await SuperAdmins.find(req.query);

    return res.status(200).json({
      message: 'Super Admins founded.',
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const editSuperAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdmin = await SuperAdmins.findById(id);
    await firebase.auth().updateUser(superAdmin.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });

    const result = await SuperAdmins.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!result) {
      throw new APIError({
        message: 'Super Admin not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: `Super Admin with ID ${id} edited.`,
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

export const getByIdSuperAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const superAdmin = await SuperAdmins.findById(id);
    if (!superAdmin) {
      throw new APIError({
        message: 'Super Admin not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Super admin found',
      data: superAdmin,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const deletedSuperAdmins = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SuperAdmins.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    const deleteFirebaseSuperAdmin = await firebase
      .auth()
      .deleteUser(result.firebaseUid);

    if (!result && !deleteFirebaseSuperAdmin) {
      throw new APIError({
        message: 'Super Admin not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: `Super Admin with ID ${id} deleted.`,
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

export const createSuperAdmin = async (req, res) => {
  try {
    const newFirebaseSuperAdmin = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase
      .auth()
      .setCustomUserClaims(newFirebaseSuperAdmin.uid, { role: 'SUPER_ADMIN' });

    const superAdmin = new SuperAdmins({
      name: req.body.name,
      last_name: req.body.last_name,
      email: req.body.email,
      firebaseUid: newFirebaseSuperAdmin.uid,
    });
    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Super Admin created',
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
