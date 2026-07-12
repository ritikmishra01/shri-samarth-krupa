const db = require('../config/db');

// Create report table if it doesn't exist (fallback)
const initReports = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        patient_id VARCHAR(50) NOT NULL,
        patient_name VARCHAR(100) NOT NULL,
        mobile VARCHAR(15) NOT NULL,
        dob DATE,
        test_name VARCHAR(255) NOT NULL,
        report_date DATE NOT NULL,
        status VARCHAR(20) DEFAULT 'Ready',
        pdf_url VARCHAR(255),
        values_json JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (err) {
    console.log("MySQL report table init skipped or failed: ", err.message);
  }
};
initReports();

const SEED_REPORTS = [
  {
    patient_id: 'SKD-2026001',
    patient_name: 'Rajesh Patil',
    mobile: '8169686040',
    dob: '1985-05-15',
    test_name: 'Complete Blood Count (CBC)',
    report_date: '2026-07-05',
    status: 'Ready',
    pdf_url: '/uploads/reports/cbc_rajesh.pdf',
    values_json: {
      wbc: { val: 7.2, unit: 'K/uL', range: '4.5 - 11.0', status: 'Normal' },
      rbc: { val: 5.1, unit: 'M/uL', range: '4.5 - 5.9', status: 'Normal' },
      hemoglobin: { val: 13.2, unit: 'g/dL', range: '13.5 - 17.5', status: 'Low' },
      platelets: { val: 250, unit: 'K/uL', range: '150 - 400', status: 'Normal' },
      mcv: { val: 79, unit: 'fL', range: '80 - 100', status: 'Low' }
    }
  },
  {
    patient_id: 'SKD-2026002',
    patient_name: 'Priya Sharma',
    mobile: '9876543210',
    dob: '1992-08-22',
    test_name: 'Thyroid Profile (T3, T4, TSH)',
    report_date: '2026-07-06',
    status: 'Ready',
    pdf_url: '/uploads/reports/thyroid_priya.pdf',
    values_json: {
      t3: { val: 1.2, unit: 'ng/dL', range: '0.8 - 2.0', status: 'Normal' },
      t4: { val: 8.5, unit: 'ug/dL', range: '4.5 - 12.0', status: 'Normal' },
      tsh: { val: 5.6, unit: 'uIU/mL', range: '0.4 - 4.5', status: 'High' }
    }
  }
];

exports.getReportByPatient = async (req, res) => {
  const { patient_id, mobile } = req.body;
  if (!patient_id || !mobile) {
    return res.status(400).json({ success: false, message: 'Patient ID and Mobile are required' });
  }

  try {
    const [rows] = await db.query(
      'SELECT * FROM reports WHERE patient_id = ? AND mobile = ?',
      [patient_id, mobile]
    );
    if (rows.length > 0) {
      return res.json({ success: true, data: rows[0] });
    }
  } catch (err) {
    // Ignore error and fall through to seed reports for Demo Mode
  }

  // Demo Fallback
  const found = SEED_REPORTS.find(
    r => r.patient_id.toLowerCase() === patient_id.toLowerCase() && r.mobile === mobile
  );
  if (found) {
    return res.json({ success: true, data: found });
  }

  res.status(404).json({ success: false, message: 'No reports found for the provided details.' });
};

exports.getReports = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reports ORDER BY report_date DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.json({ success: true, data: SEED_REPORTS });
  }
};

exports.uploadReport = async (req, res) => {
  try {
    const { patient_id, patient_name, mobile, dob, test_name, report_date, values_json } = req.body;
    const pdfUrl = req.file ? `/uploads/reports/${req.file.filename}` : null;
    
    const [result] = await db.query(
      'INSERT INTO reports (patient_id, patient_name, mobile, dob, test_name, report_date, pdf_url, values_json) VALUES (?,?,?,?,?,?,?,?)',
      [patient_id, patient_name, mobile, dob, test_name, report_date, pdfUrl, JSON.stringify(values_json)]
    );
    res.status(201).json({ success: true, data: { id: result.insertId, ...req.body, pdf_url: pdfUrl } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    await db.query('DELETE FROM reports WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Report deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
