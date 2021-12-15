const request = require('supertest');
const { server } = require('../../../server');

const dbConnection = require('../../../config/db');

const Country = require('../../../models/Country');
const { createDocument } = require('../../data');

beforeEach(async () => {
  await Country.deleteMany();
});

afterAll(() => {
  return dbConnection.disconnectDB();
});

describe('Fetch Countries', () => {
  it('should return all countries', async () => {
    const { countries } = await createDocument();
    const res = await request(server)
      .get('/api/v1/countries')
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(countries.length);

    server.close();
  });

  it('should return country matching search name parameter', async () => {
    await createDocument();
    const res = await request(server)
      .get('/api/v1/countries?name=Nigeria')
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].name).toBe('Nigeria');

    server.close();
  });

  it('should return empty result on search with country name that does not exist', async () => {
    await createDocument();
    const res = await request(server)
      .get('/api/v1/countries?name=NotNigeria')
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(0);

    server.close();
  });
});

/**
 * TODO: should create country with valid details
 * TODO: should return error on create country with existing country name
 * TODO: should return error on create country with existing country capital
 * TODO: should return error on create country without mandatory fields
 */
