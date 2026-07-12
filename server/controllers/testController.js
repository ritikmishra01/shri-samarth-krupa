const db = require('../config/db');

const SEED_TESTS = [
  { name: 'Complete Blood Count (CBC)', category: 'Haematology', price: 200, sample_type: 'Blood', fasting_required: 0, report_time: 'Same Day', description: 'Measures different components of blood including RBC, WBC and platelets.' },
  { name: 'Lipid Profile', category: 'Biochemistry', price: 350, sample_type: 'Blood', fasting_required: 1, report_time: 'Same Day', description: 'Measures cholesterol and triglycerides to assess heart health.' },
  { name: 'Thyroid Profile (T3, T4, TSH)', category: 'Thyroid', price: 400, sample_type: 'Blood', fasting_required: 0, report_time: 'Same Day', description: 'Assesses thyroid gland function.' },
  { name: 'Liver Function Test (LFT)', category: 'Biochemistry', price: 500, sample_type: 'Blood', fasting_required: 1, report_time: 'Same Day', description: 'Evaluates liver health and function.' },
  { name: 'Kidney Function Test (KFT)', category: 'Biochemistry', price: 500, sample_type: 'Blood', fasting_required: 0, report_time: 'Same Day', description: 'Assesses kidney function.' },
  { name: 'HbA1c', category: 'Biochemistry', price: 400, sample_type: 'Blood', fasting_required: 0, report_time: 'Same Day', description: 'Measures average blood sugar over 3 months.' },
  { name: 'Blood Sugar (Fasting)', category: 'Biochemistry', price: 80, sample_type: 'Blood', fasting_required: 1, report_time: '2 Hours', description: 'Measures fasting blood glucose level.' },
  { name: 'Iron Profile', category: 'Biochemistry', price: 600, sample_type: 'Blood', fasting_required: 0, report_time: 'Next Day', description: 'Measures iron levels and related markers.' },
  { name: 'Vitamin B12', category: 'Vitamins', price: 700, sample_type: 'Blood', fasting_required: 0, report_time: 'Same Day', description: 'Measures Vitamin B12 levels in blood.' },
  { name: 'Vitamin D', category: 'Vitamins', price: 900, sample_type: 'Blood', fasting_required: 0, report_time: 'Next Day', description: 'Measures Vitamin D3 levels.' },
  { name: 'Urine Examination', category: 'Urine', price: 100, sample_type: 'Urine', fasting_required: 0, report_time: 'Same Day', description: 'Routine urine analysis.' },
  { name: 'Pregnancy Test (Beta HCG)', category: 'Biochemistry', price: 150, sample_type: 'Blood/Urine', fasting_required: 0, report_time: '30 Mins', description: 'Confirms pregnancy.' },
];

exports.getTests = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tests ORDER BY category, name');
    res.json({ success: true, data: rows });
  } catch (err) {
    // Return seed data if DB not available
    res.json({ success: true, data: SEED_TESTS.map((t, i) => ({ ...t, id: i + 1, is_active: 1 })) });
  }
};

exports.getTest = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tests WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Test not found' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createTest = async (req, res) => {
  try {
    const { name, category, price, sample_type, fasting_required, report_time, description } = req.body;
    const [result] = await db.query(
      'INSERT INTO tests (name, category, price, sample_type, fasting_required, report_time, description) VALUES (?,?,?,?,?,?,?)',
      [name, category, price, sample_type, fasting_required, report_time, description]
    );
    res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateTest = async (req, res) => {
  try {
    const { name, category, price, sample_type, fasting_required, report_time, description, is_active } = req.body;
    await db.query(
      'UPDATE tests SET name=?, category=?, price=?, sample_type=?, fasting_required=?, report_time=?, description=?, is_active=? WHERE id=?',
      [name, category, price, sample_type, fasting_required, report_time, description, is_active, req.params.id]
    );
    res.json({ success: true, message: 'Test updated' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteTest = async (req, res) => {
  try {
    await db.query('DELETE FROM tests WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Test deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
