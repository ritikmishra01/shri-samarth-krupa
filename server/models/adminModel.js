const pool = require('../config/db');

const AdminModel = {
  /**
   * Find admin by email (includes password for login comparison).
   */
  async findByEmail(email) {
    const [rows] = await pool.query(
      'SELECT * FROM admins WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0] || null;
  },

  /**
   * Find admin by ID (excludes password).
   */
  async findById(id) {
    const [rows] = await pool.query(
      'SELECT id, name, email, role, created_at FROM admins WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Create a new admin account.
   */
  async create(name, email, hashedPassword, role = 'admin') {
    const [result] = await pool.query(
      'INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );
    return result.insertId;
  },

  /**
   * Update admin password by ID.
   */
  async updatePassword(id, hashedPassword) {
    const [result] = await pool.query(
      'UPDATE admins SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows;
  },
};

module.exports = AdminModel;
