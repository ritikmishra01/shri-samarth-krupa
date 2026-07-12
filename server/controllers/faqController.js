const db = require('../config/db');

const SEED_FAQS = [
  { id: 1, question: 'Is fasting required for all tests?', answer: 'No. Only certain tests like Blood Sugar and Lipid Profile require fasting (8-12 hours). Most tests like CBC, Thyroid, Vitamin B12 do not need fasting.', category: 'Tests', sort_order: 1 },
  { id: 2, question: 'How long does it take to get reports?', answer: 'Most reports are available same day within 4-6 hours. Some special tests like Vitamin D may take 24 hours. We send digital reports directly to your mobile.', category: 'Reports', sort_order: 2 },
  { id: 3, question: 'Is home sample collection available?', answer: 'Yes! We offer home sample collection across Kalyan West and nearby areas. Simply book online or call 8169686040. A trained phlebotomist will visit at your preferred time.', category: 'Home Collection', sort_order: 3 },
  { id: 4, question: 'How can I download my report?', answer: 'Visit the Download Report page on our website, enter your Patient ID and registered mobile number or date of birth to access and download your digital report as PDF.', category: 'Reports', sort_order: 4 },
  { id: 5, question: 'Are your tests accurate and reliable?', answer: 'Yes! We use state-of-the-art diagnostic equipment with 99% accuracy. Our lab follows strict quality control protocols and all our equipment is regularly calibrated.', category: 'General', sort_order: 5 },
  { id: 6, question: 'What are your lab timings?', answer: 'We are open Monday to Saturday from 7:00 AM to 9:00 PM. On Sundays, we operate from 7:00 AM to 2:00 PM with special Health Camp offers.', category: 'General', sort_order: 6 },
  { id: 7, question: 'What payment methods do you accept?', answer: 'We accept cash, UPI (GPay, PhonePe, Paytm), and all major credit/debit cards. Online payment is also available when booking.', category: 'Payment', sort_order: 7 },
  { id: 8, question: 'How do I book an appointment?', answer: 'You can book online through our website, call us at 8169686040, or message us on WhatsApp. You can also walk in directly to our centre.', category: 'Booking', sort_order: 8 },
  { id: 9, question: 'Is the blood collection process painful?', answer: 'Our Senior Phlebotomist Mr. Shailesh Dubey has 8+ years of experience in painless blood collection. Most patients report minimal to no discomfort.', category: 'General', sort_order: 9 },
  { id: 10, question: 'What is the Sunday Health Camp?', answer: 'Every Sunday we run special health camps with discounted prices on popular tests. Thyroid, HbA1c, Lipid Profile are available at ₹400, Blood Group at ₹80, Vitamin B12 at ₹700.', category: 'General', sort_order: 10 },
];

exports.getFAQs = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM faqs ORDER BY sort_order, id');
    res.json({ success: true, data: rows });
  } catch {
    res.json({ success: true, data: SEED_FAQS });
  }
};

exports.createFAQ = async (req, res) => {
  try {
    const { question, answer, category, sort_order } = req.body;
    const [result] = await db.query(
      'INSERT INTO faqs (question, answer, category, sort_order) VALUES (?,?,?,?)',
      [question, answer, category, sort_order || 99]
    );
    res.status(201).json({ success: true, data: { id: result.insertId, ...req.body } });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateFAQ = async (req, res) => {
  try {
    const { question, answer, category, sort_order } = req.body;
    await db.query(
      'UPDATE faqs SET question=?, answer=?, category=?, sort_order=? WHERE id=?',
      [question, answer, category, sort_order, req.params.id]
    );
    res.json({ success: true, message: 'FAQ updated' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    await db.query('DELETE FROM faqs WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'FAQ deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
