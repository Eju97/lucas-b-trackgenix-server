import Tasks from '../models/Tasks';
import APIError from '../utils/APIError';

export const getTaskList = async (req, res) => {
  try {
    const tasks = await Tasks.find(req.query);

    return res.status(200).json({
      message: 'Tasks found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);

    if (!task) {
      throw new APIError({
        message: 'Task not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Tasks found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const createNewTask = async (req, res) => {
  try {
    const task = new Tasks({
      description: req.body.description,
    });

    const result = await task.save();
    return res.status(201).json({
      message: 'Task created successfully',
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

export const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Tasks.findByIdAndDelete(id);

    if (!result) {
      throw new APIError({
        message: 'Task not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: `Task with Id ${id} deleted`,
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

export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Tasks.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) {
      throw new APIError({
        message: 'Task not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: `Task with Id ${id} updated`,
      data: updatedTask,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
