const express = require('express');
const router = express.Router();
const {
  getAll, getById, create, update, remove, getStats
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/auth');

// Public booking creation
router.post('/', create);

// Admin protected
router.get('/',        protect, getAll);
router.get('/stats',   protect, getStats);
router.get('/:id',     protect, getById);
router.put('/:id',     protect, update);
router.delete('/:id',  protect, remove);

module.exports = router;
