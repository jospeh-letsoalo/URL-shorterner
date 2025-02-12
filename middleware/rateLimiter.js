const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requests per minute per short URL
  message: 'Too many requests. Please try again later.',
  keyGenerator: (req) => {
    return req.params.shortCode || 'unknown';
  },
});

module.exports = limiter;
