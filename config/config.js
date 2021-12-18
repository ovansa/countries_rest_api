const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const env = process.env.NODE_ENV;

const development = {
  app: {
    port: parseInt(process.env.PORT) || 5000,
  },
  db: {
    mongo_url: process.env.MONGO_URI || '',
  },
};

const production = {
  app: {
    port: parseInt(process.env.PORT) || 5000,
  },
  db: {
    mongo_url: process.env.MONGO_URI || '',
  },
};

const test = {
  app: {
    port: parseInt(process.env.TEST_APP_PORT) || 5000,
  },
  db: {
    mongo_url: process.env.TEST_MONGO_URI || 'mongodb://localhost:27017/test',
  },
};

const config = { development, production, test };

module.exports = config[env];
