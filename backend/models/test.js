require("dotenv").config({ path: "../.env" });

const pool = require("../config/postgres");

console.log("ENV CHECK:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  db: process.env.DB_NAME,
  pass: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(client => {
    console.log("✅ Database connected");
    client.release();
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err.message);
  });

const Reminder = require("../models/reminder");

(async () => {
  const r = new Reminder("550e8400-e29b-41d4-a716-446655440000", new Date());
  const saved = await r.save();

  console.log(saved);
})();