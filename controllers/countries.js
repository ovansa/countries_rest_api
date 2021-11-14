const Country = require('../models/Country');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get all countries
// @route GET /api/v1/countries
// @access Public
export const getCountries = async (req, res, next) => {
  try {
    const countries = await Country.find();
    res.status(200).json({ success: true, data: countries });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Get single country
// @route GET /api/v1/countries/:id
// @access Public
export const getCountry = async (req, res, next) => {
  try {
    const country = await Country.findById(req.params.id);

    if (!country) {
      next(
        new ErrorResponse(`Country not found with id of ${req.params.id}`, 404)
      );
    } else {
      res.status(200).json({ success: true, data: country });
    }
  } catch (err) {
    next(
      new ErrorResponse(`Country not found with id of ${req.params.id}`, 404)
    );
  }
};

// @desc Create countries
// @route POST /api/v1/countries
// @access Public
export const createCountries = async (req, res, next) => {
  try {
    const country = await Country.create(req.body);

    res.status(201).json({ success: true, data: country });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Delete country
// @route DELETE /api/v1/countries/:id
// @access Public
export const deleteCountry = (req, res, next) => {
  res
    .status(200)
    .json({ success: 'true', msg: `Delete country ${req.params.id}` });
};
