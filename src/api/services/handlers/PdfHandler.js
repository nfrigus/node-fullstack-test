const BaseHandler = require('./BaseHandler');
const PROCESSING_TIME = 5e3;

module.exports = class PdfHandler extends BaseHandler {
  estimate(payload) {
    return payload && typeof payload.name === 'string' && payload.name.substr(-4) === '.pdf' ? PROCESSING_TIME : false;
  }

  /**
   * Execute payload processing
   */
  async handle(payload) {
    return new Promise(resolve => setTimeout(resolve, PROCESSING_TIME, payload));
  }
}
