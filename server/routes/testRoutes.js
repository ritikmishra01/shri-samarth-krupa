const express = require('express');
const router = express.Router();
const {
  getTests, getTest, createTest, updateTest, deleteTest
} = require('../controllers/testController');
const { protect } = require('../middleware/auth');

// Public
router.get('/', getTests);
router.get('/:id', getTest);

// Admin protected
router.post('/',       protect, createTest);
router.put('/:id',     protect, updateTest);
router.delete('/:id',  protect, deleteTest);

module.exports = router;
