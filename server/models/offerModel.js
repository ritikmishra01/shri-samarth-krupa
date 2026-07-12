const pool = require('../config/db');

const OfferModel = {
  /**
   * Get all offers ordered by creation date descending.
   */
  async getAll() {
    const [rows] = await pool.query(
      'SELECT * FROM offers ORDER BY created_at DESC'
    );
    return rows;
  },

  /**
   * Get active offers only (public).
   */
  async getActive() {
    const [rows] = await pool.query(
      'SELECT * FROM offers WHERE is_active = 1 ORDER BY created_at DESC'
    );
    return rows;
  },

  /**
   * Get a single offer by ID.
   */
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM offers WHERE id = ?', [id]);
    return rows[0] || null;
  },

  /**
   * Create a new offer.
   */
  async create(data) {
    const { test_name, price, description, is_active } = data;
    const [result] = await pool.query(
      'INSERT INTO offers (test_name, price, description, is_active) VALUES (?, ?, ?, ?)',
      [
        test_name,
        price != null ? price : 0,
        description || null,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
      ]
    );
    return result.insertId;
  },

  /**
   * Update an existing offer.
   */
  async update(id, data) {
    const { test_name, price, description, is_active } = data;
    const [result] = await pool.query(
      'UPDATE offers SET test_name=?, price=?, description=?, is_active=? WHERE id=?',
      [
        test_name,
        price != null ? price : 0,
        description || null,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
        id,
      ]
    );
    return result.affectedRows;
  },

  /**
   * Delete an offer by ID.
   */
  async delete(id) {
    const [result] = await pool.query('DELETE FROM offers WHERE id = ?', [id]);
    return result.affectedRows;
  },
};

module.exports = OfferModel;
