import Tasks from '../models/Tasks';

export const getTaskList = async (req, res) => {
  try {
    const tasks = await Tasks.find(req.query);

    if (!tasks.length) {
      return res.status(404).json({
        message: 'Task not found',
        data: tasks,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Tasks found',
      data: tasks,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks.findById(id);

    if (!task) {
      return res.status(404).json({
        message: 'Task does not exists',
        data: task,
        error: false,
      });
    }
    return res.status(200).json({
      message: 'Tasks found',
      data: task,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred: ${error}`,
      data: undefined,
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
    return res.status(400).json({
      message: `An error occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};
export const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Tasks.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: `Task with Id ${id} does not exists`,
        data: undefined,
        error: false,
      });
    }

    return res.status(200).json({
      message: `Task with Id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};
export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Tasks.findByIdAndUpdate(id, req.body, { new: true });

    if (!update) {
      return res.status(404).json({
        message: `Task with Id ${id} does not exists`,
        data: undefined,
        error: false,
      });
    }

    return res.status(200).json({
      message: `Task with Id ${id} updated`,
      data: update,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `An error occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};
