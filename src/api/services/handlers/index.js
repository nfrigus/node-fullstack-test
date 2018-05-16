const HtmlHandler = require('./HtmlHandler');
const PdfHandler = require('./PdfHandler');


module.exports = [
  new HtmlHandler,
  new PdfHandler,
]
