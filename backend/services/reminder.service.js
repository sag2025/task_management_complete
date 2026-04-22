const Reminder = require("../models/reminder");
const Scheduler = require("./scheduler");
const WebhookService = require("./webhook.service");

class ReminderService {
  static async handleTask(task) {
    try {
      const { id, due_date, status, user_id } = task;

      
      if (status === "completed") {
        await Reminder.deleteByTaskId(id);
        Scheduler.cancel(id);
        return;
      }

      if (!due_date) return;

      const due = new Date((due_date));
      const now = new Date();
      console.log("inside remsinder",due,now);

      if (isNaN(due.getTime())) {
  console.log("❌ INVALID DATE:", due_date);
  return;
}


      if (due <= now) return;

      
      const remindAt = new Date(due.getTime() - 60 * 60 * 1000);

      // save in DB
      const reminder = new Reminder(id, remindAt);
      await reminder.save();

      // schedule in memory
      Scheduler.schedule(id, remindAt, async () => {
        console.log("🔔 Reminder:", id);

        await WebhookService.send(id, user_id);
      });

    } catch (err) {
      console.error("ReminderService error:", err);
    }
  }
}

module.exports = ReminderService;