const pool = require("../config/postgres");
const getUUID= require("../utils/getuuid");
const {hashPassword}= require("../utils/hash");
class User {
  constructor( username, email, password) {
    
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // SAVE USER
  async save() {
    try {

      const password_after_hashed=await hashPassword(String(this.password));
      const query = `
        INSERT INTO users (id,username, email, password, created_at)
        VALUES ($1, $2, $3,$4, NOW())
      `;

      await pool.query(query, [getUUID(), this.username,this.email, password_after_hashed]);
       console.log("fine");
      return true; 
      // success
    } catch (err) {
      console.error(err);
      return false; // failure
    }
  }

  // GET USER BY EMAIL
  static async getUserByEmail(email) {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) return null;

      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  // GET USER BY ID
  static async getUserById(id) {
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );

      if (result.rows.length === 0) return null;

      return result.rows[0];
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

module.exports = User;