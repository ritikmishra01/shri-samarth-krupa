const pool = require('../config/db');

/**
 * Parse the `includes` JSON field safely.
 */
const parseIncludes = (pkg) => {
  if (!pkg) return null;
  try {
    return {
      ...pkg,
      includes:
        typeof pkg.includes === 'string'
          ? JSON.parse(pkg.includes)
          : pkg.includes || [],
    };
  } catch {
    return { ...pkg, includes: [] };
  }
};

const PackageModel = {
  /**
   * Get all packages ordered by price ascending.
   */
  async getAll() {
    const [rows] = await pool.query(
      'SELECT * FROM packages ORDER BY price ASC'
    );
    return rows.map(parseIncludes);
  },

  /**
   * Get a single package by ID.
   */
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM packages WHERE id = ?',
      [id]
    );
    return parseIncludes(rows[0]) || null;
  },

  /**
   * Create a new package.
   */
  async create(data) {
    const { name, price, description, includes, is_featured, is_active } = data;
    const includesJson = Array.isArray(includes)
      ? JSON.stringify(includes)
      : typeof includes === 'string'
      ? includes
      : '[]';

    const [result] = await pool.query(
      `INSERT INTO packages (name, price, description, includes, is_featured, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        price != null ? price : 0,
        description || null,
        includesJson,
        is_featured ? 1 : 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
      ]
    );
    return result.insertId;
  },

  /**
   * Update an existing package.
   */
  async update(id, data) {
    const { name, price, description, includes, is_featured, is_active } = data;
    const includesJson = Array.isArray(includes)
      ? JSON.stringify(includes)
      : typeof includes === 'string'
      ? includes
      : '[]';

    const [result] = await pool.query(
      `UPDATE packages SET
         name=?, price=?, description=?, includes=?, is_featured=?, is_active=?
       WHERE id=?`,
      [
        name,
        price != null ? price : 0,
        description || null,
        includesJson,
        is_featured ? 1 : 0,
        is_active !== undefined ? (is_active ? 1 : 0) : 1,
        id,
      ]
    );
    return result.affectedRows;
  },

  /**
   * Delete a package by ID.
   */
  async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM packages WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = PackageModel;
