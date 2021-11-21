const path = require('path');
const { unlink } = require('fs');
const Country = require('../models/Country');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const randomstring = require('randomstring');
const readXlsxFile = require('read-excel-file/node');

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

// @desc Create countries via excel file upload
// @route POST /api/v1/countries/upload
// @access Public
export const uploadCountries = async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Upload a file`, 400));
  }

  const file = req.files.file;

  if (!file.mimetype.endsWith('spreadsheetml.sheet')) {
    return next(new ErrorResponse(`Upload an excel file`, 400));
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Upload an xlsx file size less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  file.name = `country_${randomstring.generate(10)}${
    path.parse(file.name).ext
  }`;

  const map = {
    Name: 'name',
    Capital: 'capital',
    iso2Code: 'iso2Code',
  };

  const filePath = `${process.env.FILE_UPLOAD_PATH}/${file.name}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    readXlsxFile(filePath, { map }).then(async ({ rows: countries }) => {
      unlink(filePath, (err) => {
        if (err)
          return next(new ErrorResponse(`Problem with deleting file`, 500));
        console.log(`File deleted successfully`);
      });

      try {
        console.log(countries);
        const country = await Country.create(countries);

        res.status(201).json({ success: true, data: country });
      } catch (err) {
        next(err);
      }
    });
  });
};

// TODO: Get country by name
// TODO: Delete country by name
