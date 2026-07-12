const pool = require('../config/db');

const ContactModel = {
  /**
   * Get all contact messages with pagination.
   */
  async getAll({ page = 1, limit = 20 } = {}) {
    const [countRows] = await pool.query(
      'SELECT COUNT(*) as total FROM contact_messages'
    );
    const total = countRows[0].total;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const [rows] = await pool.query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [parseInt(limit), offset]
    );

    return {
      data: rows,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    };
  },

  /**
   * Get unread message count.
   */
  async getUnreadCount() {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0'
    );
    return rows[0].count;
  },

  /**
   * Get a single message by ID.
   */
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM contact_messages WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Create a new contact message (public submission).
   */
  async create(data) {
    const { name, email, mobile, subject, message } = data;
    const [result] = await pool.query(
      'INSERT INTO contact_messages (name, email, mobile, subject, message, is_read) VALUES (?, ?, ?, ?, ?, 0)',
      [name, email || null, mobile || null, subject || null, message]
    );
    return result.insertId;
  },

  /**
   * Delete a message by ID.
   */
  async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM contact_messages WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  },

  /**
   * Mark a message as read.
   */
  async markRead(id) {
    const [result] = await pool.query(
      'UPDATE contact_messages SET is_read = 1 WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = ContactModel;
