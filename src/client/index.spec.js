const Operation = require('./Operation');

describe('Operation', function() {
  it('operation initialization', function() {
    const op = new Operation;
    op.setOperation([{move: 1},{insert: 'pi'}]);
    op.get().should.be.instanceOf(Array).and.have.lengthOf(2);
  });

  it('operation composition', function() {
    const op = new Operation();
    op.setOperation([{move: 1},{insert: 'ple'}]);
    op.compose([{move: 2}, {insert: 'a'}]);
    op.get().should.be.instanceOf(Array).and.have.lengthOf(4);
  });

  it('apply', function() {
    const op = new Operation();
    op.setOperation([{move: 1},{insert: 'ple'}]);
    op.compose([{move: -1}, {insert: 'a'}]);

    op.apply('p').should.be.exactly('paple')
  });

  it('delete', function() {
    const op = new Operation();
    op.setOperation([{move: 0}, {insert: 'orange'}]);
    op.compose([{move: 0}, {delete: 1}]);

    op.apply('').should.be.exactly('range');
  });
});