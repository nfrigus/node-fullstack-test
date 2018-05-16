/**
 * Interface to be implemented by handlers
 */
module.exports = class BaseHandler {
  /**
   * @return estimated number of milliseconds to handle the payload or false if not applicable
   */
  estimate(payload) {
    throw new Error('Not implemented');
  }

  /**
   * Execute payload processing
   */
  async handle(payload) {
    throw new Error('Not implemented');
  }
}
