const router = module.exports = require('express').Router();

router.get('/', async (req, res) => res.send('hello'))
router.use('/queue', require('./queue'));

router.use((err, req, res, next) => {
  const response = err.code ? err : {
    code: 500,
    message: err.message,
  };
  res.status(response.code);
  res.json(response);
  next();
});
