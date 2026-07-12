const db = require('../config/db');

const DEFAULT_SETTINGS = {
  lab_name: 'Shri Samarth Krupa Diagnostic Centre',
  tagline: 'Accurate Diagnostics. Trusted Care. Healthy Life.',
  phone1: '8169686040',
  phone2: '9876543210',
  email: 'shrisamarthkrupa@gmail.com',
  whatsapp: '918169686040',
  address: 'Shop No. 5, Sai Complex, Near ST Bus Stand, Kalyan West - 421301',
  hours_weekday: '7:00 AM - 9:00 PM',
  hours_sunday: '7:00 AM - 2:00 PM',
  facebook: 'https://facebook.com/shrisamarthkrupa',
  instagram: 'https://instagram.com/shrisamarthkrupa',
  google_maps: 'https://maps.google.com/?q=Kalyan+West+Maharashtra',
  sunday_camp_active: '1',
};

exports.getSettings = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT key_name, value FROM settings');
    const settings = {};
    rows.forEach(r => { settings[r.key_name] = r.value; });
    res.json({ success: true, data: Object.keys(settings).length > 0 ? settings : DEFAULT_SETTINGS });
  } catch {
    res.json({ success: true, data: DEFAULT_SETTINGS });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const entries = Object.entries(req.body);
    for (const [key, value] of entries) {
      await db.query(
        'INSERT INTO settings (key_name, value) VALUES (?,?) ON DUPLICATE KEY UPDATE value=?',
        [key, value, value]
      );
    }
    res.json({ success: true, message: 'Settings saved successfully' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
