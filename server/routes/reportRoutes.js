const express = require('express');
const router = express.Router();
const { getReportByPatient, getReports, uploadReport, deleteReport } = require('../controllers/reportController');
const { protect } = require('../middleware/auth');
const { multerConfig } = require('../middleware/upload');

const uploadPDF = multerConfig.single('report_pdf');

// Public
router.post('/download', getReportByPatient);

// Admin protected
router.get('/', protect, getReports);
router.post('/upload', protect, uploadPDF, uploadReport);
router.delete('/:id', protect, deleteReport);

module.exports = router;
