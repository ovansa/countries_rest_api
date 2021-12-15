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

describe('Create Countries', () => {
  it('should create a country with valid details', async () => {
    await createDocument();
    const res = await request(server)
      .post('/api/v1/countries')
      .send({ name: 'Egypt', capital: 'Cairo', iso2Code: 'EG' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe('Egypt');

    server.close();
  });

  it('should return error on create country with existing country name', async () => {
    const { nigeria } = await createDocument();
    const res = await request(server)
      .post('/api/v1/countries')
      .send({ name: nigeria.name, capital: 'Cairo', iso2Code: 'EG' })
      .set('Accept', 'application/json');

    console.log(res.body);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Duplicate key value entered');

    server.close();
  });

  it('should return error on create country with existing country capital', async () => {
    const { nigeria } = await createDocument();
    const res = await request(server)
      .post('/api/v1/countries')
      .send({ name: 'Egypt', capital: nigeria.capital, iso2Code: 'EG' })
      .set('Accept', 'application/json');

    console.log(res.body);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Duplicate key value entered');

    server.close();
  });

  it('should return error on create country with empty country name', async () => {
    const res = await request(server)
      .post('/api/v1/countries')
      .send({ name: '', capital: 'Cairo', iso2Code: 'EG' })
      .set('Accept', 'application/json');

    console.log(res.body);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Please add a country name');

    server.close();
  });

  it('should return error on create country with empty country capital', async () => {
    const res = await request(server)
      .post('/api/v1/countries')
      .send({ name: 'Egypt', capital: '', iso2Code: 'EG' })
      .set('Accept', 'application/json');

    console.log(res.body);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Please add a capital name');

    server.close();
  });
});

/**
 * TODO: should delete country with valid country id
 * TODO: should return error on delete country with invalid country id
 */
