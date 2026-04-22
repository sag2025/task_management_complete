const axios = require("axios");
const Task = require("../models/tasks");

class WebhookService {
  static async send(taskId, userId, attempt = 1) {
    try {
      const task = await Task.getTaskById(taskId, userId);

      if (!task) return;

      const payload = {
        id: task.id,
        title: task.title,
        status: task.status,
        due_date: task.due_date,
        user_id: task.user_id,
        triggered_at: new Date(),
      };

      await axios.post(process.env.WEBHOOK_URL, payload);

      console.log("📡 Webhook sent:", taskId);

    } catch (err) {
      console.error(` Webhook failed (attempt ${attempt})`, err.message);

      // =========================
      // RETRY LOGIC
      // =========================
      if (attempt < 3) {
        const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s

        console.log(`🔁 Retrying webhook in ${delay}ms...`);

        setTimeout(() => {
          WebhookService.send(taskId, userId, attempt + 1);
        }, delay);

      } else {
        console.log(" Webhook permanently failed:", taskId);
      }
    }
  }
}

module.exports = WebhookService;