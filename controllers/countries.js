const Country = require('../models/Country');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc Get all countries
// @route GET /api/v1/countries
// @access Public
export const getCountries = asyncHandler(async (req, res, next) => {
  const countries = await Country.find();
  res.status(200).json({ success: true, data: countries });
});

// @desc Get single country
// @route GET /api/v1/countries/:id
// @access Public
export const getCountry = asyncHandler(async (req, res, next) => {
  const country = await Country.findById(req.params.id);

  if (!country) {
    next(
      new ErrorResponse(`Country not found with id of ${req.params.id}`, 404)
    );
  } else {
    res.status(200).json({ success: true, data: country });
  }
});

// @desc Create single countries
// @route POST /api/v1/countries
// @access Public
export const createCountries = async (req, res, next) => {
  try {
    const country = await Country.create(req.body);

    res.status(201).json({ success: true, data: country });
  } catch (err) {
    next(err);
  }
};

// @desc Delete country
// @route DELETE /api/v1/countries/:id
// @access Public
export const deleteCountries = async (req, res, next) => {
  try {
    const country = await Country.deleteMany({ _id: { $in: req.body } });

    if (!country) {
      next(new ErrorResponse(`Country not found`, 404));
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
