const pool = require("../config/postgres");

class Reminder {
  constructor(task_id, remind_at) {
    this.task_id = task_id;
    this.remind_at = remind_at;
  }

  // =========================
  // SAVE / UPSERT
  // =========================
  async save() {
    try {
      const query = `
        INSERT INTO task_reminders (task_id, remind_at, created_at)
        VALUES ($1, $2, NOW())
        ON CONFLICT (task_id)
        DO UPDATE SET remind_at = $2
        RETURNING *
      `;

      const result = await pool.query(query, [
        this.task_id,
        this.remind_at
      ]);

      return result.rows[0];
    } catch (err) {
      console.error("REMINDER SAVE ERROR:", err);
      return null;
    }
  }

  // =========================
  // DELETE
  // =========================
  static async deleteByTaskId(task_id) {
    try {
      await pool.query(
        `DELETE FROM task_reminders WHERE task_id = $1`,
        [task_id]
      );
    } catch (err) {
      console.error("DELETE REMINDER ERROR:", err);
    }
  }

  // =========================
  // GET ALL (for restart later)
  // =========================
  static async getAll() {
    try {
      const result = await pool.query(`SELECT * FROM task_reminders`);
      return result.rows;
    } catch (err) {
      console.error("FETCH REMINDERS ERROR:", err);
      return [];
    }
  }
}

module.exports = Reminder;