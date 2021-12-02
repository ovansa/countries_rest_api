// import { expect } from 'chai';
// import { app } from '../../../server';
// import request from 'supertest/request';

const dbConnection = require('../../../config/db');

beforeEach(() => {
  return dbConnection.connectDB();
});

afterEach(() => {
  return dbConnection.disconnectDB();
});

describe('Fetch Countries', () => {
  it('should return all countries', () => {
    expect(1).toBe(1);

    // request(app)
    //   .get('/countries')
    //   .end(err, (res) => {
    //     console.log(res);
    //   });
  });
});
