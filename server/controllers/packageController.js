const db = require('../config/db');

const SEED_PACKAGES = [
  {
    id: 1, name: 'Fit India Package 1.1', price: 1300, is_active: 1,
    description: 'Essential health screening package',
    tests: JSON.stringify(['CBC', 'Lipid Profile', 'Thyroid Profile', 'Liver Function Test', 'Kidney Function Test', 'Urine Examination', 'Blood Sugar'])
  },
  {
    id: 2, name: 'Fit India Package 1.2', price: 1700, is_active: 1,
    description: 'Comprehensive health package with diabetes monitoring',
    tests: JSON.stringify(['CBC', 'Lipid Profile', 'Thyroid Profile', 'Liver Function Test', 'Kidney Function Test', 'Urine Examination', 'Blood Sugar', 'HbA1c'])
  },
  {
    id: 3, name: 'Fit India Package 1.3', price: 3000, is_active: 1, is_popular: 1,
    description: 'Complete wellness package — our most comprehensive offering',
    tests: JSON.stringify(['CBC', 'Lipid Profile', 'Thyroid Profile', 'Liver Function Test', 'Kidney Function Test', 'Urine Examination', 'Blood Sugar', 'HbA1c', 'Iron Profile', 'Vitamin B12', 'Vitamin D'])
  },
];

exports.getPackages = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM packages ORDER BY price');
    res.json({ success: true, data: rows });
  } catch {
    res.json({ success: true, data: SEED_PACKAGES });
  }
};

exports.getPackage = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM packages WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Package not found' });
    res.json({ success: true, data: rows[0] });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const { name, price, description, tests, is_popular } = req.body;
    const [result] = await db.query(
      'INSERT INTO packages (name, price, description, tests, is_popular) VALUES (?,?,?,?,?)',
      [name, price, description, JSON.stringify(tests), is_popular || 0]
    );
    res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updatePackage = async (req, res) => {
  try {
    const { name, price, description, tests, is_active, is_popular } = req.body;
    await db.query(
      'UPDATE packages SET name=?, price=?, description=?, tests=?, is_active=?, is_popular=? WHERE id=?',
      [name, price, description, JSON.stringify(tests), is_active, is_popular, req.params.id]
    );
    res.json({ success: true, message: 'Package updated' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deletePackage = async (req, res) => {
  try {
    await db.query('DELETE FROM packages WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Package deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
