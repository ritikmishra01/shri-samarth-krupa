const db = require('../config/db');
const path = require('path');
const fs = require('fs');

exports.getGallery = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM gallery ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch {
    res.json({ success: true, data: [] });
  }
};

exports.createGalleryItem = async (req, res) => {
  try {
    const { title, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const [result] = await db.query(
      'INSERT INTO gallery (title, category, image_url) VALUES (?,?,?)',
      [title, category, imageUrl]
    );
    res.status(201).json({ success: true, data: { id: result.insertId, title, category, image_url: imageUrl } });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateGalleryItem = async (req, res) => {
  try {
    const { title, category } = req.body;
    await db.query('UPDATE gallery SET title=?, category=? WHERE id=?', [title, category, req.params.id]);
    res.json({ success: true, message: 'Gallery item updated' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT image_url FROM gallery WHERE id = ?', [req.params.id]);
    if (rows.length && rows[0].image_url) {
      const filePath = path.join(__dirname, '..', rows[0].image_url);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await db.query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
