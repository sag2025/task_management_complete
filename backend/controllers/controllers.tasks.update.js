const Task = require("../models/tasks");
const ReminderService = require("../services/reminder.service"); 

async function updateTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    console.log("TASK ID:", taskId);
    console.log("USER ID:", userId);
    console.log("BODY:", req.body);

    const updatedTask = await Task.updateTaskById(
      taskId,
      userId,
      req.body
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "TASK_NOT_FOUND" });
    }

    
    await ReminderService.handleTask(updatedTask);

    return res.status(200).json({
      message: "TASK_UPDATED",
      task: updatedTask,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
}

module.exports = { updateTask };