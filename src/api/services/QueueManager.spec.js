const QM = require('./QueueManager');
const handlers = require('./handlers');

describe('QueueManager', async () => {
  it('addJob - assigns handlers with estimated time', () => [
    [{ name: 'file.pdf' }, 5e3],
    [{ name: 'file.htm' }, 1e3],
  ].map(([given, expect]) => makeQM().addJob(given).expectedHandlingTime.should.equal(expect)));

  it('getNextJob', () => {
    const pdf = { name: 'file.pdf' };
    const htm = { name: 'file.htm' };
    const qm = makeQM();

    qm.addJob(pdf);
    qm.getNextJob().job.payload.should.equal(pdf);

    qm.addJob(htm);
    qm.getNextJob().job.payload.should.equal(htm);
  });

  function makeQM() {
    return new QM(handlers, { runQueue: false });
  }
})
