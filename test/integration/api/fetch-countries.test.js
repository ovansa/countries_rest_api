// import { expect } from 'chai';
// import { app } from '../../../server';
const request = require('supertest');
const { server } = require('../../../server');

const dbConnection = require('../../../config/db');

const { importData, deleteCountries } = require('../../../seeder');
const Country = require('../../../models/Country');

beforeEach(async () => {
  await Country.deleteMany();
});

afterEach(() => {
  return dbConnection.disconnectDB();
});

describe('Fetch Countries', () => {
  it('should return all countries', async () => {
    const countries = [
      {
        _id: '61913a5bade61b31479133b7',
        name: 'Nigeria',
        capital: 'Abuja',
        iso2Code: 'NG',
      },
      {
        _id: '61913e71abd74c71610559fd',
        name: 'Ghana',
        capital: 'Accra',
        iso2Code: 'GH',
      },
      {
        _id: '61920698c4747ee7f652c497',
        name: 'Cameroon',
        capital: 'Yaounde',
        iso2Code: 'CM',
      },
      {
        _id: '6194a6b677af3512c59daf34',
        name: 'Benin',
        capital: 'Cotonou',
        iso2Code: 'BN',
      },
    ];

    await Country.create(countries);

    const res = await request(server)
      .get('/api/v1/countries')
      .set('Accept', 'application/json');

    console.log(`Status code - ${res.status}`);
    console.log(`Body - ${JSON.stringify(res.body)}`);

    server.close();
  });
});
