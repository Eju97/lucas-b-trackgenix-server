import TimeSheets from '../models/Time-sheets';

export const getAllTimeSheets = async (req, res) => {
  try {
    const timeSheets = await TimeSheets.find();
    return res.status(200).json({
      message: 'Time sheet found',
      data: timeSheets,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'an error ocurred',
      error: err,
    });
  }
};

export const editTimeSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TimeSheets.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    return res.status(200).json({
      message: `Time sheet with id ${id} edited`,
      data: result,
      error: false,
    });
  } catch (err) {
    return res.json({
      message: 'Time sheet not found',
      error: err,
    });
  }
};
