const db = require('../config/db');

exports.sendMessage = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ success: false, message: 'Name, phone and message are required' });
    }
    await db.query(
      'INSERT INTO contact_messages (name, phone, email, message) VALUES (?,?,?,?)',
      [name, phone, email || null, message]
    );
    res.status(201).json({ success: true, message: 'Message sent successfully! We will contact you soon.' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error. Please call us directly.' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.markRead = async (req, res) => {
  try {
    await db.query('UPDATE contact_messages SET is_read=1 WHERE id=?', [req.params.id]);
    res.json({ success: true, message: 'Marked as read' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    await db.query('DELETE FROM contact_messages WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Message deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
