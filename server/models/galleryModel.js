const pool = require('../config/db');

const GalleryModel = {
  /**
   * Get gallery items with optional category filter and pagination.
   */
  async getAll({ category, page = 1, limit = 20 } = {}) {
    let baseQuery = 'FROM gallery WHERE 1=1';
    const params = [];

    if (category) {
      baseQuery += ' AND category = ?';
      params.push(category);
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
   * Get a single gallery item by ID.
   */
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM gallery WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Create a new gallery item.
   */
  async create(data) {
    const { title, category, image_url } = data;
    const [result] = await pool.query(
      'INSERT INTO gallery (title, category, image_url) VALUES (?, ?, ?)',
      [title || null, category || 'reception', image_url]
    );
    return result.insertId;
  },

  /**
   * Delete a gallery item by ID.
   */
  async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM gallery WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = GalleryModel;
