const Task = require("../models/tasks");
const Scheduler = require("../services/scheduler");       
const Reminder = require("../models/reminder");          

async function deleteTask(req, res) {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const deletedTask = await Task.deleteTaskById(taskId, userId);
    console.log(deletedTask);

    if (!deletedTask) {
      return res.status(404).json({ message: "TASK_NOT_FOUND" });
    }

  
    Scheduler.cancel(taskId);

    
    await Reminder.deleteByTaskId(taskId);

    return res.status(200).json({
      message: "TASK_DELETED",
      task: deletedTask,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
}

module.exports = { deleteTask };