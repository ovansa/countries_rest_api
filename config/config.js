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

const test = {
  app: {
    port: parseInt(process.env.TEST_APP_PORT) || 5000,
  },
  db: {
    mongo_url: process.env.TEST_MONGO_URI || '',
  },
};

const config = { development, test };

module.exports = config[env];
