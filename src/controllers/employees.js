import Employees from '../models/Employees';

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employees.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: 'Employee does not exists',
        error: false,
      });
    }
    return res.status(200).json({
      message: `Employee with ID ${id} deleted.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error has occurred',
      error,
    });
  }
};

export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Employees.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (!result) {
      return res.status(404).json({
        message: 'Employee does not exists',
        error: false,
      });
    }
    return res.status(200).json({
      message: `Employee with ID ${id} edited.`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: 'An error occurred',
      error,
    });
  }
};
