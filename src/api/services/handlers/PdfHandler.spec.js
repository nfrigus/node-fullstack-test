const Handler = require('./PdfHandler');

describe('handlers/PdfHandler', () => {
  const handler = new Handler;

  it('estimate', () => [
    [undefined, false],
    [{ name: 'file.pdf' }, 5e3],
    [{ name: 'file.pnd' }, false],
    [{ name: 'file.html' }, false],
    [{ name: 'file.htm' }, false],
  ].map(([given, expect]) => handler.estimate(given).should.equal(expect)))
});
