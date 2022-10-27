import TimeSheets from '../models/Time-sheets';
import APIError from '../utils/APIError';

export const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheets.find(req.query)
      .populate('task')
      .populate('employee')
      .populate('project');
    return res.status(200).json({
      message: 'Time sheets found',
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
    const timeSheet = await TimeSheets.findById(req.params.id);

    if (!timeSheet) {
      throw new APIError({
        message: 'Time Sheet not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: 'Time sheet found',
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
      tasks: req.body.tasks,
      employee: req.body.employee,
      project: req.body.project,
    });
    const result = await newTimeSheet.save();
    return res.status(201).json({
      message: 'Time sheet created successfully',
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

export const editTimeSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TimeSheets.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
    );

    if (!result) {
      throw new APIError({
        message: 'Time Sheet not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: `Time sheet with id ${id} edited`,
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
    const result = await TimeSheets.findByIdAndDelete(id);

    if (!result) {
      throw new APIError({
        message: 'Time Sheet not found',
        status: 404,
      });
    }

    return res.status(200).json({
      message: `Time sheet with id ${id} deleted`,
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
