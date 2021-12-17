const express = require('express');
const {
  getCountries,
  getCountry,
  createCountries,
  deleteCountries,
  uploadCountries,
} = require('../controllers/countries');

const router = express.Router();

router
  .route('/')
  .get(getCountries)
  .post(createCountries)
  .delete(deleteCountries);
router.route('/:id').get(getCountry);
router.route('/upload').post(uploadCountries);

module.exports = router;
