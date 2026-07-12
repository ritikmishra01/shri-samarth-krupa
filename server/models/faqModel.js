const pool = require('../config/db');

const FaqModel = {
  /**
   * Get active FAQs with optional category filter (public).
   */
  async getAll(category) {
    let query = 'SELECT * FROM faqs WHERE is_active = 1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY order_index ASC, id ASC';
    const [rows] = await pool.query(query, params);
    return rows;
  },

  /**
   * Get all FAQs regardless of is_active (admin view).
   */
  async getAllAdmin(category) {
    let query = 'SELECT * FROM faqs WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY order_index ASC, id ASC';
    const [rows] = await pool.query(query, params);
    return rows;
  },

  /**
   * Get a single FAQ by ID.
   */
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM faqs WHERE id = ?', [id]);
    return rows[0] || null;
  },

  /**
   * Create a new FAQ.
   */
  async create(data) {
    const { question, answer, category, order_index, is_active } = data;
    const [result] = await pool.query(
      'INSERT INTO faqs (question, answer, category, order_index, is_active) VALUES (?, ?, ?, ?, ?)',
      [
        question,
        answer,
        category || 'general',
        order_index != null ? order_index : 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
      ]
    );
    return result.insertId;
  },

  /**
   * Update an existing FAQ.
   */
  async update(id, data) {
    const { question, answer, category, order_index, is_active } = data;
    const [result] = await pool.query(
      'UPDATE faqs SET question=?, answer=?, category=?, order_index=?, is_active=? WHERE id=?',
      [
        question,
        answer,
        category || 'general',
        order_index != null ? order_index : 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
        id,
      ]
    );
    return result.affectedRows;
  },

  /**
   * Delete a FAQ by ID.
   */
  async delete(id) {
    const [result] = await pool.query('DELETE FROM faqs WHERE id = ?', [id]);
    return result.affectedRows;
  },

  /**
   * Get all unique categories.
   */
  async getCategories() {
    const [rows] = await pool.query(
      'SELECT DISTINCT category FROM faqs WHERE category IS NOT NULL ORDER BY category ASC'
    );
    return rows.map((r) => r.category);
  },
};

module.exports = FaqModel;
