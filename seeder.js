const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const Country = require('./models/Country');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const countries = JSON.parse(
  fs.readFileSync(`${__dirname}/data/countries.json`, 'utf8')
);

export const importData = async () => {
  try {
    await Country.create(countries);

    console.log('Countries imported'.green.inverse);
    // process.exit();
  } catch (err) {
    console.error(err);
  }
};

export const deleteData = async () => {
  try {
    await Country.deleteMany();

    console.log('Countries Destroyed'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
