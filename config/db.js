const mongoose = require('mongoose');
const colors = require('colors');
const config = require('./config');

const {
  db: { mongo_url },
} = config;

const connectDB = async () => {
  const conn = await mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};

module.exports = { connectDB, disconnectDB };
