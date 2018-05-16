const router = module.exports = require('express').Router();

router.use('/', (req, res) => {
  const job = req.app.get('qm').addJob(req.body);

  if (job.expectedHandlingTime === false) {
    return res.sendStatus(400);
  }

  job.onDone = () => console.log(`Done processing file ${req.body.name}`);

  res.status(201).json({
    payload: req.body,
    status: "accepted",
  });
});
