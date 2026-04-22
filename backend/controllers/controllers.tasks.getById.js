const Task = require("../models/tasks");

async function getTaskById(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.id; // from JWT middleware

    const task = await Task.getTaskById(taskId, userId);

    if (!task) {
      return res.status(404).json({ message: "TASK_NOT_FOUND" });
    }

    return res.status(200).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "INTERNAL_SERVER_ERROR" });
  }
}

module.exports = { getTaskById };