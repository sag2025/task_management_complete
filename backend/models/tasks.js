
const pool = require("../config/postgres");
const getUUID = require("../utils/getuuid");

class Task {
  constructor(
    user_id,
    title,
    description,
    due_date,

    status = "pending",
    category = null,
    tags = []
  ) {
    this.user_id = user_id;
    this.title = title;
    this.description = description;
    this.due_date = new Date(due_date).toISOString();
    this.status = status;

    // NORMALIZATION (IMPORTANT FIX)
    this.category = category ? category.toLowerCase() : null;

    this.tags = Array.isArray(tags)
      ? tags.map(t => t.toLowerCase())
      : [];
  }

  // =========================
  // CREATE TASK
  // =========================
  async save() {
    try {
      const id = getUUID();
    

      const query = `
        INSERT INTO tasks (
          id,
          user_id,
          title,
          description,
          due_date,
          status,
          category,
          tags,
          created_at,
          updated_at
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW(),NOW())
        RETURNING *
      `;

      const values = [
        id,
        this.user_id,
        this.title,
        this.description,
        this.due_date,
        this.status,
        this.category,
        this.tags || [],
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error("SAVE ERROR:", err);
      return null;
    }
  }

  // =========================
  // GET ALL TASKS
  // =========================
  static async getAllTasks(user_id) {
    try {
      const query = `
        SELECT * FROM tasks
        WHERE user_id = $1
        ORDER BY created_at DESC
      `;

      const result = await pool.query(query, [user_id]);
      return result.rows;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  // =========================
  // GET TASK BY ID
  // =========================
  static async getTaskById(task_id, user_id) {
    try {
      const query = `
        SELECT * FROM tasks
        WHERE id = $1 AND user_id = $2
      `;

      const result = await pool.query(query, [task_id, user_id]);
      return result.rows[0] || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // =========================
  // DELETE TASK
  // =========================
  static async deleteTaskById(task_id, user_id) {
    try {
      const query = `
        DELETE FROM tasks
        WHERE id = $1 AND user_id = $2
        RETURNING *
      `;

      const result = await pool.query(query, [task_id, user_id]);
      return result.rows[0] || null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }



static async updateTaskById(task_id, user_id, fields) {
  try {
    if (!fields || typeof fields !== "object") {
      throw new Error("Invalid fields");
    }

    
    const cleanedFields = {};

    for (let key in fields) {
      let value = fields[key];

      if (value === "" || value === null || value === undefined) continue;

      // normalize
      if (key === "category") {
        value = value.toLowerCase();
      }

      if (key === "tags") {
        if (typeof value === "string") {
          value = value.split(",");
        }

        if (Array.isArray(value)) {
          value = value
            .map(t => t.toLowerCase().trim())
            .filter(t => t.length > 0);
        }
      }

      cleanedFields[key] = value;
    }

    const keys = Object.keys(cleanedFields);
    if (keys.length === 0) return null;

    const setQuery = keys
      .map((key, i) => {
        if (key === "tags") {
          return `${key} = $${i + 1}::text[]`;
        }
        return `${key} = $${i + 1}`;
      })
      .join(", ");

    const values = Object.values(cleanedFields);

    const query = `
      UPDATE tasks
      SET ${setQuery}, updated_at = NOW()
      WHERE id = $${keys.length + 1}
      AND user_id = $${keys.length + 2}
      RETURNING *
    `;

    const result = await pool.query(query, [
      ...values,
      task_id,
      user_id,
    ]);

    return result.rows[0] || null;
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    throw err; 
  }
}




  // =========================
  // FILTER TASKS
  // =========================
  static async getTasksByFilters(user_id, category, tags) {
    try {
      let query = `
        SELECT * FROM tasks
        WHERE user_id = $1
      `;

      const values = [user_id];

      // CATEGORY FILTER
      if (category) {
        values.push(category.toLowerCase());
        query += ` AND LOWER(category) = $${values.length}`;
      }

      // TAGS FILTER (ARRAY OVERLAP)
      if (tags && tags.length > 0) {
        const cleanTags = Array.isArray(tags)
          ? tags
          : tags.split(",").map(t => t.trim().toLowerCase());

        values.push(cleanTags);
        query += ` AND tags && $${values.length}::text[]`;
      }

      query += ` ORDER BY created_at DESC`;

      const result = await pool.query(query, values);
      return result.rows;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  // =========================
  // UNIQUE CATEGORIES
  // =========================
  static async getUniqueCategories(user_id) {
    try {
      const query = `
        SELECT DISTINCT category
        FROM tasks
        WHERE user_id = $1 AND category IS NOT NULL
      `;

      const result = await pool.query(query, [user_id]);
      return result.rows.map(r => r.category);
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  // =========================
  // UNIQUE TAGS
  // =========================
  static async getUniqueTags(user_id) {
    try {
      const query = `
        SELECT DISTINCT unnest(tags) AS tag
        FROM tasks
        WHERE user_id = $1 AND tags IS NOT NULL
      `;

      const result = await pool.query(query, [user_id]);

      return result.rows
        .map(r => r.tag)
        .filter(Boolean);
    } catch (err) {
      console.error(err);
      return [];
    }
  }
}

module.exports = Task;