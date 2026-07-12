const pool = require('../config/db');

const SettingsModel = {
  /**
   * Get all settings as a key-value object.
   */
  async getAll() {
    const [rows] = await pool.query(
      'SELECT setting_key, setting_value FROM website_settings'
    );
    const settings = {};
    rows.forEach((r) => {
      settings[r.setting_key] = r.setting_value;
    });
    return settings;
  },

  /**
   * Get a single setting value by key.
   */
  async getByKey(key) {
    const [rows] = await pool.query(
      'SELECT setting_value FROM website_settings WHERE setting_key = ? LIMIT 1',
      [key]
    );
    return rows[0] ? rows[0].setting_value : null;
  },

  /**
   * Insert or update a single setting by key.
   */
  async upsert(key, value) {
    const [result] = await pool.query(
      `INSERT INTO website_settings (setting_key, setting_value)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE
         setting_value = VALUES(setting_value),
         updated_at = NOW()`,
      [key, value]
    );
    return result;
  },

  /**
   * Insert or update multiple settings in a transaction.
   * @param {Object} settingsObject - { key: value, ... }
   */
  async updateMany(settingsObject) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      for (const [key, value] of Object.entries(settingsObject)) {
        await conn.query(
          `INSERT INTO website_settings (setting_key, setting_value)
           VALUES (?, ?)
           ON DUPLICATE KEY UPDATE
             setting_value = VALUES(setting_value),
             updated_at = NOW()`,
          [key, value != null ? String(value) : null]
        );
      }
      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },
};

module.exports = SettingsModel;
