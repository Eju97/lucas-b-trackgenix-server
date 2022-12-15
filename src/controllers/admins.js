import Admins from '../models/Admins';
import APIError from '../utils/APIError';
import firebase from '../helpers/firebase';
import isValidObjectId from '../middlewares/idValidator';

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admins.find(req.query);
    if (!admins) {
      throw new APIError({
        message: 'Admins not found',
        status: 404,
      });
    }
    if (admins.length === 0) {
      return res.status(200).json({
        message: 'Admins list is empty',
        data: admins,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Admins found successfully',
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
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Admin ID',
        status: 400,
      });
    }
    const filteredAdmin = await Admins.findById(id);
    if (!filteredAdmin) {
      throw new APIError({
        message: 'Admin not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Admin found successfully',
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
    const newFirebaseAdmin = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    await firebase
      .auth()
      .setCustomUserClaims(newFirebaseAdmin.uid, { role: 'ADMIN' });

    const admin = new Admins({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      firebaseUid: newFirebaseAdmin.uid,
    });
    const result = await admin.save();
    return res.status(201).json({
      message: 'Admin created successfully.',
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
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Admin ID',
        status: 400,
      });
    }
    const deleted = await Admins.findByIdAndUpdate(id, {
      isDeleted: true,
    });
    const deleteFirebaseAdmin = await firebase
      .auth()
      .updateUser(deleted.firebaseUid, {
        disabled: true,
      });

    if (!deleted && !deleteFirebaseAdmin) {
      throw new APIError({
        message: 'Admin not found',
        status: 404,
      });
    }

    return res.status(204).json({
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
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Admin ID',
        status: 400,
      });
    }
    const admin = await Admins.findById(id);
    await firebase.auth().updateUser(admin.firebaseUid, {
      email: req.body.email,
      password: req.body.password,
    });
    const edited = await Admins.findByIdAndUpdate(id, req.body, { new: true });
    if (!edited) {
      throw new APIError({
        message: 'Admin not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Admin updated successfully',
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
