import TimeSheets from '../models/Time-sheets';
import APIError from '../utils/APIError';
import isValidObjectId from '../middlewares/idValidator';

export const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheets.find(req.query).populate(
      'task project employee',
    );
    if (!timeSheets) {
      throw new APIError({
        message: 'Timesheets not found',
        status: 404,
      });
    }
    if (timeSheets.length === 0) {
      return res.status(200).json({
        message: 'Timesheets list is empty',
        data: timeSheets,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Timesheets found',
      data: timeSheets,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const getTimeSheetById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Timesheet ID',
        status: 400,
      });
    }
    const timeSheet = await TimeSheets.findById(id).populate(
      'task project employee',
    );
    if (!timeSheet) {
      throw new APIError({
        message: 'Timesheet not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: 'Timesheet found',
      data: timeSheet,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const createTimeSheet = async (req, res) => {
  try {
    const newTimeSheet = new TimeSheets({
      description: req.body.description,
      date: req.body.date,
      hours: req.body.hours,
      task: req.body.task,
      employee: req.body.employee,
      project: req.body.project,
    });
    const result = await newTimeSheet.save();
    const populatedResult = await result.populate('task project employee');
    return res.status(201).json({
      message: 'Timesheet created successfully',
      data: populatedResult,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const editTimeSheet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Timesheet ID',
        status: 400,
      });
    }
    const result = await TimeSheets.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('task project employee');
    if (!result) {
      throw new APIError({
        message: 'Timesheet not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: 'Timesheet updated successfully',
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

export const deleteTimeSheet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Timesheet ID',
        status: 400,
      });
    }
    const result = await TimeSheets.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    if (!result) {
      throw new APIError({
        message: 'Timesheet not found',
        status: 404,
      });
    }

    return res.status(204).json({
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
