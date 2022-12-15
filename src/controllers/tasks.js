import Tasks from '../models/Tasks';
import APIError from '../utils/APIError';
import isValidObjectId from '../middlewares/idValidator';

export const getTaskList = async (req, res) => {
  try {
    const tasks = await Tasks.find(req.query);
    if (!tasks) {
      throw new APIError({
        message: 'Tasks not found',
        status: 404,
      });
    }
    if (tasks.length === 0) {
      return res.status(200).json({
        message: 'Tasks list is empty',
        data: tasks,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Tasks found successfully',
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
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Task ID',
        status: 400,
      });
    }
    const task = await Tasks.findById(id);

    if (!task) {
      throw new APIError({
        message: 'Task not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Task found successfully',
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
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Task ID',
        status: 400,
      });
    }
    const result = await Tasks.findByIdAndUpdate(id, {
      isDeleted: true,
    });

    if (!result) {
      throw new APIError({
        message: 'Task not found',
        status: 404,
      });
    }
    return res.status(204).json({
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
    if (!isValidObjectId(id)) {
      throw new APIError({
        message: 'Invalid Task ID',
        status: 400,
      });
    }
    const updatedTask = await Tasks.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) {
      throw new APIError({
        message: 'Task not found',
        status: 404,
      });
    }
    return res.status(200).json({
      message: 'Task updated successfully',
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
