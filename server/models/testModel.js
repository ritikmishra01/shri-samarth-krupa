const pool = require('../config/db');

const TestModel = {
  /**
   * Get all tests with optional search, category filter and pagination.
   */
  async getAll({ search, category, page = 1, limit = 20 } = {}) {
    let baseQuery = 'FROM tests WHERE 1=1';
    const params = [];

    if (search) {
      baseQuery += ' AND (name LIKE ? OR description LIKE ? OR category LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
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
      `SELECT * ${baseQuery} ORDER BY name ASC LIMIT ? OFFSET ?`,
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
   * Get a single test by ID.
   */
  async getById(id) {
    const [rows] = await pool.query('SELECT * FROM tests WHERE id = ?', [id]);
    return rows[0] || null;
  },

  /**
   * Create a new test.
   */
  async create(data) {
    const { name, category, description, preparation, sample_type, price, is_active } = data;
    const [result] = await pool.query(
      `INSERT INTO tests
         (name, category, description, preparation, sample_type, price, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        category || null,
        description || null,
        preparation || null,
        sample_type || null,
        price != null ? price : 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
      ]
    );
    return result.insertId;
  },

  /**
   * Update an existing test.
   */
  async update(id, data) {
    const { name, category, description, preparation, sample_type, price, is_active } = data;
    const [result] = await pool.query(
      `UPDATE tests SET
         name=?, category=?, description=?, preparation=?,
         sample_type=?, price=?, is_active=?
       WHERE id=?`,
      [
        name,
        category || null,
        description || null,
        preparation || null,
        sample_type || null,
        price != null ? price : 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
        id,
      ]
    );
    return result.affectedRows;
  },

  /**
   * Delete a test by ID.
   */
  async delete(id) {
    const [result] = await pool.query('DELETE FROM tests WHERE id = ?', [id]);
    return result.affectedRows;
  },

  /**
   * Get all unique categories.
   */
  async getCategories() {
    const [rows] = await pool.query(
      'SELECT DISTINCT category FROM tests WHERE category IS NOT NULL ORDER BY category ASC'
    );
    return rows.map((r) => r.category);
  },
};

module.exports = TestModel;
