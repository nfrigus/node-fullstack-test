const BaseHandler = require('./BaseHandler');
const PROCESSING_TIME = 1e3;

module.exports = class HtmlHandler extends BaseHandler {
  estimate(payload) {
    return payload && typeof payload.name === 'string' && payload.name.match(/\.html?$/) ? PROCESSING_TIME : false;
  }

  /**
   * Execute payload processing
   */
  async handle(payload) {
    return new Promise(resolve => setTimeout(resolve, PROCESSING_TIME, payload));
  }
}
