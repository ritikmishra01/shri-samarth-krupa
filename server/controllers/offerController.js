const db = require('../config/db');

const SEED_OFFERS = [
  { id: 1, test_name: 'Thyroid Profile (T3,T4,TSH)', original_price: 800, camp_price: 400, is_active: 1 },
  { id: 2, test_name: 'HbA1c', original_price: 700, camp_price: 400, is_active: 1 },
  { id: 3, test_name: 'Lipid Profile', original_price: 700, camp_price: 400, is_active: 1 },
  { id: 4, test_name: 'Blood Group', original_price: 150, camp_price: 80, is_active: 1 },
  { id: 5, test_name: 'Vitamin B12', original_price: 1200, camp_price: 700, is_active: 1 },
  { id: 6, test_name: 'Vitamin D3', original_price: 1500, camp_price: 900, is_active: 1 },
];

exports.getOffers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM offers ORDER BY id');
    res.json({ success: true, data: rows });
  } catch {
    res.json({ success: true, data: SEED_OFFERS });
  }
};

exports.createOffer = async (req, res) => {
  try {
    const { test_name, original_price, camp_price } = req.body;
    const [result] = await db.query(
      'INSERT INTO offers (test_name, original_price, camp_price) VALUES (?,?,?)',
      [test_name, original_price, camp_price]
    );
    res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateOffer = async (req, res) => {
  try {
    const { test_name, original_price, camp_price, is_active } = req.body;
    await db.query(
      'UPDATE offers SET test_name=?, original_price=?, camp_price=?, is_active=? WHERE id=?',
      [test_name, original_price, camp_price, is_active, req.params.id]
    );
    res.json({ success: true, message: 'Offer updated' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    await db.query('DELETE FROM offers WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Offer deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.toggleCampaign = async (req, res) => {
  try {
    const { is_active } = req.body;
    await db.query('UPDATE settings SET value=? WHERE key_name="sunday_camp_active"', [is_active ? '1' : '0']);
    res.json({ success: true, message: `Campaign ${is_active ? 'enabled' : 'disabled'}` });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
