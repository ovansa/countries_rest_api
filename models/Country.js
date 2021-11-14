const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a country name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Country name cannot be more than 50 characters long'],
  },
  capital: {
    type: String,
    required: [true, 'Please add a capital name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Capital name cannot be more than 50 characters long'],
  },
  iso2Code: {
    type: String,
    required: [true, 'Please add an iso2code code'],
    trim: true,
    maxlength: [4, 'iso2code cannot be more than 4 characters long'],
  },
});

module.exports = mongoose.model('Country', CountrySchema);
