const Handler = require('./HtmlHandler');

describe('handlers/HtmlHandler', () => {
  const handler = new Handler;

  it('estimate', () => [
    [undefined, false],
    [{ name: 'file.pdf' }, false],
    [{ name: 'file.pnd' }, false],
    [{ name: 'file.html' }, 1e3],
    [{ name: 'file.htm' }, 1e3],
  ].map(([given, expect]) => handler.estimate(given).should.equal(expect)))
});
