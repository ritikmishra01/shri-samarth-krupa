const express = require('express');
const router = express.Router();
const {
  getOffers, createOffer, updateOffer, deleteOffer, toggleCampaign
} = require('../controllers/offerController');
const { protect } = require('../middleware/auth');

router.get('/', getOffers);
router.post('/',            protect, createOffer);
router.put('/campaign',     protect, toggleCampaign);
router.put('/:id',          protect, updateOffer);
router.delete('/:id',       protect, deleteOffer);

module.exports = router;
