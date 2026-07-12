const pool = require('../config/db');

const TestimonialModel = {
  /**
   * Get all testimonials with optional status filter and pagination (admin).
   */
  async getAll({ status, page = 1, limit = 20 } = {}) {
    let baseQuery = 'FROM testimonials WHERE 1=1';
    const params = [];

    if (status) {
      baseQuery += ' AND status = ?';
      params.push(status);
    }

    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total ${baseQuery}`,
      params
    );
    const total = countRows[0].total;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const [rows] = await pool.query(
      `SELECT * ${baseQuery} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
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
   * Get only approved testimonials (public).
   */
  async getApproved() {
    const [rows] = await pool.query(
      "SELECT id, patient_name, rating, review, created_at FROM testimonials WHERE status = 'approved' ORDER BY created_at DESC"
    );
    return rows;
  },

  /**
   * Get a single testimonial by ID.
   */
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM testimonials WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Create a new testimonial (starts as 'pending').
   */
  async create(data) {
    const { patient_name, rating, review } = data;
    const [result] = await pool.query(
      "INSERT INTO testimonials (patient_name, rating, review, status) VALUES (?, ?, ?, 'pending')",
      [patient_name, rating || 5, review]
    );
    return result.insertId;
  },

  /**
   * Approve or reject a testimonial.
   */
  async updateStatus(id, status) {
    const [result] = await pool.query(
      'UPDATE testimonials SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows;
  },

  /**
   * Delete a testimonial by ID.
   */
  async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM testimonials WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = TestimonialModel;
