const pool = require('../config/db');

const AppointmentModel = {
  /**
   * Get all appointments with optional filters and pagination.
   */
  async getAll({ status, date, page = 1, limit = 20 } = {}) {
    let baseQuery = 'FROM appointments WHERE 1=1';
    const params = [];

    if (status) {
      baseQuery += ' AND status = ?';
      params.push(status);
    }
    if (date) {
      baseQuery += ' AND DATE(preferred_date) = ?';
      params.push(date);
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
   * Get single appointment by ID.
   */
  async getById(id) {
    const [rows] = await pool.query(
      'SELECT * FROM appointments WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  },

  /**
   * Create a new appointment.
   */
  async create(data) {
    const {
      patient_name,
      mobile,
      email,
      address,
      test_name,
      package_name,
      preferred_date,
      preferred_time,
      home_collection,
      notes,
    } = data;

    const [result] = await pool.query(
      `INSERT INTO appointments
        (patient_name, mobile, email, address, test_name, package_name,
         preferred_date, preferred_time, home_collection, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        patient_name,
        mobile,
        email || null,
        address || null,
        test_name || null,
        package_name || null,
        preferred_date,
        preferred_time || null,
        home_collection ? 1 : 0,
        notes || null,
      ]
    );
    return result.insertId;
  },

  /**
   * Update an existing appointment.
   */
  async update(id, data) {
    const {
      patient_name,
      mobile,
      email,
      address,
      test_name,
      package_name,
      preferred_date,
      preferred_time,
      home_collection,
      notes,
      status,
    } = data;

    const [result] = await pool.query(
      `UPDATE appointments SET
        patient_name=?, mobile=?, email=?, address=?, test_name=?,
        package_name=?, preferred_date=?, preferred_time=?,
        home_collection=?, notes=?, status=?
       WHERE id=?`,
      [
        patient_name,
        mobile,
        email || null,
        address || null,
        test_name || null,
        package_name || null,
        preferred_date,
        preferred_time || null,
        home_collection ? 1 : 0,
        notes || null,
        status || 'pending',
        id,
      ]
    );
    return result.affectedRows;
  },

  /**
   * Delete an appointment by ID.
   */
  async delete(id) {
    const [result] = await pool.query(
      'DELETE FROM appointments WHERE id = ?',
      [id]
    );
    return result.affectedRows;
  },

  /**
   * Update appointment status only.
   */
  async updateStatus(id, status) {
    const [result] = await pool.query(
      'UPDATE appointments SET status = ? WHERE id = ?',
      [status, id]
    );
    return result.affectedRows;
  },

  /**
   * Count appointments grouped by month (last 12 months) — for charts.
   */
  async countByMonth() {
    const [rows] = await pool.query(
      `SELECT
         DATE_FORMAT(created_at, '%Y-%m') AS month,
         COUNT(*) AS count
       FROM appointments
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
       GROUP BY DATE_FORMAT(created_at, '%Y-%m')
       ORDER BY month ASC`
    );
    return rows;
  },

  /**
   * Count appointments grouped by test name — most popular tests.
   */
  async countByTest() {
    const [rows] = await pool.query(
      `SELECT test_name, COUNT(*) AS count
       FROM appointments
       WHERE test_name IS NOT NULL AND test_name != ''
       GROUP BY test_name
       ORDER BY count DESC
       LIMIT 10`
    );
    return rows;
  },

  /**
   * Dashboard stats: totals by status.
   */
  async getStats() {
    const [rows] = await pool.query(
      `SELECT
         COUNT(*) AS total,
         SUM(status = 'pending') AS pending,
         SUM(status = 'confirmed') AS confirmed,
         SUM(status = 'completed') AS completed,
         SUM(status = 'cancelled') AS cancelled
       FROM appointments`
    );
    return rows[0];
  },
};

module.exports = AppointmentModel;
