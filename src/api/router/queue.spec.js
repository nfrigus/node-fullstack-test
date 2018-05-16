const app = require('../app.test');


describe('router', async () => {
  it('POST /queue', () => app
    .request('POST', '/queue')
    .send({ name: 'file.html' })
    .expect(201)
    .expect('Content-Type', /json/)
    .then(res => res.body)
    .should.eventually.have.a.property('status', 'accepted'));
})
