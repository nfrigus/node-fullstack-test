const handlers = require('./handlers');
const QM = require('./QueueManager');

module.exports = {
  qm: new QM(handlers),
}
