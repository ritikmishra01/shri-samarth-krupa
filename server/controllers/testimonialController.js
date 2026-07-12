const db = require('../config/db');

const SEED_TESTIMONIALS = [
  { id: 1, name: 'Priya Sharma', rating: 5, review: 'Excellent service! Staff is very professional and hygienic. Got my reports same day. Highly recommended!', is_approved: 1 },
  { id: 2, name: 'Rajesh Patil', rating: 5, review: 'Very affordable packages. Home collection was very convenient. Mr. Shailesh is an expert!', is_approved: 1 },
  { id: 3, name: 'Sunita Desai', rating: 5, review: 'Mr. Shailesh Dubey is an expert phlebotomist. No pain at all. Quick and accurate reports.', is_approved: 1 },
  { id: 4, name: 'Amit Kumar', rating: 5, review: 'Best diagnostic centre in Kalyan. Accurate reports, friendly staff and affordable pricing.', is_approved: 1 },
  { id: 5, name: 'Meera Joshi', rating: 5, review: 'Sunday health camp was amazing! Got all tests done at special prices. Very happy with service.', is_approved: 1 },
  { id: 6, name: 'Vikram Singh', rating: 5, review: 'Home collection was very convenient. Professional staff, hygienic process. Digital reports are great!', is_approved: 1 },
];

exports.getTestimonials = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch {
    res.json({ success: true, data: SEED_TESTIMONIALS });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { name, rating, review } = req.body;
    const [result] = await db.query(
      'INSERT INTO testimonials (name, rating, review, is_approved) VALUES (?,?,?,0)',
      [name, rating, review]
    );
    res.status(201).json({ success: true, message: 'Testimonial submitted for review', data: { id: result.insertId } });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { is_approved } = req.body;
    await db.query('UPDATE testimonials SET is_approved=? WHERE id=?', [is_approved, req.params.id]);
    res.json({ success: true, message: 'Testimonial updated' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    await db.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
