const path = require('path');
const express = require('express');
const router = module.exports = express.Router();

router.get('/', (req, res) => res.sendFile(path.resolve('./public/index.html')));
router.use('/queue', require('./queue'));
router.use(express.static('public'));

router.use((err, req, res, next) => {
  const response = err.code ? err : {
    code: 500,
    message: err.message,
  };
  res.status(response.code);
  res.json(response);
  next();
});
