import TimeSheets from '../models/Time-sheets';

export const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheets.find();
    return res.status(200).json({
      message: 'Time sheets found',
      data: timeSheets,
      error: false,
    });
  } catch (err) {
    return res.status(404).json({
      message: 'An error has ocurred',
      error: err,
    });
  }
};

export const getTimeSheetById = async (req, res) => {
  try {
    const timeSheet = await TimeSheets.findById(req.params.id);
    return res.status(200).json({
      message: 'Time sheet found',
      data: timeSheet,
      error: false,
    });
  } catch (err) {
    return res.status(404).json({
      message: 'An error has occured',
      error: err,
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
    });
    const result = await newTimeSheet.save();
    return res.status(201).json({
      message: 'Time sheet created successfully',
      data: result,
      error: false,
    });
  } catch (err) {
    return res.status(404).json({
      message: 'Time sheet cannot be created',
      error: err,
    });
  }
};
