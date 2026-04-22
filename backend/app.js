const express = require("express");
const pool = require("./config/postgres");
require("dotenv").config();

const cors = require("cors");

const userRoutes = require("./routes/routes.user");
const taskRoutes = require("./routes/routes.tasks");

// ✅ IMPORTS FOR RECOVERY
const Reminder = require("./models/reminder");
const Scheduler = require("./services/scheduler");
const WebhookService = require("./services/webhook.service");
const Task = require("./models/tasks");

const app = express();
app.use(cors());
app.use(express.json());




pool.connect()
  .then(client => {
    console.log(" Database connected");
    client.release();
  })
  .catch(err => {
    console.error(" Database connection failed:", err.message);
  });



async function recoverReminders() {
  try {
    console.log(" Recovering reminders...");

    const reminders = await Reminder.getAll();

    for (const reminder of reminders) {
      const { task_id, remind_at } = reminder;

      const now = new Date();
      const remindTime = new Date(remind_at);

  
      if (remindTime <= now) {
        console.log(" Skipping expired:", task_id);

        // optional: cleanup DB
        await Reminder.deleteByTaskId(task_id);
        continue;
      }

      
      const task = await Task.getTaskById(task_id);

      if (!task) {
        await Reminder.deleteByTaskId(task_id);
        continue;
      }

      
      if (task.status === "completed") {
        await Reminder.deleteByTaskId(task_id);
        continue;
      }

    
      Scheduler.schedule(task_id, remindTime, async () => {
        console.log(" Recovered reminder triggered:", task_id);

        await WebhookService.send(task_id, task.user_id);
      });

      console.log(" Rescheduled:", task_id);
    }

    console.log(" Recovery complete");

  } catch (err) {
    console.error(" Recovery error:", err);
  }
}


// =========================
// ROUTES
// =========================
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Server running");
});


// =========================
// START SERVER + RECOVERY
// =========================
app.listen(3000, async () => {
  console.log(" Server running on port 3000");

  
  await recoverReminders();
});