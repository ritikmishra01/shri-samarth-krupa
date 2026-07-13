const pool = require('../config/db');

const AdminModel = {
  /**
   * Find admin by username (for login).
   */
  async findByUsername(username) {
    const [rows] = await pool.query(
      'SELECT * FROM admin_users WHERE username = ? LIMIT 1',
      [username]
    );
    return rows[0] || null;
  },

  /**
   * Find admin by email — alias to username lookup for compatibility.
   */
  async findByEmail(identifier) {
    // Try username first (our table uses username not email)
    const [rows] = await pool.query(
      'SELECT * FROM admin_users WHERE username = ? OR id = ? LIMIT 1',
      [identifier, identifier]
    );
    return rows[0] || null;
  },

  /**
   * Find admin by ID (excludes password).
   */
  async findById(id) {
    const [rows] = await pool.query(
      'SELECT id, username, role, created_at FROM admin_users WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Create a new admin account.
   */
  async create(username, hashedPassword, role = 'admin') {
    const [result] = await pool.query(
      'INSERT INTO admin_users (username, password, role) VALUES (?, ?, ?)',
      [username, hashedPassword, role]
    );
    return result.insertId;
  },

  /**
   * Update admin password by ID.
   */
  async updatePassword(id, hashedPassword) {
    const [result] = await pool.query(
      'UPDATE admin_users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows;
  },
};

module.exports = AdminModel;
