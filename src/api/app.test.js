process.env.NODE_ENV = 'test';

const app = require('./app');
const supertest = require('supertest');

module.exports = {
  app,
  request,
};

/**
 * Execute supertest request with authentication
 *
 * @param method
 * @param action
 * @returns supertest.Request
 */
function request(method, action) {
  method = method.toLowerCase();
  return supertest(app)[method](action);
}
