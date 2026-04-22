const taskobj=require("../models/tasks");
const ReminderService = require("./reminder.service");


async function createtask(body, userId) {
  try {
    const new_task = new taskobj(
      userId,
      body.title,
      body.description,
      body.due_date,
      body.status,
      body.category,
      body.tags
    );

    const result = await new_task.save();

    if(result)
    {
       await ReminderService.handleTask(result);
    }
    return result;

  } catch (error) {
    console.log(error.message);
    return null;
  }
}

module.exports = createtask;