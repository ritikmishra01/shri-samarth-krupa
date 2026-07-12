const express = require('express');
const router = Router = express.Router();
const {
  getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem
} = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', getGallery);
router.post('/',      protect, upload, createGalleryItem);
router.put('/:id',    protect, updateGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
