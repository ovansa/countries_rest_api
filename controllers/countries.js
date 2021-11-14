// @desc Get all countries
// @route GET /api/v1/countries
// @access Public
export const getCountries = (req, res, next) => {
  res
    .status(200)
    .json({ success: 'true', msg: 'Show all countries', hello: req.hello });
};

// @desc Get single country
// @route GET /api/v1/countries/:id
// @access Public
export const getCountry = (req, res, next) => {
  res.status(200).json({
    success: 'true',
    msg: `Show single country ${req.params.id}`,
  });
};

// @desc Create countries
// @route POST /api/v1/countries
// @access Public
export const createCountries = (req, res, next) => {
  res.status(200).json({ success: 'true', msg: 'Create countries' });
};

// @desc Create countries
// @route DELETE /api/v1/countries/:id
// @access Public
export const deleteCountry = (req, res, next) => {
  res
    .status(200)
    .json({ success: 'true', msg: `Delete country ${req.params.id}` });
};
