const PRIV = Symbol();

module.exports = class QueueManager {
  constructor(handlers = [], params = {}) {
    const { runQueue = true } = params;
    this[PRIV] = {
      handlers,
      jobInProgress: false,
      queue: [],
      runQueue,
    }
  }

  addJob(payload) {
    const job = {
      ...this.estimate(payload),
      payload,
      status: 'new',
      dropTime: 0,
    };

    if (job.expectedHandlingTime === false) {
      job.status = 'no-handler'
    } else {
      this[PRIV].queue.push(job);
    }

    if (this[PRIV].runQueue) runJob.call(this);

    return job;
  }

  estimate(payload) {
    let estimate = {
      expectedHandlingTime: false,
      handler: null,
    }

    const estimates = this[PRIV].handlers
      .map(handler => ({
        handler,
        expectedHandlingTime: handler.estimate(payload),
      }))
      .filter(estimate => estimate.expectedHandlingTime !== false);

    if (estimates.length) {
      estimate = estimates.reduce((a, b) => a.estimate < b.estimate ? a : b);
    }

    return estimate;
  }

  getNextJob() {
    const { queue } = this[PRIV];
    if (!queue.length) return {};

    let job, pos = 0;

    for (let nextJob; job = queue[pos], nextJob = queue[pos + 1]; pos++) {
      if (getMaxDropTime(job) - nextJob.expectedHandlingTime + 1 < 0) break;
      if (job.expectedHandlingTime === nextJob.expectedHandlingTime) break;
    }

    return {
      job,
      dropped: queue.slice(0, pos),
    };
  }
}

function runJob() {
  const { queue, jobInProgress } = this[PRIV];
  const { job, dropped } = this.getNextJob();

  if (!job || jobInProgress) return;
  this[PRIV].jobInProgress = true;
  dropped.forEach(i => i.dropTime += job.expectedHandlingTime);

  const { payload, handler } = job;

  handler.handle(payload)
    .catch(console.error)
    .then(() => {
      const jobIdx = queue.indexOf(job);
      if (jobIdx > -1) queue.splice(jobIdx, 1);
      if (typeof job.onDone === 'function') job.onDone();
      this[PRIV].jobInProgress = false;
    })
    .then(() => runJob.call(this));
}

function getMaxDropTime(job) {
  return job.expectedHandlingTime - job.dropTime;
}
